"use server";

import { prisma } from "@/lib/db";

export async function getMoreBlogs(skip: number, limit: number) {
  // Cap the limit to prevent abuse
  const safeLimit = Math.min(Math.max(limit, 1), 20);

  try {
    const whereCondition = {
      published: true,
      OR: [
        { publishAt: null },
        { publishAt: { lte: new Date() } }
      ]
    };

    const posts = await prisma.post.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      skip,
      take: safeLimit,
      select: {
        id: true,
        slug: true,
        title: true,
        primaryKeyword: true,
        createdAt: true,
      },
    });

    return posts.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      primaryKeyword: p.primaryKeyword,
      createdAt: p.createdAt.toISOString(),
    }));
  } catch {
    return [];
  }
}
