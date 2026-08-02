import { prisma } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ContentListClient from "./ContentListClient";

export const dynamic = "force-dynamic";

export default async function ContentDashboardPage() {
  const [posts, pages] = await Promise.all([
    prisma.post.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.page.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const allContent = [
    ...posts.map(p => ({ 
      id: p.id,
      title: p.title,
      slug: p.slug,
      type: 'BLOG' as const,
      published: p.published,
      publishAt: p.publishAt ? p.publishAt.toISOString() : null,
      createdAt: p.createdAt.toISOString()
    })),
    ...pages.map(p => ({ 
      id: p.id,
      title: p.title,
      slug: p.slug,
      type: 'PAGE' as const,
      published: p.published,
      publishAt: p.publishAt ? p.publishAt.toISOString() : null,
      createdAt: p.createdAt.toISOString()
    }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight">Content CMS</h2>
          <p className="text-muted-foreground">Manage your blog posts and landing pages.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/content/upload">
            <Button variant="outline" className="gap-2 border-primary/20 hover:bg-primary/10">
              Bulk Upload
            </Button>
          </Link>
          <Link href="/dashboard/content/create">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Content
            </Button>
          </Link>
        </div>
      </div>

      <ContentListClient initialItems={allContent} />
    </div>
  );
}

