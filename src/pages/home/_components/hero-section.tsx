import { useState } from "react";
import { useLang } from "@/lib/language-context.tsx";
import { motion } from "motion/react";
import { Search, ArrowRight } from "lucide-react";
import { quickAccessLinks } from "@/lib/beltron-data.ts";
import * as Icons from "lucide-react";

type IconName = keyof typeof Icons;

function QuickIcon({ name }: { name: string }) {
  const Icon = Icons[name as IconName] as React.ComponentType<{ className?: string }> | undefined;
  if (!Icon) return null;
  return <Icon className="w-5 h-5" />;
}

export default function HeroSection() {
  const { t, lang } = useLang();
  const [query, setQuery] = useState("");
  const [suggestions] = useState([
    "Active Tenders",
    "IT Manpower Registration",
    "Software Engineer Vacancy",
    "e-Procurement Portal",
    "SDC Bihar",
    "Empanelment",
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.22 0.06 250) 0%, oklch(0.30 0.10 250) 40%, oklch(0.35 0.13 250) 100%)",
        minHeight: "480px",
      }}
      aria-label="Hero section"
    >
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-12">
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5 text-white/80 text-sm font-medium backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {lang === "hi" ? "बिहार सरकार की आधिकारिक आईटी एजेंसी" : "Government of Bihar's Official IT Agency"}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white text-balance mb-4 leading-tight">
            {t("heroTitle")}
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto text-balance">
            {t("heroSubtitle")}
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl mx-auto relative"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-muted-foreground" />
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-12 pr-36 py-4 rounded-xl bg-white text-foreground placeholder:text-muted-foreground text-sm shadow-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary/40"
              aria-label={t("searchPlaceholder")}
              role="searchbox"
              data-search-input
            />
            <button className="absolute right-2 inset-y-2 bg-primary text-primary-foreground px-5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer flex items-center gap-2">
              {t("searchBtn")}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Autocomplete dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-border overflow-hidden z-50">
              <div className="px-3 py-2 bg-secondary/60 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Popular Searches
              </div>
              {suggestions.map((s) => (
                <button
                  key={s}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-secondary text-foreground transition-colors cursor-pointer flex items-center gap-2"
                  onMouseDown={() => setQuery(s)}
                >
                  <Search className="w-3.5 h-3.5 text-muted-foreground" />
                  {s}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick access links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-10"
        >
          <p className="text-white/60 text-xs uppercase tracking-widest text-center mb-4 font-semibold">
            {t("quickLinks")}
          </p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {quickAccessLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                className="flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl p-3 text-white text-center transition-all cursor-pointer group backdrop-blur-sm"
                aria-label={lang === "hi" ? link.labelHi : link.label}
              >
                <div className="w-8 h-8 rounded-lg bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-colors">
                  <QuickIcon name={link.icon} />
                </div>
                <span className="text-[10px] leading-tight font-medium text-white/80 group-hover:text-white transition-colors">
                  {lang === "hi" ? link.labelHi : link.label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
