import { useLang } from "@/lib/language-context.tsx";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const sitemapSections = [
  {
    titleEn: "Main Pages",
    titleHi: "मुख्य पृष्ठ",
    links: [
      { label: "Home", labelHi: "होम", href: "/" },
      { label: "Governance Dashboard", labelHi: "गवर्नेंस डैशबोर्ड", href: "/dashboard" },
    ],
  },
  {
    titleEn: "Portals",
    titleHi: "पोर्टल",
    links: [
      { label: "Tenders & Procurement", labelHi: "टेंडर एवं खरीद", href: "/tenders" },
      { label: "Circulars & Notifications", labelHi: "परिपत्र एवं अधिसूचनाएं", href: "/circulars" },
      { label: "Careers & Recruitment", labelHi: "करियर एवं भर्ती", href: "/careers" },
    ],
  },
  {
    titleEn: "Compliance & Policy",
    titleHi: "अनुपालन एवं नीति",
    links: [
      { label: "Accessibility Statement", labelHi: "अभिगम्यता विवरण", href: "/accessibility" },
      { label: "Privacy Policy", labelHi: "गोपनीयता नीति", href: "/privacy-policy" },
      { label: "Terms of Use", labelHi: "उपयोग की शर्तें", href: "/terms" },
      { label: "Disclaimer", labelHi: "अस्वीकरण", href: "/disclaimer" },
      { label: "Sitemap", labelHi: "साइटमैप", href: "/sitemap" },
    ],
  },
  {
    titleEn: "External Links",
    titleHi: "बाहरी लिंक",
    links: [
      { label: "Bihar Government", labelHi: "बिहार सरकार", href: "https://state.bihar.gov.in", external: true },
      { label: "Digital India", labelHi: "डिजिटल इंडिया", href: "https://digitalindia.gov.in", external: true },
      { label: "NIC", labelHi: "NIC", href: "https://www.nic.in", external: true },
      { label: "MeitY", labelHi: "MeitY", href: "https://www.meity.gov.in", external: true },
    ],
  },
];

export default function SitemapPage() {
  const { lang } = useLang();
  const title = lang === "hi" ? "साइटमैप" : "Sitemap";
  const subtitle = lang === "hi"
    ? "इस वेबसाइट के सभी पृष्ठों का विवरण"
    : "A complete listing of all pages available on this website";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sitemapSections.map((section) => (
          <div key={section.titleEn} className="border border-border rounded-lg p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
              {lang === "hi" ? section.titleHi : section.titleEn}
            </h2>
            <ul className="space-y-2">
              {section.links.map((link) => {
                const label = lang === "hi" ? link.labelHi : link.label;
                if ("external" in link && link.external) {
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-3 h-3 text-muted-foreground" />
                        {label}
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="flex items-center gap-1.5 text-sm text-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-3 h-3 text-muted-foreground" />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
