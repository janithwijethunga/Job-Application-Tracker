import KanbanBoard from "@/components/kanban-board";
import { KanbanSkeleton } from "@/components/kanban-skeleton";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {
  Briefcase,
  TrendingUp,
  Calendar,
  Sparkles,
  Search,
} from "lucide-react";

async function getBoard(userId: string) {
  "use cache";

  await connectDB();

  const boardDoc = await Board.findOne({
    userId,
    name: "Job Hunt",
  }).populate({
    path: "columns",
    populate: {
      path: "jobApplications",
    },
  });

  if (!boardDoc) return null;

  return JSON.parse(JSON.stringify(boardDoc));
}

async function DashboardPage() {
  const session = await getSession();

  // Validate session before querying
  if (!session?.user) {
    redirect("/sign-in");
  }

  const board = await getBoard(session.user.id);

  // Compute live stats from board
  const allColumns = board?.columns || [];
  const totalApplications = allColumns.reduce(
    (acc: number, col: any) => acc + (col.jobApplications?.length || 0),
    0
  );

  const activeInterviews =
    allColumns
      .filter((col: any) =>
        /interview|screening|tech/i.test(col.name)
      )
      .reduce((acc: number, col: any) => acc + (col.jobApplications?.length || 0), 0);

  const offersReceived =
    allColumns
      .filter((col: any) => /offer/i.test(col.name))
      .reduce((acc: number, col: any) => acc + (col.jobApplications?.length || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16 dark:bg-neutral-950 font-sans antialiased selection:bg-primary selection:text-primary-foreground">
      <div className="container mx-auto pt-8">
        {/* Top Header Section */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Active Pipeline
              </span>
              <span className="text-xs text-slate-400 dark:text-neutral-500">
                {new Date().toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Welcome back, {session.user.name?.split(" ")[0] || "there"}
            </h1>
            <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
              Track, organize, and accelerate your job applications and interview rounds.
            </p>
          </div>
        </div>

        {/* Quick Insights Cards Bar */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-shadow hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400">
              <span className="text-xs font-medium">Total Applied</span>
              <Briefcase className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {totalApplications}
              </span>
              <span className="text-[11px] text-slate-400">applications</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-shadow hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400">
              <span className="text-xs font-medium">In Interview Stages</span>
              <Calendar className="h-4 w-4 text-amber-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {activeInterviews}
              </span>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                in progress
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-shadow hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400">
              <span className="text-xs font-medium">Offers Landed</span>
              <Sparkles className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {offersReceived}
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                received
              </span>
            </div>
          </div>

          <div className="hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-shadow hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:block">
            <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400">
              <span className="text-xs font-medium">Pipeline Conversion</span>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {totalApplications > 0
                  ? `${Math.round((offersReceived / totalApplications) * 100)}%`
                  : "0%"}
              </span>
              <span className="text-[11px] text-slate-400">offer rate</span>
            </div>
          </div>
        </div>

        {/* Board Surface */}
        <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-900/40 sm:p-6">
          {board ? (
            <KanbanBoard board={board} userId={session.user.id} />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-neutral-800">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
                No Board Found
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm">
                We couldn&apos;t load your &quot;Job Hunt&quot; board. Please try refreshing or creating a new board.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<KanbanSkeleton />}>
      <DashboardPage />
    </Suspense>
  );
}