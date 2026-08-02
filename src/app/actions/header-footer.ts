"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { DEFAULT_HEADER_CONFIG, DEFAULT_FOOTER_CONFIG } from "@/lib/layout-defaults";

export async function getHeaderFooterConfig() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "global" }
    });

    const header = settings?.headerConfig 
      ? JSON.parse(settings.headerConfig) 
      : DEFAULT_HEADER_CONFIG;

    const footer = settings?.footerConfig 
      ? JSON.parse(settings.footerConfig) 
      : DEFAULT_FOOTER_CONFIG;

    return { header, footer };
  } catch (error) {
    console.error("Error fetching header-footer configs:", error);
    return {
      header: DEFAULT_HEADER_CONFIG,
      footer: DEFAULT_FOOTER_CONFIG
    };
  }
}

export async function saveHeaderConfig(config: object) {
  try {
    const session = await getSession();
    if (!session) {
      return { error: "Unauthorized" };
    }

    const configString = JSON.stringify(config);

    await prisma.siteSettings.upsert({
      where: { id: "global" },
      update: { headerConfig: configString },
      create: {
        id: "global",
        headerConfig: configString
      }
    });

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Error saving header config:", error);
    return { error: "Failed to save header configuration." };
  }
}

export async function saveFooterConfig(config: object) {
  try {
    const session = await getSession();
    if (!session) {
      return { error: "Unauthorized" };
    }

    const configString = JSON.stringify(config);

    await prisma.siteSettings.upsert({
      where: { id: "global" },
      update: { footerConfig: configString },
      create: {
        id: "global",
        footerConfig: configString
      }
    });

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Error saving footer config:", error);
    return { error: "Failed to save footer configuration." };
  }
}

export async function getNavigationOptions() {
  try {
    const session = await getSession();
    if (!session) {
      return { error: "Unauthorized" };
    }

    const [pages, posts] = await Promise.all([
      prisma.page.findMany({
        where: { published: true },
        select: { title: true, slug: true }
      }),
      prisma.post.findMany({
        where: { published: true },
        select: { title: true, slug: true }
      })
    ]);

    const formattedPages = pages.map(p => ({
      label: `Page: ${p.title}`,
      value: p.slug === "home" ? "/" : `/${p.slug}`
    }));

    const formattedPosts = posts.map(p => ({
      label: `Blog: ${p.title}`,
      value: `/blog/${p.slug}`
    }));

    return {
      success: true,
      options: [
        { label: "Custom Link", value: "custom" },
        { label: "Home Page", value: "/" },
        { label: "Blog Feed", value: "/blog" },
        ...formattedPages,
        ...formattedPosts
      ]
    };
  } catch (error) {
    console.error("Error getting navigation options:", error);
    return { error: "Failed to fetch page links options." };
  }
}
