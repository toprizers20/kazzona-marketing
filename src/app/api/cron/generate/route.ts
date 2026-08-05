import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

// Helper: Fetch text content from Pollinations AI
async function fetchAIContent(promptText: string): Promise<string> {
  try {
    const encodedPrompt = encodeURIComponent(promptText);
    const res = await fetch(`https://text.pollinations.ai/prompt/${encodedPrompt}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.text();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("AI Text Fetch Error:", message);
    return `<p>Error generating content from AI: ${message}</p>`;
  }
}

export async function POST(req: Request) {
  // Verify CRON_SECRET for external scheduler auth
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    
    // Fetch pending tasks that are due
    const tasks = await prisma.aiGenerationTask.findMany({
      where: {
        status: "PENDING",
        targetDate: {
          lte: now,
        }
      },
      take: 5, // Process max 5 at a time in web API to avoid timeouts
    });

    if (tasks.length === 0) {
      return NextResponse.json({ message: "No pending tasks to process" });
    }

    const processed = [];

    for (const task of tasks) {
      // Set to processing
      await prisma.aiGenerationTask.update({
        where: { id: task.id },
        data: { status: "PROCESSING" }
      });

      try {
        const topic = task.topic;
        const keyword = task.keyword;

        // 1. Generate SEO Content
        const contentPrompt = `
          You are an expert SEO Content Writer. Write a highly detailed, 1000+ word blog post about "${topic}".
          The primary keywords to include naturally are: ${keyword || topic}.
          ${task.instructions ? `\n          ADDITIONAL REQUIREMENTS/INSTRUCTIONS:\n          ${task.instructions}\n` : ''}
          CRITICAL INSTRUCTIONS:
          - Return ONLY valid HTML code. No markdown, no "Here is your html", just raw HTML elements.
          - Start directly with an introductory <p> tag with class="lead text-xl text-muted-foreground mb-6".
          - Use proper heading hierarchy (<h2>, <h3>). Do NOT use <h1> (the system handles it).
          - Provide deep, meaningful value, statistics, and actionable advice.
          - Write at least 1000 words. Make paragraphs long and detailed.
          - Include <ul> or <ol> lists for readability.
          - Use <strong> tags to highlight important phrases.
        `;

        let rawHtmlContent = await fetchAIContent(contentPrompt);

        // Clean markdown formats if AI returned them
        rawHtmlContent = rawHtmlContent.replace(/```html/g, '').replace(/```/g, '').trim();

        // 2. Generate Meta Tags
        const metaPrompt = `
          Based on the topic "${topic}", give me an SEO meta title (max 60 chars) and meta description (max 160 chars).
          Format EXACTLY like this:
          TITLE: [Your Title here]
          DESC: [Your Description here]
        `;
        const metaText = await fetchAIContent(metaPrompt);
        let seoTitle = `Ultimate Guide to ${topic}`;
        let seoDesc = `Read our deep dive into ${topic}.`;

        try {
          const lines = metaText.split('\n');
          const titleLine = lines.find(l => l.toUpperCase().startsWith('TITLE:'));
          const descLine = lines.find(l => l.toUpperCase().startsWith('DESC:'));
          
          if (titleLine) seoTitle = titleLine.replace(/^TITLE:/i, '').trim();
          if (descLine) seoDesc = descLine.replace(/^DESC:/i, '').trim();
        } catch (e) {
          console.warn("Failed to parse AI meta tags, using fallbacks.");
        }

        // 3. Ensure unique slug (max 50 attempts to prevent infinite loop)
        const baseSlug = slugify(topic);
        let uniqueSlug = baseSlug;
        let counter = 1;
        while (counter <= 50) {
          const existingPost = await prisma.post.findUnique({ where: { slug: uniqueSlug } });
          const existingPage = await prisma.page.findUnique({ where: { slug: uniqueSlug } });
          if (!existingPost && !existingPage) break;
          uniqueSlug = `${baseSlug}-${counter}`;
          counter++;
        }
        if (counter > 50) {
          throw new Error(`Could not generate unique slug for "${topic}" after 50 attempts`);
        }

        // 4. Download Banner Image locally (must succeed before publishing)
        let localImagePath: string;
        try {
          const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(topic + ' professional modern digital marketing illustration banner')}?width=1200&height=630&nologo=true`;
          const imgRes = await fetch(imgUrl);
          if (!imgRes.ok) throw new Error(`Image fetch failed: ${imgRes.status}`);
          const arrBuf = await imgRes.arrayBuffer();
          const buf = Buffer.from(arrBuf);
          
          const fs = await import("fs");
          const path = await import("path");
          const uploadDir = path.resolve(process.cwd(), "public/uploads/banners");
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }
          const filepath = path.join(uploadDir, `${uniqueSlug}.jpg`);
          fs.writeFileSync(filepath, buf);
          localImagePath = `/uploads/banners/${uniqueSlug}.jpg`;
        } catch (imgErr: unknown) {
          const imgMsg = imgErr instanceof Error ? imgErr.message : "Unknown error";
          throw new Error(`Banner image generation failed: ${imgMsg}`);
        }
        const imageHtml = `<img src="${localImagePath}" alt="${topic}" class="w-full h-[400px] object-cover rounded-2xl mb-8 border border-border/40 shadow-sm" />\n`;
        rawHtmlContent = imageHtml + rawHtmlContent;

        // 5. Inject Internal Linking
        try {
          const posts = await prisma.post.findMany({ take: 5 });
          if (posts.length > 0) {
            const randomPost = posts[Math.floor(Math.random() * posts.length)];
            rawHtmlContent += `\n
            <div class="p-6 bg-secondary/20 border-l-4 border-primary rounded-r-xl my-8">
              <h4 class="text-lg font-bold mb-2">Related Reading</h4>
              <p class="text-sm text-muted-foreground m-0">Continue learning: <a href="/blog/${randomPost.slug}" class="text-primary font-bold hover:underline">${randomPost.title}</a></p>
            </div>`;
          }
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : "Unknown error";
          console.warn("Failed to fetch posts for internal linking:", msg);
        }

        // 6. Create content in DB
        if (task.type === "PAGE") {
          await prisma.page.create({
            data: {
              title: topic,
              slug: uniqueSlug,
              content: rawHtmlContent,
              seoTitle,
              seoDesc,
              published: true,
            }
          });
        } else {
          let admin = await prisma.adminUser.findFirst();
          await prisma.post.create({
            data: {
              title: topic,
              slug: uniqueSlug,
              content: rawHtmlContent,
              seoTitle,
              seoDesc,
              published: true,
              authorId: admin?.id || 'automated-worker',
            }
          });
        }

        await prisma.aiGenerationTask.update({
          where: { id: task.id },
          data: { status: "COMPLETED" }
        });
        
        processed.push(task.id);
      } catch (err) {
        console.error("Failed to process task", task.id, err);
        await prisma.aiGenerationTask.update({
          where: { id: task.id },
          data: { status: "FAILED" }
        });
      }
    }

    return NextResponse.json({ success: true, processedCount: processed.length });
  } catch (error) {
    console.error("Cron generation error:", error);
    return NextResponse.json({ error: "Failed to generate tasks" }, { status: 500 });
  }
}
