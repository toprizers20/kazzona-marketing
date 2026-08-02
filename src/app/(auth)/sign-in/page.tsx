"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/app/actions/auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await authenticate(email, password);
      if (result.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
        router.refresh(); // Force a full refresh to update Layout props
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-card border border-border/40 rounded-2xl p-8 shadow-xl">
      <div className="flex flex-col space-y-2 text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Admin Login</h2>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access the dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="admin@kazzona.com" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-background"
          />
        </div>

        {error && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full font-bold shadow-lg shadow-primary/20"
          disabled={isLoading}
        >
          {isLoading ? "Authenticating..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
