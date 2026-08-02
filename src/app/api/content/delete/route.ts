import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const body = await request.json();
    
    // Check if it is a bulk delete or single delete
    if (body.items && Array.isArray(body.items)) {
      const items = body.items;
      const blogIds = items.filter((i: any) => i.type === "BLOG").map((i: any) => i.id);
      const pageIds = items.filter((i: any) => i.type === "PAGE").map((i: any) => i.id);

      await prisma.$transaction([
        prisma.post.deleteMany({ where: { id: { in: blogIds } } }),
        prisma.page.deleteMany({ where: { id: { in: pageIds } } }),
      ]);
    } else if (body.id && body.type) {
      const { id, type } = body;
      if (type === "BLOG") {
        await prisma.post.delete({ where: { id } });
      } else {
        await prisma.page.delete({ where: { id } });
      }
    } else {
      return NextResponse.json({ error: "Invalid payload parameters" }, { status: 400 });
    }

    // Trigger revalidations
    revalidatePath("/dashboard/content");
    revalidatePath("/blog");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting content via API:", error);
    return NextResponse.json({ error: error.message || "Failed to delete content." }, { status: 500 });
  }
}
