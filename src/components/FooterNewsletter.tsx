"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions/newsletter";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    await subscribeNewsletter(email);
    setLoading(false);
    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 mt-2 text-sm text-emerald-500">
        <CheckCircle2 className="w-4 h-4" />
        <span>Subscribed!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="bg-background max-w-[240px] rounded-xl border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <button
        type="submit"
        disabled={loading}
        className="shrink-0 rounded-xl bg-gradient-to-r from-primary to-accent text-white h-9 w-9 flex items-center justify-center disabled:opacity-50"
      >
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
