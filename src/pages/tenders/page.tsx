import { useState, useMemo } from "react";
import { useLang } from "@/lib/language-context.tsx";
import {
  allTenders,
  tenderCategories,
  tenderStatuses,
  type TenderCategory,
  type TenderStatus,
} from "@/lib/portal-data.ts";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Filter,
  Download,
  Clock,
  Tag,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { cn } from "@/lib/utils.ts";
import AnimatedPage from "@/components/animated-page.tsx";

const statusConfig = {
  open: { label: "Open", icon: CheckCircle2, color: "bg-green-100 text-green-800 border-green-200" },
  closing: { label: "Closing Soon", icon: AlertCircle, color: "bg-orange-100 text-orange-800 border-orange-200" },
  closed: { label: "Closed", icon: XCircle, color: "bg-gray-100 text-gray-600 border-gray-200" },
  awarded: { label: "Awarded", icon: Trophy, color: "bg-blue-100 text-blue-800 border-blue-200" },
} as const;

function mapStatus(s: string): keyof typeof statusConfig {
  if (s === "open") return "open";
  if (s === "closing") return "closing";
  if (s === "closed") return "closed";
  if (s === "awarded") return "awarded";
  return "open";
}

function TenderDetail({ tender, onBack }: { tender: (typeof allTenders)[0]; onBack: () => void }) {
  const { lang } = useLang();
  const cfg = statusConfig[mapStatus(tender.status)];
  const StatusIcon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.25 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-primary font-semibold mb-5 hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tenders
      </button>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
            <span className="text-xs font-mono opacity-80">{tender.refNo}</span>
            <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full border flex items-center gap-1", cfg.color)}>
              <StatusIcon className="w-3 h-3" />
              {cfg.label}
            </span>
          </div>
          <h2 className="text-xl font-bold leading-snug">
            {lang === "hi" ? tender.titleHi : tender.title}
          </h2>
          <p className="text-white/70 text-sm mt-1">{tender.department}</p>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-y divide-border border-b border-border">
          {[
            { icon: Tag, label: "Estimated Value", value: tender.value },
            { icon: Calendar, label: "Published On", value: tender.publishedOn },
            { icon: Clock, label: "Last Date", value: tender.deadline },
            { icon: Briefcase, label: "Category", value: tender.category },
          ].map((m) => (
            <div key={m.label} className="px-4 py-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5">
                <m.icon className="w-3 h-3" />
                {m.label}
              </div>
              <div className="text-sm font-semibold text-foreground">{m.value}</div>
            </div>
          ))}
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-2">Scope of Work</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{tender.description}</p>
          </div>

          {/* Bid details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-secondary/60 rounded-xl p-4">
              <div className="text-xs text-muted-foreground mb-1">Earnest Money Deposit (EMD)</div>
              <div className="text-base font-bold text-foreground">{tender.bidSecurity}</div>
            </div>
            <div className="bg-secondary/60 rounded-xl p-4">
              <div className="text-xs text-muted-foreground mb-1">Pre-qualification Required</div>
              <div className="text-base font-bold text-foreground">{tender.prequalification ? "Yes" : "No"}</div>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3">Tender Documents</h3>
            <div className="space-y-2">
              {tender.docs.map((doc) => (
                <div
                  key={doc}
                  className="flex items-center justify-between gap-4 p-3 rounded-xl border border-border hover:bg-secondary/60 transition-colors"
                >
                  <div className="flex items-center gap-2 text-sm text-foreground min-w-0">
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">{doc}</span>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer shrink-0">
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          {(tender.status === "open" || tender.status === "closing") && (
            <div className="flex gap-3 pt-2">
              <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer">
                Submit Bid Online
              </button>
              <button className="px-6 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-secondary transition-colors cursor-pointer">
                Register Interest
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function TendersPage() {
  const { t, lang } = useLang();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TenderCategory>("All");
  const [selectedStatus, setSelectedStatus] = useState<TenderStatus>("All");
  const [selectedTender, setSelectedTender] = useState<(typeof allTenders)[0] | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return allTenders.filter((t) => {
      const matchSearch =
        !search ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.department.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === "All" || t.category === selectedCategory;
      const matchStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Open" && t.status === "open") ||
        (selectedStatus === "Closing Soon" && t.status === "closing") ||
        (selectedStatus === "Closed" && t.status === "closed") ||
        (selectedStatus === "Awarded" && t.status === "awarded");
      return matchSearch && matchCat && matchStatus;
    });
  }, [search, selectedCategory, selectedStatus]);

  return (
    <AnimatedPage className="max-w-7xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{t("latestTenders")}</h1>
        <p className="text-muted-foreground text-sm">
          {lang === "hi"
            ? "बिहार सरकार के विभागों द्वारा जारी सभी सक्रिय एवं पिछले टेंडर"
            : "All active and past tenders issued by Bihar Government departments through BELTRON"}
        </p>
      </div>

      {selectedTender ? (
        <AnimatePresence>
          <TenderDetail tender={selectedTender} onBack={() => setSelectedTender(null)} />
        </AnimatePresence>
      ) : (
        <>
          {/* Search + filter bar */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-4 mb-6">
            <div className="flex gap-3 flex-wrap">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 inset-y-0 my-auto h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tenders by title, ID, or department..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-secondary/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors cursor-pointer",
                  showFilters ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"
                )}
              >
                <Filter className="w-4 h-4" />
                Filters
                {showFilters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Category</p>
                      <div className="flex flex-wrap gap-2">
                        {tenderCategories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer",
                              selectedCategory === cat
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border hover:bg-secondary"
                            )}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Status</p>
                      <div className="flex flex-wrap gap-2">
                        {tenderStatuses.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSelectedStatus(s)}
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer",
                              selectedStatus === s
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border hover:bg-secondary"
                            )}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-4">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {allTenders.length} tenders
          </p>

          {/* Tender list */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-border p-12 text-center">
                <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-foreground font-semibold">No tenders found</p>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              filtered.map((tender, i) => {
                const cfg = statusConfig[mapStatus(tender.status)];
                const StatusIcon = cfg.icon;
                return (
                  <motion.div
                    key={tender.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                    onClick={() => setSelectedTender(tender)}
                    className="bg-white rounded-2xl border border-border shadow-sm p-5 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">{tender.id}</span>
                        <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">{tender.category}</span>
                      </div>
                      <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 shrink-0", cfg.color)}>
                        <StatusIcon className="w-3 h-3" />
                        {cfg.label}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                      {lang === "hi" ? tender.titleHi : tender.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {tender.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Deadline: <strong className={cn("ml-0.5", tender.status === "closing" ? "text-orange-600" : "")}>{tender.deadline}</strong>
                      </span>
                      <span className="flex items-center gap-1 text-primary font-semibold">
                        <Tag className="w-3 h-3" />
                        {tender.value}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {tender.docs.length} doc{tender.docs.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </>
      )}
    </AnimatedPage>
  );
}
