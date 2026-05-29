import { useLang } from "@/lib/language-context.tsx";
import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { Award } from "lucide-react";

const leaders = [
  {
    name: "Samrat Choudhary",
    nameHi: "सम्राट चौधरी",
    title: "Hon'ble Chief Minister, Bihar",
    titleHi: "माननीय मुख्यमंत्री, बिहार",
    initials: "SC",
    gradient: "from-amber-600 to-amber-800",
    photo: "https://hercules-cdn.com/file_07kN3co3Ahb6vNL5SrcXoHYL",
  },
  {
    name: "Nitish Mishra",
    nameHi: "नितीश मिश्रा",
    title: "Hon'ble I.T Minister, Bihar",
    titleHi: "माननीय आईटी मंत्री, बिहार",
    initials: "NM",
    gradient: "from-blue-700 to-blue-900",
    photo: "https://hercules-cdn.com/file_dUTO6zOZarrmHRcdImoIrGW0",
  },
  {
    name: "Kaushal Kishore, I.A.S",
    nameHi: "कौशल किशोर, आई.ए.एस",
    title: "Managing Director, B.S.E.D.C - BELTRON, Bihar",
    titleHi: "प्रबंध निदेशक, बी.एस.ई.डी.सी - बेल्ट्रॉन, बिहार",
    initials: "KK",
    gradient: "from-slate-700 to-slate-900",
    photo: "https://hercules-cdn.com/file_Ac70TmWd9P7ImxKal7l1j17u",
  },
];

export default function LeadershipSection() {
  const { lang } = useLang();
  const isEn = lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 px-4 bg-gradient-to-b from-white to-secondary/30"
      aria-label="Leadership"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {isEn ? "Leadership" : "नेतृत्व"}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
            {isEn ? "Our Esteemed Heads & Authorities" : "हमारे सम्मानित प्रमुख एवं अधिकारी"}
          </h2>
        </motion.div>

        {/* Leader cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i, ease: "easeOut" }}
              className="group"
            >
              <div className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-lg transition-shadow p-6 text-center h-full flex flex-col items-center">
                {/* Avatar */}
                {leader.photo ? (
                  <img
                    src={leader.photo}
                    alt={isEn ? leader.name : leader.nameHi}
                    className="w-24 h-24 rounded-full object-cover mb-4 shadow-md group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div
                    className={`w-24 h-24 rounded-full bg-gradient-to-br ${leader.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform`}
                  >
                    <span className="text-white font-bold text-2xl tracking-wide">
                      {leader.initials}
                    </span>
                  </div>
                )}

                {/* Name */}
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {isEn ? leader.name : leader.nameHi}
                </h3>

                {/* Title */}
                <p className="text-sm text-muted-foreground leading-snug">
                  {isEn ? leader.title : leader.titleHi}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
