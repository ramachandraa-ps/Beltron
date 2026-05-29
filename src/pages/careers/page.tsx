import { useState, useMemo } from "react";
import { useLang } from "@/lib/language-context.tsx";
import { allJobs } from "@/lib/portal-data.ts";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  MapPin,
  Clock,
  Users,
  Wallet,
  GraduationCap,
  ArrowLeft,
  CheckCircle,
  Download,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils.ts";
import AnimatedPage from "@/components/animated-page.tsx";

const categories = ["All", "Technical", "Management", "Support", "Finance"] as const;
type JobCategory = (typeof categories)[number];

function JobDetail({ job, onBack }: { job: (typeof allJobs)[0]; onBack: () => void }) {
  const { lang } = useLang();
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
        <ArrowLeft className="w-4 h-4" /> Back to Careers
      </button>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium">{job.category}</span>
            {job.isNew && (
              <span className="text-[9px] font-bold uppercase bg-green-500 text-white px-1.5 py-0.5 rounded-full">NEW</span>
            )}
          </div>
          <h2 className="text-xl font-bold leading-snug">{lang === "hi" ? job.titleHi : job.title}</h2>
          <div className="flex flex-wrap gap-3 mt-3 text-white/70 text-sm">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{job.posts} Posts</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Last Date: {job.lastDate}</span>
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-y divide-border border-b border-border">
          {[
            { icon: GraduationCap, label: "Qualification", value: job.qualification },
            { icon: Briefcase, label: "Experience", value: job.experience },
            { icon: Wallet, label: "Salary", value: job.salary },
            { icon: Clock, label: "Last Date", value: job.lastDate },
          ].map((m) => (
            <div key={m.label} className="px-4 py-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5">
                <m.icon className="w-3 h-3" />{m.label}
              </div>
              <div className="text-sm font-semibold text-foreground">{m.value}</div>
            </div>
          ))}
        </div>

        <div className="p-6 space-y-6">
          {/* Job description */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-2">Job Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
          </div>

          {/* Eligibility */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3">Eligibility Criteria</h3>
            <ul className="space-y-2">
              {job.eligibility.map((e) => (
                <li key={e} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  {e}
                </li>
              ))}
            </ul>
          </div>

          {/* Document */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3">Notification Document</h3>
            <div className="flex items-center justify-between gap-4 p-3 rounded-xl border border-border hover:bg-secondary/60 transition-colors">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Download className="w-4 h-4 text-primary shrink-0" />
                {job.doc}
              </div>
              <button className="text-xs font-semibold text-primary hover:underline cursor-pointer">Download PDF</button>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 pt-2">
            <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer">
              Apply Now Online
            </button>
            <button className="px-6 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-secondary transition-colors cursor-pointer">
              Track Application
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CareersPage() {
  const { lang } = useLang();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>("All");
  const [selectedJob, setSelectedJob] = useState<(typeof allJobs)[0] | null>(null);

  const filtered = useMemo(() => {
    return allJobs.filter((j) => {
      const matchSearch =
        !search ||
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.id.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === "All" || j.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [search, selectedCategory]);

  return (
    <AnimatedPage className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
          {lang === "hi" ? "करियर एवं भर्ती" : "Careers & Recruitment"}
        </h1>
        <p className="text-muted-foreground text-sm">
          {lang === "hi"
            ? "बेल्ट्रॉन में वर्तमान रिक्तियां और आवेदन की जानकारी"
            : "Current vacancies at BELTRON — join Bihar's digital transformation mission"}
        </p>
      </div>

      {/* Stats banner */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "Open Positions", value: allJobs.filter((j) => new Date(j.lastDate) >= new Date()).length },
          { label: "Total Vacancies", value: allJobs.reduce((s, j) => s + j.posts, 0) },
          { label: "Locations", value: "All 38 Districts" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border p-4 text-center shadow-sm">
            <div className="text-xl font-bold text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedJob ? (
          <JobDetail key="detail" job={selectedJob} onBack={() => setSelectedJob(null)} />
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Search + filter */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-4 mb-4">
              <div className="relative mb-3">
                <Search className="absolute left-3 inset-y-0 my-auto h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by job title or ID..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-secondary/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
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

            <div className="space-y-3">
              {filtered.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  onClick={() => setSelectedJob(job)}
                  className="bg-white rounded-2xl border border-border shadow-sm p-5 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        {job.isNew && (
                          <span className="text-[9px] font-bold uppercase bg-green-500 text-white px-1.5 py-0.5 rounded-full">NEW</span>
                        )}
                        <span className="text-xs font-mono text-muted-foreground">{job.id}</span>
                        <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">{job.category}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {lang === "hi" ? job.titleHi : job.title}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                        <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" />{job.qualification}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Last date: <strong className="ml-0.5">{job.lastDate}</strong></span>
                        <span className="flex items-center gap-1"><Wallet className="w-3 h-3" />{job.salary}</span>
                      </div>
                    </div>
                    <div className="text-center shrink-0">
                      <div className="text-xl font-bold text-primary">{job.posts}</div>
                      <div className="text-[10px] text-muted-foreground">Posts</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedPage>
  );
}
