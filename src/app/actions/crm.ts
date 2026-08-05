"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

// Simple in-memory rate limiter with periodic cleanup
const submissionCache = new Map<string, number[]>();
const CLEANUP_INTERVAL = 5 * 60 * 1000;

let lastCleanup = Date.now();
function cleanupIfNeeded() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  
  const fiveMinutes = 5 * 60 * 1000;
  for (const [email, timestamps] of submissionCache.entries()) {
    const recent = timestamps.filter((t) => now - t < fiveMinutes);
    if (recent.length === 0) {
      submissionCache.delete(email);
    } else {
      submissionCache.set(email, recent);
    }
  }
}

function isRateLimited(email: string): boolean {
  cleanupIfNeeded();
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;
  const timestamps = submissionCache.get(email) || [];
  const recent = timestamps.filter((t) => now - t < fiveMinutes);

  if (recent.length >= 3) return true;

  recent.push(now);
  submissionCache.set(email, recent);
  return false;
}

export async function submitLead(data: {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
  source?: string;
}) {
  try {
    if (isRateLimited(data.email)) {
      return { error: "Too many submissions. Please wait a few minutes before trying again." };
    }

    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      return { error: "Please fill in all required fields." };
    }

    const lead = await prisma.lead.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        company: data.company?.trim(),
        service: data.service,
        message: data.message.trim(),
        source: data.source || "contact-form",
      },
    });

    return { success: true, leadId: lead.id };
  } catch (error) {
    console.error("Error submitting lead:", error);
    return { error: "Failed to submit inquiry. Please try again." };
  }
}

export async function updateLeadStatus(leadId: string, status: string) {
  try {
    const session = await getSession();
    if (!session || !session.email) {
      return { error: "Not authorized" };
    }

    const validStatuses = ["NEW", "IN_PROGRESS", "CONVERTED", "CLOSED"];
    if (!validStatuses.includes(status)) {
      return { error: "Invalid status" };
    }

    await prisma.lead.update({
      where: { id: leadId },
      data: { status },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating lead status:", error);
    return { error: "Failed to update status." };
  }
}
