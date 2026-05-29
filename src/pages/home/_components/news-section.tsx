import { useLang } from "@/lib/language-context.tsx";
import { newsItems } from "@/lib/beltron-data.ts";
import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { ArrowRight, Calendar } from "lucide-react";
import { toast } from "sonner";

const categoryColors: Record<string, string> = {
  Award: "bg-yellow-100 text-yellow-800",
  Project: "bg-blue-100 text-blue-800",
  Partnership: "bg-green-100 text-green-800",
};

export default function NewsSection() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 px-4 bg-background" aria-labelledby="news-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10 gap-4"
        >
          <div>
            <h2 id="news-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              {t("newsTitle")}
            </h2>
            <p className="text-muted-foreground text-sm">{t("newsSub")}</p>
            <div className="w-16 h-1 bg-primary rounded-full mt-3" />
          </div>
          <button
            onClick={() => toast.info("Coming soon!")}
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline whitespace-nowrap cursor-pointer"
          >
            {t("viewAll")} <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="group bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColors[item.category] ?? "bg-gray-100 text-gray-700"}`}>
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-snug">
                  {lang === "hi" ? item.titleHi : item.title}
                </h3>
                <a href="#" className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-primary hover:underline">
                  Read more <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
