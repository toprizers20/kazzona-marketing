import { prisma } from "@/lib/db";
import Link from "next/link";
import { format } from "date-fns";
import { Search, ArrowRight, FileText, LayoutTemplate, Briefcase } from "lucide-react";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search Results",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || "";

  let blogResults: any[] = [];
  let pageResults: any[] = [];

  if (q.trim()) {
    const searchString = q.trim();
    
    // Search blogs
    blogResults = await prisma.post.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: searchString } },
          { content: { contains: searchString } },
          { seoDesc: { contains: searchString } },
          { primaryKeyword: { contains: searchString } }
        ],
        AND: [
          { OR: [{ publishAt: null }, { publishAt: { lte: new Date() } }] }
        ]
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    // Search pages (Services, About, etc)
    pageResults = await prisma.page.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: searchString } },
          { content: { contains: searchString } },
          { seoDesc: { contains: searchString } }
        ]
      },
      take: 10
    });
  }

  const hasSearched = q.trim().length > 0;
  const totalResults = blogResults.length + pageResults.length;

  return (
    <div className="container mx-auto px-6 py-32 max-w-5xl min-h-[70vh]">
      <div className="mb-12">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6 text-foreground text-center">
          Search <span className="text-primary">Kazzona</span>
        </h1>
        
        <form action="/search" method="GET" className="relative max-w-2xl mx-auto mt-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search for SEO, Web Development, or specific blogs..."
              className="block w-full pl-11 pr-32 py-4 bg-card border border-border/60 rounded-full text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-base sm:text-lg transition-all"
              autoFocus
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {hasSearched && (
        <div className="mt-12">
          <p className="text-muted-foreground mb-8 text-center">
            Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "<span className="text-foreground font-medium">{q}</span>"
          </p>

          {totalResults === 0 ? (
            <div className="text-center py-16 bg-card border border-border/40 rounded-2xl">
              <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No results found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or browse our latest blogs.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
              {/* Render Service Pages first */}
              {pageResults.map(page => (
                <Link key={`page-${page.id}`} href={`/${page.slug}`} className="group">
                  <div className="p-6 bg-card border border-border/40 rounded-2xl hover:border-primary/50 hover:shadow-md transition-all flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                      {page.slug.startsWith('services') ? <Briefcase className="w-6 h-6" /> : <LayoutTemplate className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                          {page.slug.startsWith('services') ? 'Service' : 'Page'}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-primary transition-colors">{page.title}</h3>
                      {page.seoDesc && <p className="text-muted-foreground text-sm line-clamp-2">{page.seoDesc}</p>}
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-4 hidden sm:block" />
                  </div>
                </Link>
              ))}

              {/* Render Blog Posts */}
              {blogResults.map(post => (
                <Link key={`post-${post.id}`} href={`/blog/${post.slug}`} className="group">
                  <div className="p-6 bg-card border border-border/40 rounded-2xl hover:border-primary/50 hover:shadow-md transition-all flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                          Blog Post
                        </span>
                        <span className="text-xs text-muted-foreground border-l border-border/60 pl-2">
                          {format(new Date(post.createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                      {post.seoDesc && <p className="text-muted-foreground text-sm line-clamp-2">{post.seoDesc}</p>}
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-4 hidden sm:block" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
