import { useState } from "react";
import { projects } from "@/lib/dashboard-data.ts";
import type { ProjectStatus } from "@/lib/dashboard-data.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { FolderKanban, ChevronDown, ChevronUp, CheckCircle2, Circle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const statusColor: Record<ProjectStatus, string> = {
  "on-track": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "delayed": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  "completed": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "planning": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

const statusLabel: Record<ProjectStatus, string> = {
  "on-track": "On Track",
  "delayed": "Delayed",
  "completed": "Completed",
  "planning": "Planning",
};

export default function ProjectTracker() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | "all">("all");

  const filtered = filterStatus === "all"
    ? projects
    : projects.filter((p) => p.status === filterStatus);

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-primary" />
            Project Tracker ({projects.length} Projects)
          </CardTitle>
          <div className="flex flex-wrap gap-1.5">
            {(["all", "on-track", "delayed", "completed", "planning"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-2.5 py-1 text-xs rounded-full border transition-colors cursor-pointer ${
                  filterStatus === s
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {s === "all" ? "All" : statusLabel[s]}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {filtered.map((project) => {
          const isExpanded = expandedId === project.id;
          return (
            <div
              key={project.id}
              className="border border-border rounded-lg overflow-hidden"
            >
              {/* Header */}
              <button
                className="w-full flex items-center gap-3 p-3 sm:p-4 hover:bg-secondary/50 transition-colors text-left cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : project.id)}
                aria-expanded={isExpanded}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-muted-foreground">{project.id}</span>
                    <Badge className={`text-[10px] px-1.5 py-0 border-0 ${statusColor[project.status]}`}>
                      {statusLabel[project.status]}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-medium mt-1 truncate">{project.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{project.department}</p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="hidden sm:flex flex-col items-end gap-0.5">
                    <span className="text-xs text-muted-foreground">Budget: {project.budget}</span>
                    <span className="text-xs text-muted-foreground">Spent: {project.spent}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 w-16">
                    <span className="text-xs font-semibold">{project.progress}%</span>
                    <Progress value={project.progress} className="h-1.5 w-full" />
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1 border-t border-border bg-secondary/30">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3 text-xs">
                        <div>
                          <span className="text-muted-foreground">Start Date</span>
                          <p className="font-medium">{project.startDate}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">End Date</span>
                          <p className="font-medium">{project.endDate}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Budget</span>
                          <p className="font-medium">{project.budget}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Spent</span>
                          <p className="font-medium">{project.spent}</p>
                        </div>
                      </div>
                      <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Milestones
                      </h5>
                      <div className="space-y-1.5">
                        {project.milestones.map((m) => (
                          <div key={m.label} className="flex items-center gap-2 text-sm">
                            {m.done ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                            )}
                            <span className={m.done ? "text-foreground" : "text-muted-foreground"}>
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
