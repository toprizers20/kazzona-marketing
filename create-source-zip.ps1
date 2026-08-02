Add-Type -AssemblyName System.IO.Compression.FileSystem

$zipPath = "$PWD\Kazzona-Source-Upload.zip"
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
$zip = [System.IO.Compression.ZipFile]::Open($zipPath, 'Create')

function AddFileToZip($filePath, $entryName) {
    if (Test-Path $filePath) {
        try {
            [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $filePath, $entryName) | Out-Null
        } catch {
            $tempPath = "$filePath.tmp"
            Copy-Item $filePath $tempPath -Force
            [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $tempPath, $entryName) | Out-Null
            Remove-Item $tempPath -Force
        }
    }
}

function AddDirToZip($dirPath, $baseDirName) {
    if (Test-Path $dirPath) {
        $files = Get-ChildItem -Path $dirPath -Recurse -File
        foreach ($file in $files) {
            $relPath = $file.FullName.Substring((Get-Item $dirPath).Parent.FullName.Length + 1).Replace('\', '/')
            try {
                [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $file.FullName, "$baseDirName/$relPath") | Out-Null
            } catch {
                try {
                    $tempPath = "$($file.FullName).tmp"
                    Copy-Item $file.FullName $tempPath -Force
                    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $tempPath, "$baseDirName/$relPath") | Out-Null
                    Remove-Item $tempPath -Force
                } catch {
                    Write-Host "Skipped locked file"
                }
            }
        }
    }
}

Write-Host "Creating clean source zip..."

AddDirToZip "$PWD\src" "src"
AddDirToZip "$PWD\public" "public"
AddDirToZip "$PWD\prisma" "prisma"

AddFileToZip "$PWD\package.json" "package.json"
AddFileToZip "$PWD\package-lock.json" "package-lock.json"
AddFileToZip "$PWD\next.config.ts" "next.config.ts"
AddFileToZip "$PWD\postcss.config.mjs" "postcss.config.mjs"
AddFileToZip "$PWD\tsconfig.json" "tsconfig.json"
AddFileToZip "$PWD\.env.local" ".env.local"
AddFileToZip "$PWD\components.json" "components.json"

$zip.Dispose()
Write-Host "Done! Kazzona-Source-Upload.zip created."
