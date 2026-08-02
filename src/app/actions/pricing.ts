"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { DEFAULT_PRICING_CONFIG } from "@/lib/pricing-defaults";

export async function getPricingConfig() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "global" },
      select: { pricingConfig: true }
    });

    if (settings?.pricingConfig) {
      return JSON.parse(settings.pricingConfig);
    }
    return DEFAULT_PRICING_CONFIG;
  } catch (error) {
    console.error("Error fetching pricing config:", error);
    return DEFAULT_PRICING_CONFIG;
  }
}

export async function savePricingConfig(config: object) {
  try {
    const session = await getSession();
    if (!session) {
      return { error: "Unauthorized" };
    }

    const configString = JSON.stringify(config);

    await prisma.siteSettings.upsert({
      where: { id: "global" },
      update: { pricingConfig: configString },
      create: { id: "global", pricingConfig: configString }
    });

    revalidatePath("/pricing");
    revalidatePath("/dashboard/pricing");
    return { success: true };
  } catch (error) {
    console.error("Error saving pricing config:", error);
    return { error: "Failed to save pricing configuration." };
  }
}
