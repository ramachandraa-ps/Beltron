import { useRef } from "react";
import CountUp from "react-countup";
import { useInView } from "motion/react";
import { useLang } from "@/lib/language-context.tsx";
import { impactStats } from "@/lib/beltron-data.ts";
import { motion } from "motion/react";
import * as Icons from "lucide-react";

type IconName = keyof typeof Icons;

function StatIcon({ name }: { name: string }) {
  const Icon = Icons[name as IconName] as React.ComponentType<{ className?: string }> | undefined;
  if (!Icon) return null;
  return <Icon className="w-6 h-6" />;
}

export default function ImpactMetrics() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-16 px-4"
      style={{
        background: "linear-gradient(180deg, oklch(0.96 0.01 240) 0%, oklch(0.98 0.004 240) 100%)",
      }}
      aria-label="Impact metrics"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t("impactMetrics")}</h2>
          <p className="text-muted-foreground">{t("impactSub")}</p>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="bg-white rounded-2xl p-5 text-center shadow-sm border border-border hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                <StatIcon name={stat.icon} />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary leading-none">
                {isInView ? (
                  <CountUp
                    end={stat.value}
                    duration={2}
                    separator=","
                    suffix={stat.suffix}
                    delay={i * 0.1}
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <div className="text-xs text-muted-foreground mt-1.5 font-medium leading-tight">
                {t(stat.key as Parameters<typeof t>[0])}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
