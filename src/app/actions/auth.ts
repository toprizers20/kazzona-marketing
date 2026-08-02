"use server";

import { login } from "@/lib/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

// Brute force protection - in-memory rate limiter
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(email: string): boolean {
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
    // Rate limit check
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

    // Success - clear rate limit
    loginAttempts.delete(email);

    // Password is valid, create session
    await login(email);
    return { success: true };
  } catch (error) {
    console.error("Auth error:", error);
    return { error: "Server error. Please try again." };
  }
}
