"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth/auth-client";

export default function SignIn() {

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
  
    const router = useRouter();
  
    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
  
      setError("");
      setLoading(true);
  
      try {
        console.log("Sign Up:", { email, password });
        const result = await signIn.email({
          email,
          password,
        });
  
        if (result.error) {
          setError(result.error.message ?? "Sign In Failed!");
        } else {
          router.push("/dashboard");
        }
      } catch (err) {
        setError("Failed to sign in. Please try again.");
      } finally {
        setLoading(false);
      }
    }




  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50/60 px-4 py-12 sm:px-6 lg:px-8">
      {/* Optional decorative background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 transform blur-3xl sm:-top-80">
          <div className="from-primary/10 via-primary/5 to-transparent opacity-70" />
        </div>
      </div>

      <Card className="w-full max-w-md border-border/80 bg-white/95 shadow-xl shadow-slate-200/50 backdrop-blur-sm transition-all duration-200 hover:shadow-2xl hover:shadow-slate-200/60 dark:bg-card">
        <CardHeader className="space-y-2 text-center sm:text-left">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Sign In
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed">
            Enter Your Credentials to access to your account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pb-4">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 transition-colors focus-visible:ring-2 focus-visible:ring-primary/50"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Your Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 transition-colors focus-visible:ring-2 focus-visible:ring-primary/50"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 font-semibold shadow-sm transition-all duration-150 active:scale-[0.99]"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don't Have an Account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-primary underline-offset-4 hover:underline hover:text-primary/90 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
