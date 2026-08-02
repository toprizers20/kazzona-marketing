"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateContent, ContentType } from "@/app/actions/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TiptapEditor } from "@/components/TiptapEditor";
import { ArrowLeft, Save, Send } from "lucide-react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Sparkles, Loader2 } from "lucide-react";

export function EditContentClient({ 
  initialData, 
  type 
}: { 
  initialData: any;
  type: ContentType;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData.title);
  const [slug, setSlug] = useState(initialData.slug);
  const [content, setContent] = useState(initialData.content);
  const [seoTitle, setSeoTitle] = useState(initialData.seoTitle);
  const [seoDesc, setSeoDesc] = useState(initialData.seoDesc);
  const [published, setPublished] = useState(initialData.published);
  const [publishAt, setPublishAt] = useState(
    initialData.publishAt ? new Date(initialData.publishAt).toISOString().slice(0, 16) : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successUrl, setSuccessUrl] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const wordCount = content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;

  const handleAiCheck = async () => {
    setIsAiLoading(true);
    setAiFeedback("");
    try {
      const plainText = content.replace(/<[^>]+>/g, ' ');
      const prompt = `Analyze this blog post for SEO, trends, and quality. Content: ${plainText.substring(0, 1500)}... Provide a brief review in 2-3 sentences.`;
      const res = await fetch(`https://text.pollinations.ai/prompt/${encodeURIComponent(prompt)}`);
      const text = await res.text();
      setAiFeedback(text);
    } catch (err) {
      setAiFeedback("Failed to fetch AI feedback.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title || !slug || !content) {
      setError("Title, slug, and content are required.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await updateContent(initialData.id, { 
        title, 
        slug, 
        content, 
        seoTitle, 
        seoDesc, 
        published,
        publishAt: publishAt ? new Date(publishAt) : null,
        type 
      });
      if (result.error) {
        setError(result.error);
      } else {
        const url = type === 'BLOG' ? `/blog/${slug}` : `/${slug}`;
        setSuccessUrl(url);
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24">
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/content">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold tracking-tight">Edit {type === 'BLOG' ? 'Blog Post' : 'Landing Page'}</h2>
            <p className="text-sm text-muted-foreground">Editing: {initialData.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Label htmlFor="published" className="text-sm font-medium cursor-pointer">
              {published ? "Published" : "Draft"}
            </Label>
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
            />
          </div>
          <Button onClick={handleSave} disabled={isSubmitting} className="gap-2">
            {published ? <Send className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}

      {successUrl && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-6 py-4 rounded-xl text-sm font-medium flex items-center justify-between">
          <div>
            Content updated successfully! It is available at{" "}
            <Link href={successUrl} target="_blank" className="font-bold underline hover:text-emerald-400">
              {successUrl}
            </Link>
          </div>
          <div className="flex gap-3">
            <Link href={successUrl} target="_blank">
              <Button size="sm" variant="outline" className="border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-500">View Live</Button>
            </Link>
            <Button size="sm" onClick={() => router.push("/dashboard/content")} className="bg-emerald-600 hover:bg-emerald-700 text-white">Go to List</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-semibold h-12 bg-card"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Content</Label>
              <div className="flex items-center gap-4">
                <span className={`text-xs font-bold ${wordCount < 1000 && type === 'BLOG' ? 'text-amber-500' : 'text-emerald-500'}`}>
                  {wordCount} Words {type === 'BLOG' && wordCount < 1000 && "(Min 1000 req for publish)"}
                </span>
                <Button variant="outline" size="sm" onClick={handleAiCheck} disabled={isAiLoading || !content} className="h-8 gap-1.5 border-primary/30 text-primary hover:bg-primary/10">
                  {isAiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  AI Check
                </Button>
              </div>
            </div>
            <TiptapEditor content={content} onChange={setContent} />
            
            {aiFeedback && (
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <h4 className="font-bold text-sm text-orange-400">AI SEO & Trend Analysis</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {aiFeedback}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border/40 p-5 rounded-xl space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 border-b border-border/40 pb-2">
              Metadata
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <div className="flex items-center">
                <span className="bg-secondary/50 border border-r-0 border-border/40 px-3 py-2 rounded-l-md text-sm text-muted-foreground">
                  {type === 'BLOG' ? '/blog/' : '/'}
                </span>
                <Input 
                  id="slug" 
                  value={slug} 
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  className="rounded-l-none bg-card"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Currently accessible at <span className="font-mono text-primary">{type === 'BLOG' ? `/blog/${slug}` : `/${slug}`}</span>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seoTitle">SEO Title (Optional)</Label>
              <Input 
                id="seoTitle" 
                placeholder="Custom title for search engines" 
                value={seoTitle} 
                onChange={(e) => setSeoTitle(e.target.value)}
                className="bg-card"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seoDesc">SEO Description (Optional)</Label>
              <textarea 
                id="seoDesc" 
                placeholder="Brief summary for meta description..." 
                value={seoDesc} 
                onChange={(e) => setSeoDesc(e.target.value)}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div className="space-y-2 pt-4 border-t border-border/40">
              <Label htmlFor="publishAt">Schedule (Publish At)</Label>
              <Input 
                id="publishAt" 
                type="datetime-local"
                value={publishAt} 
                onChange={(e) => setPublishAt(e.target.value)}
                className="bg-card"
              />
              <p className="text-xs text-muted-foreground mt-1">Leave empty to publish immediately.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
