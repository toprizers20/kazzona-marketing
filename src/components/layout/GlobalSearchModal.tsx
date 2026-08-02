"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, ArrowRight, Briefcase, FileText, LayoutTemplate, Zap } from "lucide-react";
import Link from "next/link";
import { searchGlobal } from "@/app/actions/search";

interface SearchResult {
  blogs: { id: string; title: string; slug: string; seoDesc: string | null }[];
  pages: { id: string; title: string; slug: string; seoDesc: string | null }[];
}

export function GlobalSearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setQuery("");
      setResults(null);
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchGlobal(query);
        setResults(res);
      } catch (err) {
        console.error("Search failed:", err);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const searchIdeas = [
    "SEO Services", "Website Development", "Email Marketing", "Case Studies", "Digital Strategy"
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center bg-background/80 backdrop-blur-md p-4 pt-20 sm:pt-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-card border border-border/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 fade-in duration-200"
      >
        <div className="relative border-b border-border/40 p-4 flex items-center">
          <Search className="w-6 h-6 text-muted-foreground shrink-0 ml-2" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for services, blogs, or strategies..."
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-lg px-4 text-foreground placeholder:text-muted-foreground/60"
          />
          {loading && <Loader2 className="w-5 h-5 animate-spin text-primary shrink-0 mr-2" />}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6 flex-1 custom-scrollbar">
          {!query.trim() && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" /> Suggested Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {searchIdeas.map((idea) => (
                    <button
                      key={idea}
                      onClick={() => setQuery(idea)}
                      className="px-4 py-2 rounded-full bg-secondary/30 hover:bg-primary hover:text-primary-foreground border border-border/40 text-sm font-medium transition-colors"
                    >
                      {idea}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {query.trim() && results && (
            <div className="space-y-8">
              {results.pages.length === 0 && results.blogs.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No results found for &quot;{query}&quot;</p>
                </div>
              )}

              {results.pages.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pages & Services</p>
                  {results.pages.map((page) => (
                    <Link
                      key={page.id}
                      href={`/${page.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 group transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                        {page.slug.startsWith('services') ? <Briefcase className="w-5 h-5" /> : <LayoutTemplate className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">{page.title}</p>
                        {page.seoDesc && <p className="text-sm text-muted-foreground truncate">{page.seoDesc}</p>}
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              )}

              {results.blogs.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Blog Posts</p>
                  {results.blogs.map((blog) => (
                    <Link
                      key={blog.id}
                      href={`/blog/${blog.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 group transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">{blog.title}</p>
                        {blog.seoDesc && <p className="text-sm text-muted-foreground truncate">{blog.seoDesc}</p>}
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
