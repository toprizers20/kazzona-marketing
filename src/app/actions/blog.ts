"use server";

import { prisma } from "@/lib/db";

export async function getMoreBlogs(skip: number, limit: number) {
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
    take: limit,
  });

  return posts.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    primaryKeyword: p.primaryKeyword,
    createdAt: p.createdAt.toISOString(),
    seoDesc: p.seoDesc,
  }));
}
