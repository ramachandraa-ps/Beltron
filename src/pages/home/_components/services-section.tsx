import { useLang } from "@/lib/language-context.tsx";
import { services } from "@/lib/beltron-data.ts";
import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";

type IconName = keyof typeof Icons;

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue:   { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-100" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-100" },
  sky:    { bg: "bg-sky-50",    text: "text-sky-700",    border: "border-sky-100" },
  green:  { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-100" },
  orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-100" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-100" },
};

function ServiceIcon({ name, color }: { name: string; color: string }) {
  const Icon = Icons[name as IconName] as React.ComponentType<{ className?: string }> | undefined;
  const c = colorMap[color] ?? colorMap.blue;
  if (!Icon) return null;
  return (
    <div className={`w-12 h-12 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center`}>
      <Icon className={`w-6 h-6 ${c.text}`} />
    </div>
  );
}

export default function ServicesSection() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 px-4 bg-secondary/40" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 id="services-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {t("servicesTitle")}
          </h2>
          <p className="text-muted-foreground">{t("servicesSub")}</p>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="group bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
            >
              <ServiceIcon name={service.icon} color={service.color} />
              <h3 className="mt-4 font-bold text-foreground text-base group-hover:text-primary transition-colors">
                {lang === "hi" ? service.titleHi : service.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {lang === "hi" ? service.descriptionHi : service.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-primary hover:underline"
              >
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
