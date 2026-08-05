import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { LeadCapturePopup } from "@/components/layout/LeadCapturePopup";
import { sanitizeSchemaMarkup, sanitizeHeaderScript, sanitizeHtml } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let post = null;
  try {
    post = await prisma.post.findUnique({
      where: { slug },
    });
  } catch {
    // DB unavailable — return default metadata
    return { title: "Blog Post | Kazzona Marketing" };
  }

  if (!post || !post.published || (post.publishAt && post.publishAt > new Date())) {
    return { title: "Post Not Found" };
  }

  const metadata: Metadata = {
    title: post.seoTitle || `${post.title} | Kazzona Marketing`,
    description: post.seoDesc || "Read this growth insight from Kazzona Marketing.",
    other: {
      "article:published_time": post.publishAt ? post.publishAt.toISOString() : post.createdAt.toISOString(),
      "article:modified_time": post.updatedAt.toISOString(),
      "article:author": "Kazzona Marketing",
      "article:section": post.primaryKeyword || "Digital Marketing",
    },
  };

  if (post.canonicalUrl) {
    metadata.alternates = {
      canonical: post.canonicalUrl,
    };
  } else {
    metadata.alternates = {
      canonical: `https://kazzona.com/blog/${post.slug}`,
    };
  }

  metadata.openGraph = {
    title: post.seoTitle || `${post.title} | Kazzona Marketing`,
    description: post.seoDesc || "Read this growth insight from Kazzona Marketing.",
    url: `https://kazzona.com/blog/${post.slug}`,
    siteName: "Kazzona Marketing Agency",
    images: [{ url: "https://kazzona.com/icon.svg", width: 1200, height: 630, alt: post.title }],
    type: "article",
    publishedTime: post.publishAt ? post.publishAt.toISOString() : post.createdAt.toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
    authors: ["Kazzona Marketing"],
    tags: [post.primaryKeyword, post.secondaryKeyword].filter(Boolean) as string[],
  };

  metadata.twitter = {
    card: "summary_large_image" as const,
    title: post.seoTitle || `${post.title} | Kazzona Marketing`,
    description: post.seoDesc || "Read this growth insight from Kazzona Marketing.",
    images: ["https://kazzona.com/icon.svg"],
  };

  return metadata;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = null;
  try {
    post = await prisma.post.findUnique({
      where: { slug },
    });
  } catch {
    notFound();
  }

  // Verify it's published and not scheduled for the future
  if (!post || !post.published || (post.publishAt && post.publishAt > new Date())) {
    notFound();
  }

  // Fetch related insights (up to 3 recent posts, excluding the current one)
  let relatedPosts: Awaited<ReturnType<typeof prisma.post.findMany>> = [];
  try {
    relatedPosts = await prisma.post.findMany({
      where: {
        published: true,
        slug: { not: slug },
        OR: [
          { publishAt: null },
          { publishAt: { lte: new Date() } }
        ]
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch {
    // Related posts unavailable — continue without them
  }

  return (
    <div className="container mx-auto px-6 py-24 max-w-7xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://kazzona.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blog",
                  "item": "https://kazzona.com/blog"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": post.title,
                  "item": `https://kazzona.com/blog/${post.slug}`
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://kazzona.com/blog/${post.slug}`
              },
              "headline": post.title,
              "description": post.seoDesc || post.title,
              "image": "https://kazzona.com/icon.svg",
              "author": {
                "@type": "Organization",
                "name": "Kazzona Marketing",
                "url": "https://kazzona.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Kazzona Marketing",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://kazzona.com/icon.svg"
                }
              },
              "datePublished": post.publishAt ? post.publishAt.toISOString() : post.createdAt.toISOString(),
              "dateModified": post.updatedAt.toISOString(),
              "inLanguage": "en-IN",
              "isAccessibleForFree": "True",
              "keywords": post.primaryKeyword ? [post.primaryKeyword, post.secondaryKeyword].filter(Boolean).join(", ") : "Digital Marketing, SEO, Growth Strategy",
              "reviewedBy": {
                "@type": "Organization",
                "name": "Kazzona SEO Team"
              }
            }
          ])
        }}
      />
      {post.schemaMarkup && (() => {
        const safeSchema = sanitizeSchemaMarkup(post.schemaMarkup);
        if (!safeSchema) return null;
        return (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeSchema }}
          />
        );
      })()}
      {post.headerScript && (() => {
        const safeScript = sanitizeHeaderScript(post.headerScript);
        if (!safeScript) return null;
        return (
          <div
            style={{ display: "none" }}
            dangerouslySetInnerHTML={{ __html: safeScript }}
          />
        );
      })()}
      <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-12">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to all insights
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main Content Column */}
        <article className="lg:col-span-8 space-y-10">
          <header className="border-b border-border/40 pb-8">
            <div className="flex items-center gap-4 text-sm font-semibold text-primary mb-6">
              <span className="uppercase tracking-wider">
                {post.primaryKeyword || "SEO Strategy"}
              </span>
              <span className="text-muted-foreground font-normal">
                {format(new Date(post.createdAt), "MMMM d, yyyy")}
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold leading-tight mb-6 text-foreground">
              {post.title}
            </h1>
            {post.seoDesc && (
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                {post.seoDesc}
              </p>
            )}
          </header>

          {/* Tiptap or Pollinations generates HTML content, rendered inside tailwind typography classes */}
          <div 
            className="prose prose-base sm:prose-lg dark:prose-invert prose-headings:font-heading prose-a:text-primary max-w-none prose-img:rounded-2xl prose-img:border prose-img:border-border/40 prose-img:shadow-sm prose-p:my-6 prose-p:leading-relaxed prose-headings:mt-12 prose-headings:mb-6 prose-ul:my-6 prose-ol:my-6 prose-li:my-2 prose-blockquote:my-8 prose-blockquote:pl-6 prose-blockquote:border-l-4 prose-blockquote:border-primary/50"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
          />
        </article>

        {/* Sidebar Column */}
        <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="border border-border/40 bg-card rounded-2xl p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold mb-4 text-foreground">Related Insights</h3>
              <div className="space-y-4">
                {relatedPosts.map((related) => (
                  <Link key={related.id} href={`/blog/${related.slug}`} className="group block">
                    <div className="p-3 rounded-lg hover:bg-secondary/15 border border-transparent hover:border-border/20 transition-all">
                      <span className="text-[10px] text-primary uppercase font-bold tracking-wider mb-1 block">
                        {related.primaryKeyword || "Strategy"}
                      </span>
                      <h4 className="font-heading text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(related.createdAt), "MMM d, yyyy")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Book a Strategy Call CTA */}
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-yellow-500/5 p-6 shadow-lg shadow-primary/5">
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="relative z-10 space-y-4">
              <div className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full w-fit">
                Free Consultation
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">Ready to scale your business?</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Book a 1-on-1 strategy call with our digital growth specialists. We will analyze your search footprint and custom design an organic scaling roadmap.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex w-full items-center justify-center rounded-lg bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-bold py-3 transition-colors shadow-md"
              >
                Schedule Strategy Call
              </Link>
            </div>
          </div>
        </aside>
      </div>
      
      {/* Lead Capture Popup */}
      <LeadCapturePopup />
    </div>
  );
}
