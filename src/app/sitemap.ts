import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { caseStudies } from "@/data/case-studies";

export const dynamic = 'force-dynamic';

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
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Static core pages
  const corePages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/services/website-development`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/services/seo`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/services/advertisement`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/services/email-marketing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/services/graphic-designing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  return [...corePages, ...pageItems, ...postItems, ...caseStudyItems];
}
