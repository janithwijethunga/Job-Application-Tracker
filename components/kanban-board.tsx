"use client";

import { Board, Column, JobApplication } from "@/lib/models/models.types";
import {
  Award,
  Calendar,
  CheckCircle2,
  Mic,
  MoreVertical,
  Plus,
  Trash2,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import CreateJobApplicationDialog from "./create-job-dialog";
import { Button } from "./ui/button";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import JobApplicationCard from "./job-application-card";
import { useBoard } from "@/lib/hooks/useBoards";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";

interface KanbanBoardProps {
  board: Board;
  userId: string;
}

interface ColConfig {
  badgeBg: string;
  badgeText: string;
  dotColor: string;
  icon: React.ReactNode;
}

const COLUMN_CONFIG: Array<ColConfig> = [
  {
    badgeBg: "bg-sky-50 dark:bg-sky-950/40",
    badgeText: "text-sky-700 dark:text-sky-300",
    dotColor: "bg-sky-500",
    icon: <Calendar className="h-3.5 w-3.5" />,
  },
  {
    badgeBg: "bg-purple-50 dark:bg-purple-950/40",
    badgeText: "text-purple-700 dark:text-purple-300",
    dotColor: "bg-purple-500",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  {
    badgeBg: "bg-amber-50 dark:bg-amber-950/40",
    badgeText: "text-amber-700 dark:text-amber-300",
    dotColor: "bg-amber-500",
    icon: <Mic className="h-3.5 w-3.5" />,
  },
  {
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    dotColor: "bg-emerald-500",
    icon: <Award className="h-3.5 w-3.5" />,
  },
  {
    badgeBg: "bg-rose-50 dark:bg-rose-950/40",
    badgeText: "text-rose-700 dark:text-rose-300",
    dotColor: "bg-rose-500",
    icon: <XCircle className="h-3.5 w-3.5" />,
  },
];

function DroppableColumn({
  column,
  config,
  boardId,
  sortedColumns,
}: {
  column: Column;
  config: ColConfig;
  boardId: string;
  sortedColumns: Column[];
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column._id,
    data: {
      type: "column",
      columnId: column._id,
    },
  });

  const sortedJobs =
    column.jobApplications?.slice().sort((a, b) => a.order - b.order) || [];

  return (
    <div
      ref={setNodeRef}
      className={`flex w-80 shrink-0 flex-col rounded-2xl border transition-all duration-200 ${
        isOver
          ? "border-primary/50 bg-primary/5 shadow-sm ring-2 ring-primary/20 dark:border-primary/50 dark:bg-primary/10"
          : "border-slate-200/80 bg-slate-50/60 dark:border-neutral-800 dark:bg-neutral-900/40"
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ring-black/5 dark:ring-white/10 ${config.badgeBg} ${config.badgeText}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${config.dotColor}`} />
            {config.icon}
            {column.name}
          </span>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-200/70 px-1.5 text-[11px] font-semibold text-slate-600 dark:bg-neutral-800 dark:text-neutral-400">
            {sortedJobs.length}
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Column
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Cards Scrollable Body */}
      <div className="flex flex-1 flex-col gap-2.5 p-3">
        <SortableContext
          items={sortedJobs.map((job) => job._id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedJobs.map((job) => (
            <SortableJobCard
              key={job._id}
              job={{ ...job, columnId: job.columnId || column._id }}
              columns={sortedColumns}
            />
          ))}
        </SortableContext>

        {sortedJobs.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-10 text-center dark:border-neutral-800">
            <p className="text-xs font-medium text-slate-400 dark:text-neutral-500">
              No applications yet
            </p>
            <p className="text-[11px] text-slate-400/80 dark:text-neutral-600">
              Drag cards here or click below
            </p>
          </div>
        )}

        <div className="mt-1">
          <CreateJobApplicationDialog
            columnId={column._id}
            boardId={boardId}
          />
        </div>
      </div>
    </div>
  );
}

function SortableJobCard({
  job,
  columns,
}: {
  job: JobApplication;
  columns: Column[];
}) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({
    id: job._id,
    data: {
      type: "job",
      job,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <JobApplicationCard
        job={job}
        columns={columns}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

export default function KanbanBoard({ board, userId }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { columns, moveJob } = useBoard(board);

  const sortedColumns =
    columns?.slice().sort((a, b) => a.order - b.order) || [];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  async function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveId(null);

    if (!over || !board._id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    let draggedJob: JobApplication | null = null;
    let sourceColumn: Column | null = null;
    let sourceIndex = -1;

    for (const column of sortedColumns) {
      const jobs =
        column.jobApplications?.slice().sort((a, b) => a.order - b.order) || [];
      const jobIndex = jobs.findIndex((j) => j._id === activeId);
      if (jobIndex !== -1) {
        draggedJob = jobs[jobIndex];
        sourceColumn = column;
        sourceIndex = jobIndex;
        break;
      }
    }

    if (!draggedJob || !sourceColumn) return;

    const targetColumn = sortedColumns.find((col) => col._id === overId);
    const targetJob = sortedColumns
      .flatMap((col) => col.jobApplications || [])
      .find((job) => job._id === overId);

    let targetColumnId: string;
    let newOrder: number;

    if (targetColumn) {
      targetColumnId = targetColumn._id;
      const jobsInTarget =
        targetColumn.jobApplications
          ?.filter((j) => j._id !== activeId)
          .sort((a, b) => a.order - b.order) || [];
      newOrder = jobsInTarget.length;
    } else if (targetJob) {
      const targetJobColumn = sortedColumns.find((col) =>
        col.jobApplications?.some((j) => j._id === targetJob._id)
      );
      targetColumnId = targetJob.columnId || targetJobColumn?._id || "";
      if (!targetColumnId) return;

      const targetColumnObj = sortedColumns.find(
        (col) => col._id === targetColumnId
      );
      if (!targetColumnObj) return;

      const allJobsInTargetOriginal =
        targetColumnObj.jobApplications
          ?.slice()
          .sort((a, b) => a.order - b.order) || [];

      const allJobsInTargetFiltered =
        allJobsInTargetOriginal.filter((j) => j._id !== activeId) || [];

      const targetIndexInOriginal = allJobsInTargetOriginal.findIndex(
        (j) => j._id === overId
      );

      const targetIndexInFiltered = allJobsInTargetFiltered.findIndex(
        (j) => j._id === overId
      );

      if (targetIndexInFiltered !== -1) {
        if (sourceColumn._id === targetColumnId) {
          if (sourceIndex < targetIndexInOriginal) {
            newOrder = targetIndexInFiltered + 1;
          } else {
            newOrder = targetIndexInFiltered;
          }
        } else {
          newOrder = targetIndexInFiltered;
        }
      } else {
        newOrder = allJobsInTargetFiltered.length;
      }
    } else {
      return;
    }

    if (!targetColumnId) return;

    await moveJob(activeId, targetColumnId, newOrder);
  }

  const activeJob = sortedColumns
    .flatMap((col) => col.jobApplications || [])
    .find((job) => job._id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="relative">
        {/* Horizontal Kanban Scroll Container */}
        <div className="flex items-start gap-5 overflow-x-auto pb-6 pt-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 dark:scrollbar-thumb-neutral-800">
          {sortedColumns.map((col, index) => {
            const config = COLUMN_CONFIG[index % COLUMN_CONFIG.length];
            return (
              <DroppableColumn
                key={col._id}
                column={col}
                config={config}
                boardId={board._id}
                sortedColumns={sortedColumns}
              />
            );
          })}
        </div>
      </div>

      {/* Lifted Drag Overlay */}
      <DragOverlay dropAnimation={null}>
        {activeJob ? (
          <div className="rotate-2 cursor-grabbing shadow-2xl ring-2 ring-primary/25">
            <JobApplicationCard job={activeJob} columns={sortedColumns} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}