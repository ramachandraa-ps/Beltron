import { Card, CardContent } from "@/components/ui/card.tsx";
import { TrendingUp, FileText, Users, IndianRupee, FolderKanban, MapPin } from "lucide-react";
import { monthlyTenderData, workforceByDivision, projects, districtCoverage } from "@/lib/dashboard-data.ts";
import { motion } from "motion/react";

const stats = [
  {
    label: "Total Tenders (12m)",
    value: monthlyTenderData.reduce((s, d) => s + d.published, 0).toString(),
    icon: FileText,
    color: "text-blue-600 bg-blue-50 dark:bg-blue-900/30",
  },
  {
    label: "Total Value",
    value: `\u20B9 ${monthlyTenderData.reduce((s, d) => s + d.value, 0).toFixed(0)} Cr`,
    icon: IndianRupee,
    color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30",
  },
  {
    label: "IT Personnel",
    value: workforceByDivision.reduce((s, d) => s + d.deployed, 0).toLocaleString(),
    icon: Users,
    color: "text-purple-600 bg-purple-50 dark:bg-purple-900/30",
  },
  {
    label: "Active Projects",
    value: projects.filter((p) => p.status === "on-track" || p.status === "delayed").length.toString(),
    icon: FolderKanban,
    color: "text-amber-600 bg-amber-50 dark:bg-amber-900/30",
  },
  {
    label: "Districts Covered",
    value: districtCoverage.length.toString(),
    icon: MapPin,
    color: "text-rose-600 bg-rose-50 dark:bg-rose-900/30",
  },
  {
    label: "Avg. Award Rate",
    value: `${Math.round(
      (monthlyTenderData.reduce((s, d) => s + d.awarded, 0) /
        monthlyTenderData.reduce((s, d) => s + d.published, 0)) *
        100
    )}%`,
    icon: TrendingUp,
    color: "text-teal-600 bg-teal-50 dark:bg-teal-900/30",
  },
];

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" }}
        >
          <Card className="py-3 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <CardContent className="flex flex-col items-center text-center gap-2 px-3 py-0">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-lg font-bold leading-tight">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
