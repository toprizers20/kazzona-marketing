"use server";

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { getSession } from "@/lib/auth";
import { sendOTP } from "@/lib/mailer";

function generateOTP(): string {
  return crypto.randomInt(100000, 999999).toString();
}

export async function requestPasswordChange(currentPassword: string) {
  try {
    const session = await getSession();
    if (!session || !session.email) {
      return { error: "Not authenticated" };
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email: session.email },
    });

    if (!admin) {
      return { error: "Admin user not found" };
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isPasswordValid) {
      return { error: "Incorrect current password" };
    }

    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const otpHash = await bcrypt.hash(otp, 10);

    await prisma.adminUser.update({
      where: { email: session.email },
      data: {
        otpSecret: otpHash,
        otpExpiresAt,
      },
    });

    const previewUrl = await sendOTP(session.email, otp);

    return { success: true, previewUrl };
  } catch (error) {
    console.error("Error requesting password change:", error);
    return { error: "An unexpected error occurred." };
  }
}

export async function verifyOTPAndUpdatePassword(otp: string, newPassword: string) {
  try {
    const session = await getSession();
    if (!session || !session.email) {
      return { error: "Not authenticated" };
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email: session.email },
    });

    if (!admin) {
      return { error: "Admin user not found" };
    }

    if (!admin.otpSecret || !admin.otpExpiresAt) {
      return { error: "No OTP request found" };
    }

    if (new Date() > admin.otpExpiresAt) {
      return { error: "OTP has expired. Please request a new one." };
    }

    const isOtpValid = await bcrypt.compare(otp, admin.otpSecret);
    if (!isOtpValid) {
      return { error: "Invalid OTP code" };
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await prisma.adminUser.update({
      where: { email: session.email },
      data: {
        passwordHash: newPasswordHash,
        otpSecret: null,
        otpExpiresAt: null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { error: "An unexpected error occurred." };
  }
}
