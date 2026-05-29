import { useLang } from "@/lib/language-context.tsx";
import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { Users, Building2, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const personas = [
  {
    icon: Users,
    keyTitle: "forCitizens" as const,
    color: "from-blue-600 to-blue-800",
    links: [
      { label: "Job Notifications", labelHi: "नौकरी अधिसूचनाएं", href: "/careers" },
      { label: "Online Registration", labelHi: "ऑनलाइन पंजीकरण", href: "" },
      { label: "Grievance Portal", labelHi: "शिकायत पोर्टल", href: "/grievances" },
      { label: "RTI Application", labelHi: "आरटीआई आवेदन", href: "" },
    ],
  },
  {
    icon: Briefcase,
    keyTitle: "forVendors" as const,
    color: "from-indigo-600 to-indigo-800",
    links: [
      { label: "Active Tenders", labelHi: "सक्रिय टेंडर", href: "/tenders" },
      { label: "Empanelment Form", labelHi: "एम्पेनलमेंट फॉर्म", href: "/empanelment" },
      { label: "e-Procurement Login", labelHi: "ई-प्रोक्योरमेंट लॉगिन", href: "" },
      { label: "Bid Submission Status", labelHi: "बोली स्थिति", href: "" },
    ],
  },
  {
    icon: Building2,
    keyTitle: "forDepts" as const,
    color: "from-slate-700 to-slate-900",
    links: [
      { label: "IT Service Request", labelHi: "आईटी सेवा अनुरोध", href: "/employee-requests" },
      { label: "Project Tracker", labelHi: "परियोजना ट्रैकर", href: "/dashboard" },
      { label: "Manpower Requisition", labelHi: "जनशक्ति मांग", href: "" },
      { label: "SDC / Cloud Access", labelHi: "SDC / क्लाउड एक्सेस", href: "" },
    ],
  },
];

export default function PersonaSection() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 px-4"
      style={{ background: "linear-gradient(180deg, oklch(0.96 0.01 240) 0%, oklch(0.93 0.015 240) 100%)" }}
      aria-label="Persona-based navigation"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((persona, i) => (
            <motion.div
              key={persona.keyTitle}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="rounded-2xl overflow-hidden shadow-sm border border-white/60 hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className={`bg-gradient-to-br ${persona.color} p-5 flex items-center gap-3`}>
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <persona.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-bold text-base">{t(persona.keyTitle)}</h3>
              </div>
              {/* Links */}
              <div className="bg-white p-2">
                {persona.links.map((link) => (
                  link.href ? (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-secondary text-sm text-foreground hover:text-primary transition-colors cursor-pointer group"
                    >
                      <span>{lang === "hi" ? link.labelHi : link.label}</span>
                      <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
                    </Link>
                  ) : (
                    <button
                      key={link.label}
                      onClick={() => toast.info("Coming soon in a future milestone!")}
                      className="flex w-full items-center justify-between px-3 py-2.5 rounded-lg hover:bg-secondary text-sm text-foreground hover:text-primary transition-colors cursor-pointer group"
                    >
                      <span>{lang === "hi" ? link.labelHi : link.label}</span>
                      <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
                    </button>
                  )
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
