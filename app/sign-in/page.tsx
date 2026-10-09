"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth/auth-client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  Star,
  Quote,
  CheckCircle2,
} from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message ?? "Sign In Failed!");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2 bg-slate-50/50 dark:bg-neutral-950 font-sans antialiased">
      {/* Left Column: Visual Showcase & Brand Ambient Panel (Hidden on Mobile) */}
      {/* Left Column: Visual Showcase & Brand Ambient Panel (Hidden on Mobile) */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-neutral-950 p-12 text-white lg:flex xl:p-16">
        {/* Background Image Container (Layer 0: sits above bg-neutral-950, behind text) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-images/bg.png"
            alt="Workspace Collaboration"
            fill
            className="object-cover object-center"
            priority
          />

          {/* Subtle Dark Gradient Wash (keeps image visible while ensuring white text is readable) */}
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40" />

        </div>

        {/* Ambient Top Glows (Layer 0) */}
        <div className="pointer-events-none absolute -top-32 -left-32 z-0 h-96 w-96 rounded-full bg-primary/25 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-80 w-80 rounded-full bg-primary/15 blur-[120px]" />

        {/* Top Brand Link (Layer 10: sits safely on top) */}
        <div className="relative z-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden border border-white/10 bg-white/5 shadow-inner backdrop-blur-md transition-transform group-hover:scale-105">
              <Image
                src="/hero-images/logo.png"
                alt="Jobright Logo"
                fill
                className="object-contain p-1.5"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Jobright
            </span>
          </Link>
        </div>

        {/* Center Copy + Feature Highlights (Layer 10) */}
        <div className="relative z-10 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span>Empowering 14,000+ Job Seekers</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl xl:text-5xl leading-tight text-white">
            Stop losing track of your applications.
          </h2>

          <p className="text-sm leading-relaxed text-neutral-200 sm:text-base">
            Organize every stage of your career pipeline, track recruiter
            feedback, and stay organized through offer negotiation.
          </p>

          <div className="flex flex-col gap-2.5 pt-2 text-xs text-neutral-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Real-time kanban workflow with stage automations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Interview notes, salaries, and reminders in one place</span>
            </div>
          </div>
        </div>

        {/* Bottom Testimonial (Layer 10) */}
        <div className="relative z-10 rounded-2xl border border-white/10 bg-black/40 p-6 shadow-xl backdrop-blur-md">
          <Quote className="h-5 w-5 text-primary mb-3 opacity-90" />
          <p className="text-xs leading-relaxed text-neutral-200">
            “Jobright completely transformed my job search. I went from messy
            spreadsheets to tracking 42 applications cleanly and securing 3
            offers within a month.”
          </p>
          <div className="mt-4 flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces"
              alt="Elena Rostova"
              className="h-9 w-9 rounded-full ring-2 ring-primary/40 object-cover"
            />
            <div>
              <p className="text-xs font-semibold text-white">Elena Rostova</p>
              <p className="text-[11px] text-neutral-400">
                Software Engineer @ Stripe
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Authentication Form */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          {/* Mobile Header Brand */}
          <div className="mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                <Image
                  src="/hero-images/logo.png"
                  alt="Jobright Logo"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Jobright
              </span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="space-y-2 mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Welcome back
            </h1>
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              Enter your credentials to manage your job boards and interviews.
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2.5 rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-xs text-destructive dark:text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-xs font-semibold text-slate-700 dark:text-neutral-300"
              >
                Work or Personal Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl border-slate-200 bg-white text-xs transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
              />
            </div>

            {/* Password Field with Show/Hide Toggle */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-xs font-semibold text-slate-700 dark:text-neutral-300"
                >
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-medium text-primary hover:underline hover:opacity-90 transition-opacity"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-xl border-slate-200 bg-white pr-10 text-xs transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="mt-2 h-11 w-full rounded-xl bg-primary text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/25 transition-all hover:bg-primary/90 active:scale-[0.99] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-8 text-center text-xs text-slate-500 dark:text-neutral-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-primary hover:underline hover:opacity-90 transition-opacity"
            >
              Start for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
