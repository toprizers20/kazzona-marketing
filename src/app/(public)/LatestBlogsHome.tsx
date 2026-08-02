import { prisma } from "@/lib/db";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, BookOpen } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default async function LatestBlogsHome() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      OR: [
        { publishAt: null },
        { publishAt: { lte: new Date() } }
      ]
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  if (posts.length === 0) return null;

  return (
    <section className="py-24 bg-card/30 border-t border-border/50 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" /> Marketing Insights
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Latest Strategies</h2>
            <p className="text-lg text-muted-foreground">Actionable tactics and automated growth experiments straight from our team.</p>
          </div>
          <Link href="/blog" className={buttonVariants({ variant: "outline", className: "rounded-full shrink-0" })}>
            View All Articles <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col bg-card border border-border/50 rounded-3xl overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] bg-secondary text-foreground px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    {post.primaryKeyword || "Strategy"}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {format(new Date(post.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-primary transition-colors line-clamp-3">
                  {post.title}
                </h3>
                {post.seoDesc && (
                  <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-6 flex-1">
                    {post.seoDesc}
                  </p>
                )}
                <div className="mt-auto pt-6 border-t border-border/30 flex items-center justify-between text-sm font-bold">
                  <span className="text-foreground group-hover:text-primary transition-colors">Read Article</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
