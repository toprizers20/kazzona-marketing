import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { caseStudies } from "@/data/case-studies";

// Use ISR caching instead of force-dynamic
export const revalidate = 3600; // Revalidate every hour

// Stable date for static pages (avoids changing every request)
const STATIC_LAST_MODIFIED = new Date("2026-01-01");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kazzona.com";

  // Get all published blog posts
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  // Get all published pages
  const pages = await prisma.page.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

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
