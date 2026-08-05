import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { caseStudies } from "@/data/case-studies";

// Force dynamic — generated at request time, not build time
// This avoids DB connection failures during static generation on Hostinger
export const dynamic = "force-dynamic";

// Stable date for static pages (avoids changing every request)
const STATIC_LAST_MODIFIED = new Date("2026-01-01");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kazzona.com";

  let posts: { slug: string; updatedAt: Date }[] = [];
  let pages: { slug: string; updatedAt: Date }[] = [];

  try {
    [posts, pages] = await Promise.all([
      prisma.post.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.page.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);
  } catch {
    // DB unavailable — return only static pages
  }

  // Dynamic blog post sitemap items
  const postItems = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic landing page sitemap items
  const coreSlugSet = new Set(["home", "about", "services", "case-studies", "contact", "pricing",
    "services/website-development", "services/seo", "services/advertisement",
    "services/email-marketing", "services/graphic-designing"]);
  
  const pageItems = pages
    .filter((p) => !coreSlugSet.has(p.slug))
    .map((p) => ({
      url: `${baseUrl}/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  // Case studies
  const caseStudyItems = caseStudies.map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Static core pages
  const corePages = [
    { url: baseUrl, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/services/website-development`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/services/seo`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/services/advertisement`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/services/email-marketing`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/services/graphic-designing`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/case-studies`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${baseUrl}/blog`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  return [...corePages, ...pageItems, ...postItems, ...caseStudyItems];
}
