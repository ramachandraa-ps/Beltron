import { useState, useMemo } from "react";
import { useLang } from "@/lib/language-context.tsx";
import { allCirculars } from "@/lib/portal-data.ts";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Download,
  Bell,
  Calendar,
  FileText,
  ArrowLeft,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils.ts";
import AnimatedPage from "@/components/animated-page.tsx";

const categories = ["All", "Policy", "Office Order", "Notice", "Corrigendum", "Advisory", "Notification"] as const;
type CircularCategory = (typeof categories)[number];

const catColors: Record<string, string> = {
  Policy: "bg-blue-100 text-blue-800",
  "Office Order": "bg-purple-100 text-purple-800",
  Notice: "bg-yellow-100 text-yellow-800",
  Corrigendum: "bg-orange-100 text-orange-800",
  Advisory: "bg-red-100 text-red-800",
  Notification: "bg-green-100 text-green-800",
};

function CircularDetail({ circular, onBack }: { circular: (typeof allCirculars)[0]; onBack: () => void }) {
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
        <ArrowLeft className="w-4 h-4" /> Back to Circulars
      </button>
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", catColors[circular.category] ?? "bg-gray-100 text-gray-700")}>
              {circular.category}
            </span>
            {circular.isNew && (
              <span className="text-[9px] font-bold uppercase bg-green-500 text-white px-1.5 py-0.5 rounded-full">NEW</span>
            )}
          </div>
          <h2 className="text-xl font-bold leading-snug">{lang === "hi" ? circular.titleHi : circular.title}</h2>
          <div className="flex items-center gap-1 mt-2 text-white/70 text-sm">
            <Calendar className="w-3.5 h-3.5" />
            {circular.date}
          </div>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <h3 className="text-sm font-bold text-foreground mb-2">Summary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{circular.summary}</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3">Document</h3>
            <div className="flex items-center justify-between gap-4 p-3 rounded-xl border border-border hover:bg-secondary/60 transition-colors">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <FileText className="w-4 h-4 text-primary shrink-0" />
                {circular.doc}
              </div>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer">
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CircularsPage() {
  const { lang } = useLang();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CircularCategory>("All");
  const [selected, setSelected] = useState<(typeof allCirculars)[0] | null>(null);

  const filtered = useMemo(() => {
    return allCirculars.filter((c) => {
      const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === "All" || c.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [search, selectedCategory]);

  return (
    <AnimatedPage className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
          {lang === "hi" ? "परिपत्र एवं सूचनाएं" : "Circulars & Notifications"}
        </h1>
        <p className="text-muted-foreground text-sm">
          {lang === "hi"
            ? "बेल्ट्रॉन द्वारा जारी सभी परिपत्र, कार्यालय आदेश और अधिसूचनाएं"
            : "All circulars, office orders, and notifications issued by BELTRON"}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {selected ? (
          <CircularDetail key="detail" circular={selected} onBack={() => setSelected(null)} />
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Search */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-4 mb-4">
              <div className="relative mb-3">
                <Search className="absolute left-3 inset-y-0 my-auto h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search circulars..."
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

            <p className="text-sm text-muted-foreground mb-4">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> results
            </p>

            <div className="space-y-2">
              {filtered.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}
                  onClick={() => setSelected(c)}
                  className="bg-white rounded-xl border border-border shadow-sm p-4 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <Bell className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {c.isNew && (
                          <span className="text-[9px] font-bold uppercase bg-green-500 text-white px-1.5 py-0.5 rounded-full">NEW</span>
                        )}
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", catColors[c.category] ?? "bg-gray-100 text-gray-700")}>
                          {c.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {c.date}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">{c.id}</span>
                      </div>
                      <p className="text-sm text-foreground group-hover:text-primary transition-colors font-medium leading-snug">
                        {lang === "hi" ? c.titleHi : c.title}
                      </p>
                    </div>
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary shrink-0 cursor-pointer">
                      <Tag className="w-3 h-3" />
                      PDF
                    </button>
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
