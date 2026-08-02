"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Loader2, Clock, BookOpen } from "lucide-react";
import { getMoreBlogs } from "@/app/actions/blog";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  primaryKeyword: string | null;
  createdAt: string;
  seoDesc: string | null;
}

const tagColors = [
  "bg-orange-50 text-orange-600 border-orange-100",
  "bg-emerald-50 text-emerald-600 border-emerald-100",
  "bg-blue-50 text-blue-600 border-blue-100",
  "bg-violet-50 text-violet-600 border-violet-100",
];

export default function BlogListClient({ initialPosts, totalCount }: { initialPosts: BlogPost[], totalCount: number }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  
  const hasMore = posts.length < totalCount;
  const limit = 12;

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const morePosts = await getMoreBlogs(posts.length, limit);
      setPosts(prev => [...prev, ...morePosts]);
    } catch (err) {
      console.error("Failed to load more blogs:", err);
    }
    setLoading(false);
  };

  const estimateReadTime = (title: string, desc: string | null) => {
    const words = title.split(" ").length + (desc?.split(" ").length || 0);
    return Math.max(3, Math.ceil(words / 40));
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <div className="col-span-full py-12 text-muted-foreground text-center bg-card border border-border/40 rounded-2xl p-8">
            No insights published yet. Check back soon.
          </div>
        ) : (
          posts.map((post, idx) => {
            const tagColor = tagColors[idx % tagColors.length];
            const readTime = estimateReadTime(post.title, post.seoDesc);

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1">
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Top row: tag + date */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border ${tagColor}`}>
                        {post.primaryKeyword || "Digital Marketing"}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {format(new Date(post.createdAt), "MMM d, yyyy")}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-[17px] font-bold text-gray-900 mb-3 group-hover:text-[#F97316] transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    {/* Description */}
                    {post.seoDesc && (
                      <p className="text-gray-400 text-sm line-clamp-2 mb-5 leading-relaxed">
                        {post.seoDesc}
                      </p>
                    )}

                    {/* Bottom row */}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        {readTime} min read
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-[#F97316]">
                        Read
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button 
            onClick={handleLoadMore} 
            disabled={loading}
            size="lg"
            variant="outline"
            className="w-full sm:w-auto px-8 min-w-[200px] rounded-full"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading...</>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
