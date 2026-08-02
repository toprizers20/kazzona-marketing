import { prisma } from "@/lib/db";
import AutomationClient from "./AutomationClient";
import ScheduledTasksClient from "./ScheduledTasksClient";

export const dynamic = "force-dynamic";

export default async function AutomationsPage() {
  const tasks = await prisma.aiGenerationTask.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  // Serialize dates for client component
  const serializedTasks = tasks.map((t) => ({
    id: t.id,
    topic: t.topic,
    type: t.type,
    keyword: t.keyword,
    instructions: t.instructions,
    targetDate: t.targetDate.toISOString(),
    status: t.status,
  }));

  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <h2 className="text-3xl font-bold font-heading mb-2">SEO Automations</h2>
        <p className="text-muted-foreground">Bulk schedule AI content generation using CSV / Excel data.</p>
      </div>

      <AutomationClient />

      <ScheduledTasksClient tasks={serializedTasks} />
    </div>
  );
}
