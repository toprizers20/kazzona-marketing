"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export interface SEOContentItem {
  id: string;
  title: string;
  slug: string;
  type: "BLOG" | "PAGE";
  seoTitle: string | null;
  seoDesc: string | null;
  schemaMarkup: string | null;
  headerScript: string | null;
  canonicalUrl: string | null;
  imageAlt: string | null;
  published: boolean;
}

const DEFAULT_STATIC_PAGES = [
  { slug: "home", title: "Home Page", seoTitle: "Kazzona Marketing | Premium Digital Marketing Agency", seoDesc: "Enterprise growth agency focused on lead generation, SEO, branding, and automation." },
  { slug: "about", title: "About Us", seoTitle: "About Us | Kazzona Marketing — India's Leading Digital Marketing Agency", seoDesc: "Learn about Kazzona Marketing, India's fastest-growing digital marketing agency based in Noida. 200+ clients, ₹100Cr+ revenue generated, 50+ team members." },
  { slug: "services", title: "Services", seoTitle: "Our Services | Kazzona Marketing", seoDesc: "360° Digital Growth Solutions for organic SEO, performance ads, web development, and email marketing." },
  { slug: "services/website-development", title: "Website Development", seoTitle: "Website Development Services | Kazzona Marketing", seoDesc: "Premium website development using React, Next.js, and modern frameworks. Build fast, scalable, SEO-optimized websites." },
  { slug: "services/seo", title: "SEO Services", seoTitle: "SEO Services | Kazzona Marketing", seoDesc: "Dominate search rankings with our data-driven SEO strategies. On-page, off-page, technical SEO, and local SEO services." },
  { slug: "services/advertisement", title: "Advertisement Services", seoTitle: "Digital Advertising | Kazzona Marketing", seoDesc: "High-ROI Google Ads, Facebook Ads, and LinkedIn Ads campaigns managed by certified performance marketers." },
  { slug: "services/email-marketing", title: "Email Marketing", seoTitle: "Email Marketing Services | Kazzona Marketing", seoDesc: "Automated email campaigns, drip sequences, and newsletter management for maximum engagement and conversions." },
  { slug: "services/graphic-designing", title: "Graphic Designing", seoTitle: "Graphic Design Services | Kazzona Marketing", seoDesc: "Professional graphic design for branding, social media creatives, presentations, and marketing collaterals." },
  { slug: "case-studies", title: "Case Studies", seoTitle: "Case Studies & Success Stories | Kazzona Marketing", seoDesc: "Read our case studies of how we helped Indian brands scale their revenue through performance marketing." },
  { slug: "contact", title: "Contact Us", seoTitle: "Contact Us | Kazzona Marketing", seoDesc: "Get in touch with Kazzona Marketing. Book a free 30-minute digital strategy session to scale your business." },
];

export async function getSEOContentList(): Promise<SEOContentItem[]> {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    // Auto-seed default static pages if missing
    for (const p of DEFAULT_STATIC_PAGES) {
      const existing = await prisma.page.findUnique({ where: { slug: p.slug } });
      if (!existing) {
        await prisma.page.create({
          data: {
            slug: p.slug,
            title: p.title,
            content: `Static content for ${p.title}`,
            published: true,
            seoTitle: p.seoTitle,
            seoDesc: p.seoDesc,
          },
        });
      }
    }

    const [posts, pages] = await Promise.all([
      prisma.post.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          seoTitle: true,
          seoDesc: true,
          schemaMarkup: true,
          headerScript: true,
          canonicalUrl: true,
          imageAlt: true,
          published: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.page.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          seoTitle: true,
          seoDesc: true,
          schemaMarkup: true,
          headerScript: true,
          canonicalUrl: true,
          imageAlt: true,
          published: true,
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const formattedPosts: SEOContentItem[] = posts.map((p) => ({
      ...p,
      type: "BLOG",
    }));

    const formattedPages: SEOContentItem[] = pages.map((p) => ({
      ...p,
      type: "PAGE",
    }));

    return [...formattedPages, ...formattedPosts];
  } catch (error) {
    console.error("Error in getSEOContentList:", error);
    return [];
  }
}

export async function updateSEOFields(
  id: string,
  type: "BLOG" | "PAGE",
  data: {
    slug: string;
    seoTitle?: string;
    seoDesc?: string;
    schemaMarkup?: string;
    headerScript?: string;
    canonicalUrl?: string;
    imageAlt?: string;
  }
) {
  try {
    const session = await getSession();
    if (!session) {
      return { error: "Unauthorized" };
    }

    const cleanSlug = data.slug.toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!cleanSlug) {
      return { error: "Slug cannot be empty." };
    }

    const payload = {
      slug: cleanSlug,
      seoTitle: data.seoTitle || null,
      seoDesc: data.seoDesc || null,
      schemaMarkup: data.schemaMarkup || null,
      headerScript: data.headerScript || null,
      canonicalUrl: data.canonicalUrl || null,
      imageAlt: data.imageAlt || null,
    };

    if (type === "BLOG") {
      // Check duplicate slug
      const existing = await prisma.post.findFirst({
        where: { slug: cleanSlug, NOT: { id } },
      });
      if (existing) {
        return { error: "Another blog post already uses this slug." };
      }

      const prevPost = await prisma.post.findUnique({ where: { id }, select: { slug: true } });
      await prisma.post.update({
        where: { id },
        data: payload,
      });

      if (prevPost?.slug) {
        revalidatePath(`/blog/${prevPost.slug}`);
      }
      revalidatePath(`/blog/${cleanSlug}`);
    } else {
      // Check duplicate slug
      const existing = await prisma.page.findFirst({
        where: { slug: cleanSlug, NOT: { id } },
      });
      if (existing) {
        return { error: "Another page already uses this slug." };
      }

      const prevPage = await prisma.page.findUnique({ where: { id }, select: { slug: true } });
      await prisma.page.update({
        where: { id },
        data: payload,
      });

      if (prevPage?.slug) {
        revalidatePath(`/${prevPage.slug}`);
      }
      revalidatePath(`/${cleanSlug}`);
    }

    revalidatePath("/blog");
    revalidatePath("/dashboard/seo");
    return { success: true };
  } catch (error) {
    console.error("Error updating SEO fields:", error);
    return { error: "Failed to update SEO configurations." };
  }
}

// Global Site Settings functions
export async function getSiteSettings() {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    let settings = await prisma.siteSettings.findUnique({
      where: { id: "global" },
    });

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: "global",
          robotsTxt: `User-agent: *\nAllow: /\nDisallow: /dashboard/\nDisallow: /api/\n\nSitemap: https://kazzona.com/sitemap.xml`,
        },
      });
    }

    return settings;
  } catch (error) {
    console.error("Error fetching SiteSettings:", error);
    return null;
  }
}

export async function updateSiteSettings(data: {
  gaTrackingId?: string;
  gtmContainerId?: string;
  gscVerification?: string;
  robotsTxt?: string;
  globalHeadCode?: string;
  defaultLang?: string;
}) {
  try {
    const session = await getSession();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await prisma.siteSettings.upsert({
      where: { id: "global" },
      update: {
        gaTrackingId: data.gaTrackingId || null,
        gtmContainerId: data.gtmContainerId || null,
        gscVerification: data.gscVerification || null,
        robotsTxt: data.robotsTxt || null,
        globalHeadCode: data.globalHeadCode || null,
        defaultLang: data.defaultLang || "en",
      },
      create: {
        id: "global",
        gaTrackingId: data.gaTrackingId || null,
        gtmContainerId: data.gtmContainerId || null,
        gscVerification: data.gscVerification || null,
        robotsTxt: data.robotsTxt || null,
        globalHeadCode: data.globalHeadCode || null,
        defaultLang: data.defaultLang || "en",
      },
    });

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Error updating SiteSettings:", error);
    return { error: "Failed to update global integrations and settings." };
  }
}

// Redirect functions
export async function getRedirects() {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    return await prisma.redirect.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error in getRedirects:", error);
    return [];
  }
}

export async function createRedirect(fromPath: string, toPath: string, statusCode: number = 301) {
  try {
    const session = await getSession();
    if (!session) {
      return { error: "Unauthorized" };
    }

    // Format clean paths
    let cleanFrom = fromPath.trim();
    if (!cleanFrom.startsWith("/")) {
      cleanFrom = "/" + cleanFrom;
    }
    let cleanTo = toPath.trim();
    if (!cleanTo.startsWith("/") && !cleanTo.startsWith("http")) {
      cleanTo = "/" + cleanTo;
    }

    if (cleanFrom === cleanTo) {
      return { error: "Redirect source and target paths cannot be the same." };
    }

    const existing = await prisma.redirect.findUnique({
      where: { fromPath: cleanFrom },
    });

    if (existing) {
      return { error: `A redirect from ${cleanFrom} already exists.` };
    }

    await prisma.redirect.create({
      data: {
        fromPath: cleanFrom,
        toPath: cleanTo,
        statusCode,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating redirect:", error);
    return { error: "Failed to create redirect mapping." };
  }
}

export async function deleteRedirect(id: string) {
  try {
    const session = await getSession();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await prisma.redirect.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting redirect:", error);
    return { error: "Failed to delete redirect mapping." };
  }
}
