"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Papa from "papaparse";
import * as XLSX from 'xlsx';
import { bulkCreateContent } from "@/app/actions/content";

export default function BulkUploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; count?: number; errors?: string[] } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const downloadTemplate = () => {
    const wsData = [
      ["title", "content", "type", "slug", "published", "publishAt", "seoTitle", "seoDesc"],
      ["My First Blog Post", "<p>Content of blog post</p>", "BLOG", "my-first-blog", "TRUE", "2026-06-05T10:00", "Optimized SEO Title", "Description"],
      ["My Services Page", "<p>Services content</p>", "PAGE", "services-custom", "TRUE", "", "Services SEO Title", "Services Description"]
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "Kazzona_Content_Upload_Template.xlsx");
  };

  const processData = async (data: any[]) => {
    try {
      const items = data.map((row: any) => ({
        title: row.title,
        slug: row.slug || row.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
        content: row.content || "",
        seoTitle: row.seoTitle || "",
        seoDesc: row.seoDesc || "",
        published: String(row.published).toLowerCase() === "true",
        publishAt: row.publishAt ? new Date(row.publishAt) : null,
        type: (row.type || "BLOG").toUpperCase() as "BLOG" | "PAGE",
      }));

      const res = await bulkCreateContent(items);
      setResult(res as any);
      if (res.success) {
        router.refresh();
      }
    } catch (error) {
      setResult({ success: false, errors: ["Failed to parse and upload content."] });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsSubmitting(true);
    setResult(null);

    if (file.name.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          processData(results.data);
        },
        error: (error) => {
          setResult({ success: false, errors: [error.message] });
          setIsSubmitting(false);
        }
      });
    } else {
      try {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        processData(json);
      } catch (err: any) {
        setResult({ success: false, errors: [err.message || "Failed to read Excel file."] });
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/content">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Bulk Upload Content</h2>
          <p className="text-muted-foreground text-sm mt-1">Upload a CSV file to create multiple blog posts or pages at once.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border border-border/40 rounded-xl p-8 flex flex-col items-center justify-center text-center border-dashed">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">Select CSV or Excel File</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              Your file must include columns for title, content, type (BLOG/PAGE), and optionally publishAt.
            </p>
            
            <div className="flex items-center gap-4 mb-6">
              <Button onClick={downloadTemplate} variant="outline" className="border-border/40">
                Download Template
              </Button>
            </div>
            
            <input 
              type="file" 
              accept=".csv,.xlsx,.xls" 
              onChange={handleFileChange} 
              className="hidden" 
              id="csv-upload" 
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <div className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2 ${file ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}>
                {file ? file.name : "Browse Files"}
              </div>
            </label>

            {file && (
              <div className="mt-8 pt-6 border-t border-border/40 w-full">
                <Button 
                  onClick={handleUpload} 
                  disabled={isSubmitting} 
                  className="w-full gap-2 shadow-lg shadow-primary/20 font-bold"
                  size="lg"
                >
                  <Upload className="w-4 h-4" />
                  {isSubmitting ? "Processing..." : `Upload ${file.name}`}
                </Button>
              </div>
            )}
          </div>

          {result && (
            <div className={`p-6 rounded-xl border ${result.success ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-destructive/10 border-destructive/20'}`}>
              <div className="flex items-center gap-3 mb-4">
                {result.success ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center text-destructive font-bold text-sm">!</div>
                )}
                <h3 className={`font-bold text-lg ${result.success ? 'text-emerald-500' : 'text-destructive'}`}>
                  {result.success ? "Upload Complete" : "Upload Failed"}
                </h3>
              </div>
              
              {result.success && (
                <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-4">
                  Successfully imported {result.count} items.
                </p>
              )}

              {result.errors && result.errors.length > 0 && (
                <div className="mt-4">
                  <p className="font-semibold text-sm mb-2 text-destructive">Errors Encountered:</p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-destructive/80">
                    {result.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-secondary/30 rounded-xl p-6 border border-border/40">
            <h3 className="font-bold mb-4">CSV / Excel Format Guide</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ensure your file contains the following exact column headers (row 1):
            </p>
            <ul className="space-y-3 text-sm">
              <li><code className="bg-background px-1.5 py-0.5 rounded text-primary border border-border/50">title</code> (Required)</li>
              <li><code className="bg-background px-1.5 py-0.5 rounded text-primary border border-border/50">content</code> (Required) - HTML allowed</li>
              <li><code className="bg-background px-1.5 py-0.5 rounded text-primary border border-border/50">type</code> (Required) - "BLOG" or "PAGE"</li>
              <li><code className="bg-background px-1.5 py-0.5 rounded border border-border/50">slug</code> (Optional)</li>
              <li><code className="bg-background px-1.5 py-0.5 rounded border border-border/50">published</code> (Optional) - "TRUE" or "FALSE"</li>
              <li><code className="bg-background px-1.5 py-0.5 rounded border border-border/50">publishAt</code> (Optional) - ISO Date e.g. "2026-06-05T10:00"</li>
              <li><code className="bg-background px-1.5 py-0.5 rounded border border-border/50">seoTitle</code> (Optional)</li>
              <li><code className="bg-background px-1.5 py-0.5 rounded border border-border/50">seoDesc</code> (Optional)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
