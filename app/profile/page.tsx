"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, updateUser } from "@/lib/auth/auth-client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Camera,
  FileText,
  Download,
  Trash2,
  UploadCloud,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
  Loader2,
  Compass,
} from "lucide-react";
import {
  uploadAvatarAction,
  uploadCVAction,
  deleteCVAction,
  getCVAction,
} from "./actions";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [cvFile, setCvFile] = useState<{
    name: string;
    size: string;
    uploadedAt: string;
    url: string;
  } | null>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [isLoadingCv, setIsLoadingCv] = useState(true);
  const [isUploadingCv, setIsUploadingCv] = useState(false);
  const [isDeletingCv, setIsDeletingCv] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      if (session.user.image) {
        setAvatarUrl(session.user.image);
      }
    }
  }, [session]);

  useEffect(() => {
    async function loadCV() {
      setIsLoadingCv(true);
      const cv = await getCVAction();
      if (cv) {
        setCvFile(cv);
      }
      setIsLoadingCv(false);
    }
    if (session?.user) {
      loadCV();
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50/70 dark:bg-neutral-950">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  // Upload Avatar to Cloudinary
  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Please choose an image under 5MB.");
      return;
    }

    setIsUploadingAvatar(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadAvatarAction(formData);

    if (res.success && res.url) {
      setAvatarUrl(res.url);
      await updateUser({ image: res.url });
    } else {
      alert(res.error || "Failed to upload avatar");
    }

    setIsUploadingAvatar(false);
    if (avatarInputRef.current) avatarInputRef.current.value = "";
  }

  // Update Name
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    setIsSaving(true);
    setSaveSuccess(false);

    const { error } = await updateUser({ name: trimmedName });

    setIsSaving(false);
    if (error) {
      console.error(error);
      return;
    }

    setName(trimmedName);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  }

  // Upload CV to Cloudinary
  async function handleCvUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Please upload a file smaller than 10MB.");
      return;
    }

    setIsUploadingCv(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadCVAction(formData);

    if (res.success && res.cv) {
      setCvFile(res.cv);
    } else {
      alert(res.error || "Failed to upload CV");
    }

    setIsUploadingCv(false);
    if (cvInputRef.current) cvInputRef.current.value = "";
  }

  // Delete CV
  async function handleDeleteCv() {
    if (!confirm("Are you sure you want to delete your stored CV?")) return;

    setIsDeletingCv(true);
    const res = await deleteCVAction();

    if (res.success) {
      setCvFile(null);
    } else {
      alert(res.error || "Failed to delete CV");
    }

    setIsDeletingCv(false);
  }

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const jobPortals = [
    {
      name: "LinkedIn Jobs",
      description: "Direct outreach, recruiter inboxes, and professional networking",
      url: "https://www.linkedin.com/jobs",
      badge: "Networking",
    },
    {
      name: "Wellfound (AngelList)",
      description: "Fast-growing venture-backed startups and remote tech jobs",
      url: "https://wellfound.com/jobs",
      badge: "Startups",
    },
    {
      name: "Indeed",
      description: "Comprehensive global search across all company tiers",
      url: "https://www.indeed.com",
      badge: "Global",
    },
    {
      name: "RemoteOK",
      description: "Curated worldwide remote positions and engineering roles",
      url: "https://remoteok.com",
      badge: "Remote",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20 font-sans text-slate-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
      {/* Framed Cover Section */}
      <div className="pt-6 sm:pt-8">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-neutral-950 shadow-xl dark:border-neutral-800">
            <div className="relative h-56 w-full sm:h-64 md:h-72">
              <Image
                src="/hero-images/profilecover.png"
                alt="Profile Cover"
                fill
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/20 to-black/30" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-neutral-900/60 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:bg-neutral-900"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Dashboard
                </Link>
              </div>
            </div>

            <div className="px-6 pb-6 pt-0 sm:px-8">
              <div className="relative -mt-16 flex flex-col items-center gap-4 sm:-mt-20 sm:flex-row sm:items-end">
                <div className="relative group shrink-0">
                  <Avatar className="h-28 w-28 rounded-2xl border-4 border-white bg-neutral-900 shadow-2xl ring-2 ring-primary/30 dark:border-neutral-900 sm:h-36 sm:w-36">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <AvatarFallback className="bg-linear-to-tr from-primary to-blue-600 text-3xl font-extrabold text-white">
                        {initials}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={isUploadingAvatar}
                    className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-xl border-2 border-white bg-primary text-white shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-75 dark:border-neutral-900"
                    title="Change Profile Picture"
                  >
                    {isUploadingAvatar ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Camera className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>

                <div className="text-center sm:text-left sm:pl-3">
                  <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                    {name || "Your Name"}
                  </h1>
                  <p className="text-xs text-neutral-400 sm:text-sm">
                    {email || "your.email@example.com"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Account Info + CV */}
      <div className="container mx-auto mt-8 max-w-5xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Account Credentials */}
          <Card className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Account Information
              </h2>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                Update your primary profile credentials
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="name" className="text-xs font-semibold">
                    Full Name
                  </Label>
                  {saveSuccess && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Updated
                    </span>
                  )}
                </div>

                <div className="relative flex items-center">
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="h-10 rounded-xl pr-20 text-xs transition-colors focus-visible:ring-2 focus-visible:ring-primary/40"
                  />
                  <Button
                    type="submit"
                    disabled={isSaving}
                    size="sm"
                    className="absolute right-1.5 h-7 rounded-lg bg-primary px-3 text-[11px] font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 disabled:opacity-70"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                        Saving
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email" className="text-xs font-semibold">
                    Email Address
                  </Label>
                  <span className="text-[10px] text-muted-foreground">
                    Cannot be changed
                  </span>
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  placeholder="name@example.com"
                  className="h-10 cursor-not-allowed rounded-xl bg-slate-100/70 text-xs text-muted-foreground dark:bg-neutral-800/60"
                />
              </div>
            </form>
          </Card>

          {/* Cloudinary-Powered CV Storage */}
          <Card className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Curriculum Vitae (CV)
                </h2>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Upload, store, and download your latest resume
                </p>
              </div>
              <FileText className="h-4 w-4 text-primary" />
            </div>

            {isLoadingCv ? (
              <div className="flex h-36 items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            ) : isUploadingCv ? (
              <div className="flex h-36 flex-col items-center justify-center rounded-xl border border-dashed border-primary/50 bg-primary/5">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <p className="mt-2 text-xs font-medium text-primary">
                  Uploading to Cloudinary...
                </p>
              </div>
            ) : cvFile ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-800/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-slate-900 dark:text-white">
                      {cvFile.name}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{cvFile.size}</span>
                      <span>•</span>
                      <span>{cvFile.uploadedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    
                    className="h-9 flex-1 gap-1.5 rounded-xl bg-primary text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90"
                  >
                    <a
                      href={cvFile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={cvFile.name}
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download Stored CV
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={isDeletingCv}
                    onClick={handleDeleteCv}
                    className="h-9 w-9 rounded-xl border-slate-200 text-destructive hover:bg-red-50 dark:border-neutral-800 dark:hover:bg-red-950/40"
                    title="Delete CV"
                  >
                    {isDeletingCv ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>

                <button
                  type="button"
                  onClick={() => cvInputRef.current?.click()}
                  className="w-full text-center text-[11px] font-medium text-slate-500 hover:text-primary transition-colors"
                >
                  Upload a new version
                </button>
              </div>
            ) : (
              <div
                onClick={() => cvInputRef.current?.click()}
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 p-8 text-center transition-colors hover:border-primary hover:bg-primary/5 dark:border-neutral-800 dark:hover:border-primary/50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-neutral-800">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-800 dark:text-neutral-200">
                  Click to upload your CV
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  PDF or DOCX up to 10MB
                </p>
              </div>
            )}

            <input
              ref={cvInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleCvUpload}
              className="hidden"
            />
          </Card>
        </div>

        {/* Job Finding Portals */}
        <div className="mt-8">
          <div className="mb-4 flex items-center gap-2">
            <Compass className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Explore Job Search Platforms
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {jobPortals.map((portal) => (
              <a
                key={portal.name}
                href={portal.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                      {portal.badge}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-primary" />
                  </div>
                  <h3 className="mt-3 text-xs font-bold text-slate-900 dark:text-white">
                    {portal.name}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-neutral-400">
                    {portal.description}
                  </p>
                </div>

                <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                  Open platform &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}