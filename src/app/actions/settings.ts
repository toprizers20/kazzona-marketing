"use server";

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth";
import { sendOTP } from "@/lib/mailer";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
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

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isPasswordValid) {
      return { error: "Incorrect current password" };
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await prisma.adminUser.update({
      where: { email: session.email },
      data: {
        otpSecret: otp,
        otpExpiresAt,
      },
    });

    // Send email
    const previewUrl = await sendOTP(session.email, otp);

    return { 
      success: true, 
      previewUrl // Returning this purely for local debugging UI if needed, though usually just logged
    };
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

    if (admin.otpSecret !== otp) {
      return { error: "Invalid OTP code" };
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Update password and clear OTP
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
