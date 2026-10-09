"use client";

import React, { useState, useEffect } from "react";
import { JobApplication, Column } from "@/lib/models/models.types";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Edit2,
  ExternalLink,
  MoreHorizontal,
  Trash2,
  MapPin,
  Banknote,
  FileText,
  ArrowRightLeft,
  Loader2,
} from "lucide-react";
import {
  deleteJobApplication,
  updateJobApplication,
} from "@/lib/actions/job-applications";

interface JobApplicationCardProps {
  job: JobApplication;
  columns: Column[];
  dragHandleProps?: React.HTMLAttributes<HTMLElement>;
}

export default function JobApplicationCard({
  job,
  columns,
  dragHandleProps,
}: JobApplicationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    company: job.company,
    position: job.position,
    location: job.location || "",
    notes: job.notes || "",
    salary: job.salary || "",
    jobUrl: job.jobUrl || "",
    columnId: job.columnId || "",
    tags: job.tags?.join(", ") || "",
    description: job.description || "",
  });

  // Keep state updated if props mutate
  useEffect(() => {
    setFormData({
      company: job.company,
      position: job.position,
      location: job.location || "",
      notes: job.notes || "",
      salary: job.salary || "",
      jobUrl: job.jobUrl || "",
      columnId: job.columnId || "",
      tags: job.tags?.join(", ") || "",
      description: job.description || "",
    });
  }, [job]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await updateJobApplication(job._id, {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      });

      if (!result?.error) {
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Failed to update job application: ", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    try {
      const result = await deleteJobApplication(job._id);
      if (result?.error) {
        console.error("Failed to delete job application:", result.error);
      }
    } catch (err) {
      console.error("Failed to delete job application: ", err);
    }
  }

  async function handleMove(newColumnId: string) {
    try {
      await updateJobApplication(job._id, { columnId: newColumnId });
    } catch (err) {
      console.error("Failed to move job application: ", err);
    }
  }

  const companyInitials = job.company
    ? job.company
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "JB";

  return (
    <>
      <Card
        className="group relative select-none rounded-xl border border-slate-200/80 bg-white p-0 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        {...dragHandleProps}
      >
        <CardContent className="p-4">
          {/* Card Header: Avatar + Title/Company + Dropdown Actions */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700">
                {companyInitials}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {job.position}
                </h4>
                <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
                  {job.company}
                </p>
              </div>
            </div>

            {/* Actions Menu */}
            <div className="flex shrink-0 items-center gap-1">
              {job.jobUrl && (
                <a
                  href={job.jobUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-md p-1 text-slate-400 opacity-60 transition-opacity hover:bg-slate-100 hover:text-slate-900 hover:opacity-100 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                  aria-label="Open job posting"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-slate-400 opacity-80 transition-opacity hover:bg-slate-100 hover:text-slate-800 group-hover:opacity-100 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48 text-xs">
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <Edit2 className="mr-2 h-3.5 w-3.5" />
                    Edit Application
                  </DropdownMenuItem>

                  {columns.length > 1 && (
                    <>
                      <DropdownMenuSeparator />
                      <div className="px-2 py-1 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                        Move to
                      </div>
                      {columns
                        .filter((c) => c._id !== job.columnId)
                        .map((column) => (
                          <DropdownMenuItem
                            key={column._id}
                            onClick={() => handleMove(column._id)}
                          >
                            <ArrowRightLeft className="mr-2 h-3.5 w-3.5" />
                            {column.name}
                          </DropdownMenuItem>
                        ))}
                    </>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-950/40 dark:focus:text-red-400"
                    onClick={handleDelete}
                  >
                    <Trash2 className="mr-2 h-3.5 w-3.5" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Description Preview */}
          {job.description && (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              {job.description}
            </p>
          )}

          {/* Metadata Badges: Salary, Location, Notes indicator */}
          {(job.salary || job.location || job.notes) && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              {job.salary && (
                <div className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-600/10 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/20">
                  <Banknote className="h-3 w-3" />
                  <span>{job.salary}</span>
                </div>
              )}
              {job.location && (
                <div className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate max-w-[120px]">{job.location}</span>
                </div>
              )}
              {job.notes && (
                <span
                  title="Has notes"
                  className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-[11px] font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                >
                  <FileText className="h-3 w-3" />
                </span>
              )}
            </div>
          )}

          {/* Tags */}
          {job.tags && job.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5 pt-1">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-md bg-blue-50/70 px-2 py-0.5 text-[11px] font-medium text-blue-700 ring-1 ring-blue-700/10 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-400/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-xl sm:rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Edit Application
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              Update details for {job.position} at {job.company}.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4 pt-2" onSubmit={handleUpdate}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="company" className="text-xs font-semibold">
                  Company *
                </Label>
                <Input
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="position" className="text-xs font-semibold">
                  Position *
                </Label>
                <Input
                  id="position"
                  required
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="location" className="text-xs font-semibold">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., Remote / New York, NY"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="salary" className="text-xs font-semibold">
                  Salary
                </Label>
                <Input
                  id="salary"
                  placeholder="e.g., $120,000 - $140,000"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="jobUrl" className="text-xs font-semibold">
                Job Posting URL
              </Label>
              <Input
                id="jobUrl"
                type="url"
                placeholder="https://..."
                value={formData.jobUrl}
                onChange={(e) =>
                  setFormData({ ...formData, jobUrl: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tags" className="text-xs font-semibold">
                Tags (comma-separated)
              </Label>
              <Input
                id="tags"
                placeholder="React, TypeScript, Next.js"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-xs font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                rows={2}
                placeholder="Role summary or core qualifications..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes" className="text-xs font-semibold">
                Personal Notes
              </Label>
              <Textarea
                id="notes"
                rows={3}
                placeholder="Interview stages, referrals, recruiter contact..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </div>

            <DialogFooter className="gap-2 pt-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}