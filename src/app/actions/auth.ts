"use server";

import { login, logout } from "@/lib/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

// Brute force protection - in-memory rate limiter with periodic cleanup
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000; // Clean up every 5 minutes

// Periodic cleanup to prevent memory leaks
let lastCleanup = Date.now();
function cleanupIfNeeded() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  
  for (const [email, record] of loginAttempts.entries()) {
    if (now - record.lastAttempt > LOCKOUT_DURATION) {
      loginAttempts.delete(email);
    }
  }
}

function checkRateLimit(email: string): boolean {
  cleanupIfNeeded();
  const now = Date.now();
  const record = loginAttempts.get(email);

  if (!record) return true;

  // Reset if lockout period has passed
  if (now - record.lastAttempt > LOCKOUT_DURATION) {
    loginAttempts.delete(email);
    return true;
  }

  return record.count < MAX_ATTEMPTS;
}

function recordFailedAttempt(email: string) {
  const now = Date.now();
  const record = loginAttempts.get(email);

  if (!record || now - record.lastAttempt > LOCKOUT_DURATION) {
    loginAttempts.set(email, { count: 1, lastAttempt: now });
  } else {
    record.count++;
    record.lastAttempt = now;
  }
}

export async function authenticate(email: string, password: string) {
  try {
    if (!checkRateLimit(email)) {
      return { error: "Too many failed attempts. Please try again after 15 minutes." };
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!admin) {
      recordFailedAttempt(email);
      return { error: "Invalid email or password." };
    }

    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);

    if (!isPasswordValid) {
      recordFailedAttempt(email);
      return { error: "Invalid email or password." };
    }

    loginAttempts.delete(email);

    await login(email);
    return { success: true };
  } catch (error) {
    console.error("Auth error:", error);
    return { error: "Server error. Please try again." };
  }
}

export async function logoutAction() {
  await logout();
  revalidatePath("/", "layout");
}
