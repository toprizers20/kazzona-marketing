"use server";

import { prisma } from "@/lib/db";

export async function searchGlobal(q: string) {
  if (!q.trim()) return { blogs: [], pages: [] };
  
  const searchString = q.trim();

  const blogResults = await prisma.post.findMany({
    where: {
      published: true,
      OR: [
        { title: { contains: searchString } },
        { content: { contains: searchString } },
        { seoDesc: { contains: searchString } },
        { primaryKeyword: { contains: searchString } }
      ],
      AND: [
        { OR: [{ publishAt: null }, { publishAt: { lte: new Date() } }] }
      ]
    },
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  const pageResults = await prisma.page.findMany({
    where: {
      published: true,
      OR: [
        { title: { contains: searchString } },
        { content: { contains: searchString } },
        { seoDesc: { contains: searchString } }
      ]
    },
    take: 5
  });

  return {
    blogs: blogResults.map(b => ({
      id: b.id,
      title: b.title,
      slug: b.slug,
      seoDesc: b.seoDesc,
    })),
    pages: pageResults.map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      seoDesc: p.seoDesc,
    }))
  };
}
