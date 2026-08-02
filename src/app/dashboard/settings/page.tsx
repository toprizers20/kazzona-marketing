"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, KeyRound, Mail, CheckCircle2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { requestPasswordChange, verifyOTPAndUpdatePassword } from "@/app/actions/settings";

export default function SettingsPage() {
  const [step, setStep] = useState<"password" | "otp" | "success">("password");
  
  // Password Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // OTP Form State
  const [otp, setOtp] = useState("");
  
  // Global State
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handlePasswordRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await requestPasswordChange(currentPassword);
      if (result.error) {
        setError(result.error);
      } else {
        if (result.previewUrl) {
          setPreviewUrl(result.previewUrl);
        }
        setStep("otp");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("OTP must be exactly 6 digits.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await verifyOTPAndUpdatePassword(otp, newPassword);
      if (result.error) {
        setError(result.error);
      } else {
        setStep("success");
        // Reset forms
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setOtp("");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Security Settings</h2>
        <p className="text-muted-foreground">Manage your dashboard access and security credentials.</p>
      </div>

      <div className="bg-card border border-border/40 rounded-2xl p-6 shadow-sm overflow-hidden relative">
        <AnimatePresence mode="wait">
          {step === "password" && (
            <motion.div
              key="password"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Change Password</h3>
                  <p className="text-sm text-muted-foreground">Update your master admin password.</p>
                </div>
              </div>

              <form onSubmit={handlePasswordRequest} className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="current">Current Password</Label>
                  <Input 
                    id="current" 
                    type="password" 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New Password</Label>
                  <Input 
                    id="new" 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm New Password</Label>
                  <Input 
                    id="confirm" 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {error && <p className="text-sm text-destructive font-medium">{error}</p>}

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Verifying..." : "Update Password"}
                </Button>
              </form>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => { setStep("password"); setError(""); }}
                  className="mr-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email Verification</h3>
                  <p className="text-sm text-muted-foreground">We sent a 6-digit code to your admin email.</p>
                </div>
              </div>

              <form onSubmit={handleOTPVerification} className="space-y-4 max-w-md ml-14">
                <div className="space-y-2">
                  <Label htmlFor="otp">One-Time Password (OTP)</Label>
                  <Input 
                    id="otp" 
                    type="text" 
                    placeholder="123456"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="text-center text-2xl tracking-widest font-mono"
                    required
                  />
                </div>

                {error && <p className="text-sm text-destructive font-medium text-center">{error}</p>}

                {previewUrl && (
                  <div className="p-3 bg-secondary/50 rounded-lg border border-border/50 text-xs text-center break-all">
                    <p className="text-muted-foreground mb-1">Local Testing Mode: View Email Here</p>
                    <a href={previewUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                      {previewUrl}
                    </a>
                  </div>
                )}

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Verifying OTP..." : "Confirm Password Change"}
                </Button>
              </form>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Password Updated!</h3>
              <p className="text-muted-foreground max-w-sm">
                Your admin password has been successfully changed. Use your new password the next time you log in.
              </p>
              <Button onClick={() => setStep("password")} variant="outline" className="mt-4">
                Return to Settings
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
