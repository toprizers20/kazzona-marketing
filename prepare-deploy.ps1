# Prepare deployment package for Hostinger Node.js hosting
# This script creates a deploy-ready folder structure

$deployDir = ".\deploy"
$standaloneDir = ".\.next\standalone"

# Clean previous deploy folder
if (Test-Path $deployDir) {
    Remove-Item -Recurse -Force $deployDir
}

# Create deploy folder
New-Item -ItemType Directory -Path $deployDir -Force | Out-Null

# Step 1: Copy standalone output (server.js + .next + node_modules)
Copy-Item -Path "$standaloneDir\*" -Destination $deployDir -Recurse -Force

# Step 2: Copy static assets (not included in standalone)
$staticSrc = ".\.next\static"
$staticDest = "$deployDir\.next\static"
if (Test-Path $staticSrc) {
    New-Item -ItemType Directory -Path $staticDest -Force | Out-Null
    Copy-Item -Path "$staticSrc\*" -Destination $staticDest -Recurse -Force
}

# Step 3: Copy public folder
$publicSrc = ".\public"
$publicDest = "$deployDir\public"
if (Test-Path $publicSrc) {
    New-Item -ItemType Directory -Path $publicDest -Force | Out-Null
    Copy-Item -Path "$publicSrc\*" -Destination $publicDest -Recurse -Force
}

# Step 4: Copy prisma schema + database
$prismaDest = "$deployDir\prisma"
New-Item -ItemType Directory -Path $prismaDest -Force | Out-Null
Copy-Item -Path ".\prisma\schema.prisma" -Destination $prismaDest -Force
Copy-Item -Path ".\prisma\dev.db" -Destination $prismaDest -Force

# Step 5: Copy .env files  
Copy-Item -Path ".\.env" -Destination $deployDir -Force
Copy-Item -Path ".\.env.local" -Destination $deployDir -Force

# Step 6: Fix Windows paths in required-server-files.json for Linux
$reqFilePath = "$deployDir\.next\required-server-files.json"
if (Test-Path $reqFilePath) {
    $content = Get-Content $reqFilePath -Raw
    # Replace Windows absolute paths with relative/Linux paths
    $content = $content -replace 'C:\\\\Users\\\\lenovo\\\\Desktop\\\\Digitex Scale', ''
    # Fix Windows backslash paths in files array to forward slashes
    $content = $content -replace '\\\\\\\\', '/'
    Set-Content -Path $reqFilePath -Value $content -NoNewline
}

# Step 7: Fix the server.js standalone config too
$serverJsPath = "$deployDir\server.js"
if (Test-Path $serverJsPath) {
    $content = Get-Content $serverJsPath -Raw
    $content = $content -replace 'C:\\\\Users\\\\lenovo\\\\Desktop\\\\Digitex Scale', ''
    Set-Content -Path $serverJsPath -Value $content -NoNewline
}

# Step 8: Fix package.json - use "node server.js" instead of "next start"
$pkgPath = "$deployDir\package.json"
if (Test-Path $pkgPath) {
    $content = Get-Content $pkgPath -Raw
    $content = $content -replace '"start":\s*"next start"', '"start": "node server.js"'
    $content = $content -replace '"postinstall":\s*"prisma generate"', '"postinstall": "echo ''postinstall skipped''"'
    $content = $content -replace '"build":\s*"next build"', '"build": "echo ''Already built''"'
    $content = $content -replace '"dev":\s*"next dev",?\s*', ''
    $content = $content -replace '"lint":\s*"eslint",?\s*', ''
    Set-Content -Path $pkgPath -Value $content -NoNewline
}

# Step 9: Fix .env for server database path
$envPath = "$deployDir\.env"
Set-Content -Path $envPath -Value 'DATABASE_URL="file:./prisma/dev.db"' -NoNewline

Write-Host ""
Write-Host "=== Deployment package ready! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Deploy folder structure:" -ForegroundColor Cyan
Get-ChildItem $deployDir | ForEach-Object { Write-Host "  $($_.Name)" }
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Go to the 'deploy' folder"
Write-Host "2. Select ALL files/folders inside it"
Write-Host "3. ZIP them together (so server.js is at the ROOT of the zip)"
Write-Host "4. Upload this ZIP to Hostinger File Manager at: /home/user/nodejs/"
Write-Host "5. Extract it there (make sure server.js is at /home/user/nodejs/server.js)"
Write-Host "6. In Hostinger Node.js settings:"
Write-Host "   - Entry point: server.js"
Write-Host "   - Node version: 22.x"
Write-Host "   - Port: 3000"
Write-Host "7. Restart the Node.js application"
Write-Host ""
