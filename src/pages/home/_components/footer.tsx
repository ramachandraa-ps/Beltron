import { useLang } from "@/lib/language-context.tsx";
import { ExternalLink, MapPin, Phone, Mail, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const gigwLinks = [
  { key: "privacyPolicy" as const, href: "/privacy-policy" },
  { key: "disclaimer" as const, href: "/disclaimer" },
  { key: "accessibility" as const, href: "/accessibility" },
  { key: "sitemap" as const, href: "/sitemap" },
  { key: "websitePolicy" as const, href: "/privacy-policy" },
  { key: "terms" as const, href: "/terms" },
  { key: "rtInfo" as const, href: "#" },
  { key: "contactUs" as const, href: "#" },
];

const relatedSites = [
  { label: "Bihar Government", href: "https://state.bihar.gov.in" },
  { label: "NIC", href: "https://www.nic.in" },
  { label: "MeitY", href: "https://www.meity.gov.in" },
  { label: "Digital India", href: "https://digitalindia.gov.in" },
  { label: "NeSDA", href: "https://nesda.gov.in" },
  { label: "India.gov.in", href: "https://india.gov.in" },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-[oklch(0.15_0.03_250)] text-[oklch(0.8_0.02_240)]" role="contentinfo">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://hercules-cdn.com/file_xiij45xLQaIy98McRcwUAHaj"
                alt="BELTRON Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-white font-bold text-base">{t("siteName")}</div>
              <div className="text-xs text-[oklch(0.65_0.03_240)] leading-tight max-w-[180px]">
                {t("siteFullName")}
              </div>
            </div>
          </div>
          <p className="text-xs text-[oklch(0.6_0.02_240)] leading-relaxed">
            Established under Government of Bihar to spearhead IT infrastructure development, 
            digital services, and e-governance initiatives across the state.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2">
            {([
              { label: t("home"), href: "/" },
              { label: t("about"), href: "#" },
              { label: t("services"), href: "#" },
              { label: t("tenders"), href: "/tenders" },
              { label: t("careers"), href: "/careers" },
              { label: t("projects"), href: "/dashboard" },
              { label: t("contact"), href: "#" },
            ]).map((link) => (
              <li key={link.label}>
                <Link to={link.href} className="text-xs hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary/60" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Government Portals */}
        <div>
          <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Related Portals</h4>
          <ul className="space-y-2">
            {relatedSites.map((site) => (
              <li key={site.label}>
                <a
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ExternalLink className="w-2.5 h-2.5 opacity-50 shrink-0" />
                  {site.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">{t("contactUs")}</h4>
          <address className="not-italic space-y-3 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <span>BELTRON Bhawan, Shastri Nagar,<br />Patna – 800 023, Bihar, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
              <a href="tel:06122525154" className="hover:text-white transition-colors">0612-2525154</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
              <a href="mailto:info@beltron.org" className="hover:text-white transition-colors">info@beltron.org</a>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
              <a href="https://bsedc.bihar.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                bsedc.bihar.gov.in
              </a>
            </div>
          </address>
        </div>
      </div>

      {/* GIGW-compliant bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Policy links */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center mb-3">
            {gigwLinks.map((link) => (
              <Link
                key={link.key}
                to={link.href}
                className="text-[10px] hover:text-white transition-colors cursor-pointer"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Compliance badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
            {["GIGW Compliant", "WCAG 2.1 AA", "ISO 27001", "NeSDA Certified"].map((badge) => (
              <span
                key={badge}
                className="text-[9px] font-bold uppercase px-2 py-0.5 rounded border border-white/20 text-[oklch(0.65_0.05_250)]"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Copyright & last updated */}
          <div className="text-center text-[10px] text-[oklch(0.5_0.02_240)] space-y-0.5">
            <p>{t("copyright")}</p>
            <p>{t("lastUpdatedDate")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
