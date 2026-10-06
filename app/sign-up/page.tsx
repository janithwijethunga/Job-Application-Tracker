"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { signUp } from "@/lib/auth/auth-client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [name, setName] = useState("");
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
      console.log("Sign Up:", { name, email, password });
      const result = await signUp.email({
        name,
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message ?? "Sign Up Failed!");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50/60 px-4 py-12 sm:px-6 lg:px-8">
      

      <Card className="w-full max-w-md border-border/80 bg-white/95 shadow-xl shadow-slate-200/50 backdrop-blur-sm transition-all duration-200 hover:shadow-2xl hover:shadow-slate-200/60 dark:bg-card">
        <CardHeader className="space-y-2 text-center sm:text-left">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Sign Up
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed">
            Create an account to start tracking your job applications
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pb-4">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-800">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 transition-colors focus-visible:ring-2 focus-visible:ring-primary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-800">
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
              <Label htmlFor="password" className="text-gray-800">
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
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already Have an Account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary underline-offset-4 hover:underline hover:text-primary/90 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
