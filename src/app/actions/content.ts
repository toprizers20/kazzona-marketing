"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export type ContentType = "BLOG" | "PAGE";

export async function createContent(data: {
  title: string;
  slug: string;
  content: string;
  seoTitle?: string;
  seoDesc?: string;
  published: boolean;
  publishAt?: Date | null;
  type: ContentType;
}) {
  try {
    const session = await getSession();
    if (!session || !session.email) {
      return { error: "Not authorized" };
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email: session.email },
    });

    if (!admin) {
      return { error: "Admin not found" };
    }

    if (data.type === "BLOG") {
      const existing = await prisma.post.findUnique({ where: { slug: data.slug } });
      if (existing) return { error: "A blog post with this slug already exists." };

      if (data.published) {
        const plainText = data.content.replace(/<[^>]+>/g, ' ');
        const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount < 1000) {
          return { error: `Blog posts must have a minimum of 1000 words to be published for optimal SEO. Current word count: ${wordCount}. Save as draft instead.` };
        }
      }

      const post = await prisma.post.create({
        data: {
          title: data.title,
          slug: data.slug,
          content: data.content,
          seoTitle: data.seoTitle,
          seoDesc: data.seoDesc,
          published: data.published,
          publishAt: data.publishAt,
          authorId: admin.id,
        },
      });
      return { success: true, id: post.id };
    } else {
      const existing = await prisma.page.findUnique({ where: { slug: data.slug } });
      if (existing) return { error: "A page with this slug already exists." };

      const page = await prisma.page.create({
        data: {
          title: data.title,
          slug: data.slug,
          content: data.content,
          seoTitle: data.seoTitle,
          seoDesc: data.seoDesc,
          published: data.published,
          publishAt: data.publishAt,
          authorId: admin.id,
        },
      });
      return { success: true, id: page.id };
    }
  } catch (error) {
    console.error("Error creating content:", error);
    return { error: "Failed to create content." };
  }
}

export async function updateContent(
  id: string,
  data: {
    title: string;
    slug: string;
    content: string;
    seoTitle?: string;
    seoDesc?: string;
    published: boolean;
    publishAt?: Date | null;
    type: ContentType;
  }
) {
  try {
    const session = await getSession();
    if (!session) return { error: "Not authorized" };

    if (data.type === "BLOG") {
      const existing = await prisma.post.findUnique({ where: { slug: data.slug } });
      if (existing && existing.id !== id) return { error: "A blog post with this slug already exists." };

      if (data.published) {
        const plainText = data.content.replace(/<[^>]+>/g, ' ');
        const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount < 1000) {
          return { error: `Blog posts must have a minimum of 1000 words to be published for optimal SEO. Current word count: ${wordCount}. Save as draft instead.` };
        }
      }

      await prisma.post.update({
        where: { id },
        data: {
          title: data.title,
          slug: data.slug,
          content: data.content,
          seoTitle: data.seoTitle,
          seoDesc: data.seoDesc,
          published: data.published,
          publishAt: data.publishAt,
        },
      });
    } else {
      const existing = await prisma.page.findUnique({ where: { slug: data.slug } });
      if (existing && existing.id !== id) return { error: "A page with this slug already exists." };

      await prisma.page.update({
        where: { id },
        data: {
          title: data.title,
          slug: data.slug,
          content: data.content,
          seoTitle: data.seoTitle,
          seoDesc: data.seoDesc,
          published: data.published,
          publishAt: data.publishAt,
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating content:", error);
    return { error: "Failed to update content." };
  }
}

export async function deleteContent(id: string, type: ContentType) {
  try {
    const session = await getSession();
    if (!session) return { error: "Not authorized" };

    if (type === "BLOG") {
      await prisma.post.delete({ where: { id } });
    } else {
      await prisma.page.delete({ where: { id } });
    }

    revalidatePath("/dashboard/content");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Error deleting content:", error);
    return { error: "Failed to delete content." };
  }
}

export async function bulkCreateContent(items: {
  title: string;
  slug: string;
  content: string;
  seoTitle?: string;
  seoDesc?: string;
  published: boolean;
  publishAt?: Date | null;
  type: ContentType;
}[]) {
  try {
    const session = await getSession();
    if (!session || !session.email) {
      return { error: "Not authorized" };
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email: session.email },
    });

    if (!admin) {
      return { error: "Admin not found" };
    }

    let successCount = 0;
    const errors = [];

    for (const item of items) {
      try {
        if (item.type === "BLOG") {
          const existing = await prisma.post.findUnique({ where: { slug: item.slug } });
          if (existing) {
            errors.push(`Slug ${item.slug} already exists as a blog post.`);
            continue;
          }

          await prisma.post.create({
            data: {
              title: item.title,
              slug: item.slug,
              content: item.content,
              seoTitle: item.seoTitle,
              seoDesc: item.seoDesc,
              published: item.published,
              publishAt: item.publishAt,
              authorId: admin.id,
            },
          });
          successCount++;
        } else {
          const existing = await prisma.page.findUnique({ where: { slug: item.slug } });
          if (existing) {
            errors.push(`Slug ${item.slug} already exists as a page.`);
            continue;
          }

          await prisma.page.create({
            data: {
              title: item.title,
              slug: item.slug,
              content: item.content,
              seoTitle: item.seoTitle,
              seoDesc: item.seoDesc,
              published: item.published,
              publishAt: item.publishAt,
              authorId: admin.id,
            },
          });
          successCount++;
        }
      } catch (err) {
        errors.push(`Failed to create ${item.slug}.`);
      }
    }

    return { success: true, count: successCount, errors };
  } catch (error) {
    console.error("Error in bulk create:", error);
    return { error: "Failed to process bulk upload." };
  }
}

export async function deleteBulkContent(items: { id: string; type: ContentType }[]) {
  try {
    const session = await getSession();
    if (!session) return { error: "Not authorized" };

    const blogIds = items.filter(i => i.type === "BLOG").map(i => i.id);
    const pageIds = items.filter(i => i.type === "PAGE").map(i => i.id);

    await prisma.$transaction([
      prisma.post.deleteMany({ where: { id: { in: blogIds } } }),
      prisma.page.deleteMany({ where: { id: { in: pageIds } } }),
    ]);

    revalidatePath("/dashboard/content");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Error bulk deleting content:", error);
    return { error: "Failed to delete selected content." };
  }
}

