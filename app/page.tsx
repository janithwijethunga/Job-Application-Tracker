import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImageTabs from "@/components/image-tabs";
import {
  ArrowRight,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Kanban,
  BellRing,
  Clock,
  ChevronRight,
  Star,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50 font-sans text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400 to-indigo-300 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>

          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              {/* Announcement Chip */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/80 px-3.5 py-1 text-xs font-medium text-blue-700 shadow-xs mb-8">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span>Jobright 2.0 is live</span>
                <ChevronRight className="h-3 w-3 text-blue-400" />
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl sm:leading-[1.15]">
                Land your dream job{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  without the chaos
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                Say goodbye to messy spreadsheets. Capture job postings, track interview stages, and manage notes and salaries in one fast visual board.
              </p>

              {/* CTA Group */}
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="h-12 rounded-xl bg-blue-600 px-8 text-base font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    Start Free Forever
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-xl border-slate-200 bg-white px-7 text-base font-medium text-slate-700 shadow-xs hover:bg-slate-50"
                  >
                    See How It Works
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="mt-10 flex flex-col items-center justify-center gap-3 text-xs text-slate-500 sm:flex-row">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces"
                    alt="User"
                  />
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces"
                    alt="User"
                  />
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=64&h=64&fit=crop&crop=faces"
                    alt="User"
                  />
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span>Trusted by 14,000+ candidates landing offers at top companies</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Interactive Tabs / Screenshot Preview */}
        <section className="container mx-auto px-4 pb-20">
          <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200/80 bg-white p-3 shadow-2xl shadow-slate-200/50 sm:p-5">
            <ImageTabs />
          </div>
        </section>

        {/* Metrics Banner */}
        <section className="border-y border-slate-200 bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
              <div>
                <p className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  120k+
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Applications Tracked
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold tracking-tight text-blue-600 sm:text-4xl">
                  3.5x
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Faster Follow-up Rate
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  24 hrs
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Time Saved Per Search
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold tracking-tight text-emerald-600 sm:text-4xl">
                  100%
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Free Forever Tier
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works / 3 Steps */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
                Workflow
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                From application to job offer in 3 steps
              </h2>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700">
                  01
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  Log in Seconds
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Drop job postings with salary, company notes, tags, and role links before you forget where you applied.
                </p>
              </div>

              <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-700">
                  02
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  Manage Stages
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Drag and drop cards across custom pipeline stages: Applied, Screening, Technical, Onsite, and Offer.
                </p>
              </div>

              <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-700">
                  03
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  Ace the Offer
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Compare incoming offers side-by-side with compensations, equity, and remote policies organized clearly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section id="features" className="py-24 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
                Features
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Engineered for serious job seekers
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                Everything you need to stay sane during an intense interviewing season.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all hover:border-slate-300 hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-600/10">
                  <Kanban className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  Fluid Kanban Experience
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Fast drag-and-drop powered by accessible modern UI primitives. Seamless on desktop, tablet, and mobile.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all hover:border-slate-300 hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 ring-1 ring-purple-600/10">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  Instant Search & Tags
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Filter by location, compensation bracket, remote status, or tech stack tag in real-time.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all hover:border-slate-300 hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-600/10">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  Interview Timelines & Notes
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Store recruiter talking points, salary expectations, and feedback rounds per card.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all hover:border-slate-300 hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/10">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  Pipeline Conversion Stats
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  See where your funnel drops off so you know whether to optimize your resume or your technical prep.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all hover:border-slate-300 hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-600/10">
                  <BellRing className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  Follow-up Reminders
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Never leave a recruiter hanging. Get notified when an application has been quiet for over 7 days.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all hover:border-slate-300 hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-600/10">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  100% Private & Encrypted
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Your job search is confidential. Your data and salaries are private to you and never shared.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-b from-white to-slate-100 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-3xl bg-blue-600 px-8 py-16 text-center text-white shadow-xl shadow-blue-500/10 sm:px-16">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Ready to organize your career search?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-blue-100">
                Join thousands of candidates who ditched unmanageable spreadsheets for Jobright today.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="h-12 rounded-xl bg-white px-8 text-base font-semibold text-blue-700 shadow-sm transition-all hover:bg-blue-50"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-xs text-blue-200">
                No credit card required • Instant setup
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 text-slate-500">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Briefcase className="h-4 w-4 text-blue-600" />
            Jobright
          </div>
          <p className="text-xs text-slate-400">
            © 2026 Jobright Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <Link href="#" className="hover:text-slate-900">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-900">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-slate-900">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}