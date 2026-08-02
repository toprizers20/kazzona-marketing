"use server";

import { prisma } from "@/lib/db";

export async function subscribeNewsletter(email: string) {
  if (!email || !email.trim()) {
    return { error: "Email is required" };
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Check if already subscribed
  const existing = await prisma.lead.findFirst({
    where: {
      email: normalizedEmail,
      source: "newsletter",
    },
  });

  if (existing) {
    return { success: true, message: "You are already subscribed!" };
  }

  try {
    await prisma.lead.create({
      data: {
        name: "Newsletter Subscriber",
        email: normalizedEmail,
        service: "Newsletter",
        message: "Subscribed via newsletter signup form on website.",
        source: "newsletter",
        status: "NEW",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { error: "Failed to subscribe. Please try again." };
  }
}
