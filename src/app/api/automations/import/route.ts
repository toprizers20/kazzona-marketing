import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { csvData } = await req.json();
    
    if (!csvData) {
      return NextResponse.json({ error: "No CSV data provided" }, { status: 400 });
    }

    const lines = csvData.split("\n");
    const headers = lines[0].toLowerCase().split(",").map((h: string) => h.trim());
    
    const topicIdx = headers.findIndex((h: string) => h.includes("topic"));
    const keywordIdx = headers.findIndex((h: string) => h.includes("keyword"));
    const typeIdx = headers.findIndex((h: string) => h.includes("type"));
    const timingIdx = headers.findIndex((h: string) => h.includes("timing") || h.includes("date"));
    const instructionsIdx = headers.findIndex((h: string) => h.includes("instruction") || h.includes("prompt") || h.includes("guide"));

    if (topicIdx === -1) {
      return NextResponse.json({ error: "CSV must contain a 'Topic' column" }, { status: 400 });
    }

    const tasksToCreate: { topic: string; keyword: string | null; instructions: string | null; type: string; targetDate: Date; status: string }[] = [];
    let lastValidDate = new Date();
    
    // Fetch existing tasks to check for collisions
    const existingTasks = await prisma.aiGenerationTask.findMany({
      select: { targetDate: true }
    });
    const existingDates = existingTasks.map(t => new Date(t.targetDate).getTime());

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const cols = line.split(",").map((c: string) => c.trim().replace(/^"|"$/g, ""));
      
      const topic = cols[topicIdx];
      const keyword = keywordIdx !== -1 ? cols[keywordIdx] : null;
      const instructions = instructionsIdx !== -1 && cols[instructionsIdx] ? cols[instructionsIdx] : null;
      const type = typeIdx !== -1 && cols[typeIdx] ? cols[typeIdx].toUpperCase() : "BLOG";
      
      let targetDate = null;
      if (timingIdx !== -1 && cols[timingIdx]) {
        let dateStr = cols[timingIdx];
        
        // Handle "17:00:00 : 25:12:2026" or "17:00:00:25:12:2026" or "DD:MM:YYYY HH:mm:ss"
        if (dateStr.includes(":") && dateStr.length >= 16) {
          const parts = dateStr.split(/[:\s]+/).filter(Boolean);
          // if parts are HH, mm, ss, DD, MM, YYYY
          if (parts.length >= 6) {
            let hh = parseInt(parts[0]);
            let min = parseInt(parts[1]);
            let ss = parseInt(parts[2]);
            let dd = parseInt(parts[3]);
            let mm = parseInt(parts[4]) - 1; // 0-indexed month
            let yyyy = parseInt(parts[5]);
            targetDate = new Date(yyyy, mm, dd, hh, min, ss);
          }
        }
        
        if (!targetDate || isNaN(targetDate.getTime())) {
          targetDate = new Date(dateStr);
        }
      }
      
      if (!targetDate || isNaN(targetDate.getTime())) {
        targetDate = new Date(lastValidDate.getTime() + 60 * 60 * 1000); // add 1 hour
      }

      const targetTime = targetDate.getTime();
      
      // Collision detection
      if (existingDates.includes(targetTime) || tasksToCreate.some(t => t.targetDate.getTime() === targetTime)) {
        return NextResponse.json({ error: `Collision detected: Multiple blogs scheduled at exact same time ${targetDate.toLocaleString()}` }, { status: 400 });
      }
      
      lastValidDate = targetDate;

      if (topic) {
        tasksToCreate.push({
          topic,
          keyword: keyword || null,
          instructions: instructions || null,
          type: type === "PAGE" ? "PAGE" : "BLOG",
          targetDate,
          status: "PENDING",
        });
      }
    }

    if (tasksToCreate.length === 0) {
      return NextResponse.json({ error: "No valid tasks found in CSV" }, { status: 400 });
    }

    await prisma.aiGenerationTask.createMany({
      data: tasksToCreate,
    });

    return NextResponse.json({ success: true, count: tasksToCreate.length });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json({ error: "Failed to import tasks" }, { status: 500 });
  }
}
