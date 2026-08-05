import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { sanitizeHeaderScript, sanitizeSchemaMarkup } from "@/lib/sanitize";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let page = null;
  try {
    page = await prisma.page.findUnique({
      where: { slug },
    });
  } catch {
    return { title: "Page | Kazzona Marketing" };
  }

  if (!page || !page.published || (page.publishAt && page.publishAt > new Date())) {
    return { title: "Not Found" };
  }

  const title = page.seoTitle || page.title;
  const description = page.seoDesc || "";

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://kazzona.com/${page.slug}`,
      siteName: "Kazzona Marketing Agency",
      images: [
        {
          url: "https://kazzona.com/icon.svg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://kazzona.com/icon.svg"],
    },
  };

  if (page.canonicalUrl) {
    metadata.alternates = {
      canonical: page.canonicalUrl,
    };
  } else {
    metadata.alternates = {
      canonical: `https://kazzona.com/${page.slug}`,
    };
  }

  return metadata;
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let page = null;
  try {
    page = await prisma.page.findUnique({
      where: { slug },
    });
  } catch {
    notFound();
  }

  if (!page || !page.published || (page.publishAt && page.publishAt > new Date())) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
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
                  "name": page.title,
                  "item": `https://kazzona.com/${page.slug}`
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://kazzona.com/${page.slug}`
              },
              "headline": page.title,
              "description": page.seoDesc || page.title,
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
              "datePublished": page.publishAt ? page.publishAt.toISOString() : page.createdAt.toISOString(),
              "dateModified": page.updatedAt.toISOString(),
              "inLanguage": "en-IN",
              "isAccessibleForFree": "True",
              "keywords": page.primaryKeyword ? [page.primaryKeyword, page.secondaryKeyword].filter(Boolean).join(", ") : "Digital Marketing, SEO, Growth Strategy",
              "reviewedBy": {
                "@type": "Organization",
                "name": "Kazzona Expert Team"
              }
            }
          ])
        }}
      />
      {page.schemaMarkup && sanitizeSchemaMarkup(page.schemaMarkup) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: sanitizeSchemaMarkup(page.schemaMarkup)! }}
        />
      )}
      {page.headerScript && sanitizeHeaderScript(page.headerScript) && (
        <div
          style={{ display: "none" }}
          dangerouslySetInnerHTML={{ __html: sanitizeHeaderScript(page.headerScript)! }}
        />
      )}
      <div className="pt-32 pb-24 border-b border-border/50 bg-secondary/20 relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
         <div className="container mx-auto px-6 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
               {page.title}
            </h1>
         </div>
      </div>
      <div className="container mx-auto px-6 max-w-4xl py-16">
        <div 
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl prose-p:my-6 prose-p:leading-relaxed prose-headings:mt-12 prose-headings:mb-6 prose-ul:my-6 prose-ol:my-6 prose-li:my-2 prose-img:my-10 prose-hr:my-12 prose-blockquote:my-8 prose-blockquote:pl-6 prose-blockquote:border-l-4 prose-blockquote:border-primary/50"
          dangerouslySetInnerHTML={{ __html: page.content }} 
        />
      </div>
    </div>
  );
}
