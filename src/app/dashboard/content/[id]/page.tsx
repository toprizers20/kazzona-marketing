import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { EditContentClient } from "./EditContentClient";
import { ContentType } from "@/app/actions/content";

export default async function EditContentPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const type = (resolvedSearchParams.type === 'PAGE' ? 'PAGE' : 'BLOG') as ContentType;

  let content = null;

  if (type === 'BLOG') {
    content = await prisma.post.findUnique({
      where: { id },
    });
  } else {
    content = await prisma.page.findUnique({
      where: { id },
    });
  }

  if (!content) {
    notFound();
  }

  return (
    <EditContentClient 
      initialData={{
        id: content.id,
        title: content.title,
        slug: content.slug,
        content: content.content,
        seoTitle: content.seoTitle || "",
        seoDesc: content.seoDesc || "",
        published: content.published,
      }}
      type={type}
    />
  );
}
