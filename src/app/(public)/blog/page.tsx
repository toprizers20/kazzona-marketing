import { prisma } from "@/lib/db";
import BlogListClient from "./BlogListClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog | Digital Marketing Insights & Tips",
  description: "Expert insights on SEO, web development, email marketing, and digital advertising. Stay updated with the latest growth strategies from Kazzona Marketing.",
  alternates: {
    canonical: "https://kazzona.com/blog",
  },
  openGraph: {
    title: "Blog | Digital Marketing Insights & Tips",
    description: "Expert insights on SEO, web development, email marketing, and digital advertising.",
    url: "https://kazzona.com/blog",
    siteName: "Kazzona Marketing Agency",
    images: [{ url: "https://kazzona.com/icon.svg", width: 1200, height: 630, alt: "Kazzona Marketing Blog" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Blog | Digital Marketing Insights & Tips",
    description: "Expert insights on SEO, web development, email marketing, and digital advertising.",
    images: ["https://kazzona.com/icon.svg"],
    site: "@kazzona",
    creator: "@kazzona",
  },
};

export default async function BlogPage() {
  const limit = 12;

  const whereCondition = {
    published: true,
    OR: [
      { publishAt: null },
      { publishAt: { lte: new Date() } }
    ]
  };

  let posts: Awaited<ReturnType<typeof prisma.post.findMany>> = [];
  let totalCount = 0;

  try {
    [posts, totalCount] = await Promise.all([
      prisma.post.findMany({
        where: whereCondition,
        orderBy: { createdAt: "desc" },
        skip: 0,
        take: limit,
      }),
      prisma.post.count({ where: whereCondition })
    ]);
  } catch {
    // DB unavailable — show empty blog with static UI
  }

  const serializedPosts = posts.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    primaryKeyword: p.primaryKeyword,
    createdAt: p.createdAt.toISOString(),
    seoDesc: p.seoDesc,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Kazzona Marketing Blog",
            description: "Expert insights on SEO, web development, email marketing, and digital advertising.",
            url: "https://kazzona.com/blog",
            publisher: {
              "@type": "Organization",
              name: "Kazzona Marketing",
              logo: "https://kazzona.com/icon.svg",
            },
          }),
        }}
      />
      <div className="container mx-auto px-6 py-24 max-w-7xl">
        <div className="mb-16 animate-fade-down">
          <h1 className="font-heading text-5xl font-bold mb-6 text-foreground">
            Growth <span className="text-primary">Insights</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Actionable strategies on SEO, automation, and performance marketing from our experts.
          </p>
        </div>
        
        <BlogListClient initialPosts={serializedPosts} totalCount={totalCount} />
      </div>
    </>
  );
}
