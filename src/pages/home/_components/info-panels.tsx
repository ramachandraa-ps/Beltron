import { useLang } from "@/lib/language-context.tsx";
import { tenders, circulars, careers } from "@/lib/beltron-data.ts";
import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { ArrowRight, Clock, Tag, Briefcase, FileText, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { cn } from "@/lib/utils.ts";
import { Link } from "react-router-dom";

function SectionHeader({ title, sub, action, to }: { title: string; sub?: string; action: string; to: string }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div>
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      <Link
        to={to}
        className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline whitespace-nowrap cursor-pointer"
      >
        {action} <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

function TendersPanel() {
  const { t } = useLang();
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
      <SectionHeader title={t("latestTenders")} action={t("viewAll")} to="/tenders" />
      <div className="space-y-3">
        {tenders.map((tender) => (
          <div
            key={tender.id}
            className="group p-3 rounded-xl hover:bg-secondary/60 transition-colors cursor-pointer border border-transparent hover:border-border"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <span className="text-xs font-mono text-muted-foreground">{tender.id}</span>
              <Badge
                variant={tender.status === "open" ? "default" : "destructive"}
                className="text-[10px] py-0 shrink-0"
              >
                {tender.status === "open" ? "Open" : "Closing Soon"}
              </Badge>
            </div>
            <p className="text-sm text-foreground font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {tender.title}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                {tender.department}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {tender.deadline}
              </span>
              <span className="flex items-center gap-1 font-semibold text-primary">
                <Tag className="w-3 h-3" />
                {tender.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CircularsPanel() {
  const { t } = useLang();
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
      <SectionHeader title={t("latestCirculars")} action={t("viewAll")} to="/circulars" />
      <div className="space-y-0 divide-y divide-border">
        {circulars.map((c) => (
          <div key={c.id} className="py-3 group cursor-pointer">
            <div className="flex items-start gap-2">
              <Bell className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  {c.isNew && (
                    <span className="text-[9px] font-bold uppercase bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                  <span className="text-[10px] text-muted-foreground">{c.date}</span>
                </div>
                <p className="text-sm text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {c.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CareersPanel() {
  const { t } = useLang();
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
      <SectionHeader title={t("careers")} action={t("viewAll")} to="/careers" />
      <div className="space-y-3">
        {careers.map((job) => (
          <div
            key={job.id}
            className="group p-3 rounded-xl hover:bg-secondary/60 transition-colors cursor-pointer border border-transparent hover:border-border"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5">
                {job.isNew && (
                  <span className="text-[9px] font-bold uppercase bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                    NEW
                  </span>
                )}
                <span className="text-xs font-mono text-muted-foreground">{job.id}</span>
              </div>
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold shrink-0">
                {job.posts} Posts
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {job.title}
            </p>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                {job.qualification}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Last: {job.lastDate}
              </span>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-primary hover:underline cursor-pointer"
            >
              {t("applyNow")} <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InfoPanels() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-14 px-4 bg-background" aria-label="Tenders, Circulars, and Careers">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[TendersPanel, CircularsPanel, CareersPanel].map((Panel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <Panel />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
