import { useState } from "react";
import { useLang } from "@/lib/language-context.tsx";
import { Menu, X, ChevronDown, Type, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import UserMenu from "@/components/user-menu.tsx";

const navItems = [
  { key: "home" as const, href: "/" },
  { key: "about" as const, href: "/about", children: [
    { label: "About BELTRON", labelHi: "बेल्ट्रॉन के बारे में", href: "/about" },
    { label: "Our Team", labelHi: "हमारी टीम", href: "/about" },
    { label: "Vision & Mission", labelHi: "दृष्टि एवं मिशन", href: "/about/vision-mission" },
  ]},
  { key: "services" as const, href: "#services", children: [
    { label: "IT Infrastructure", labelHi: "आईटी अवसंरचना", href: "#" },
    { label: "Software Development", labelHi: "सॉफ्टवेयर विकास", href: "#" },
    { label: "IT Manpower", labelHi: "आईटी जनशक्ति", href: "#" },
    { label: "Cybersecurity", labelHi: "साइबर सुरक्षा", href: "#" },
    { label: "Training", labelHi: "प्रशिक्षण", href: "#" },
  ]},
  { key: "tenders" as const, href: "/tenders" },
  { key: "projects" as const, href: "/projects" },
  { key: "contact" as const, href: "#contact" },
];

export default function Navbar() {
  const { t, lang, setLang, increaseFontSize, decreaseFontSize } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white border-b border-border shadow-sm sticky top-0 z-40" role="banner">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-semibold z-50"
      >
        {t("skipToContent")}
      </a>

      {/* Main nav */}
      <nav className="w-full px-6 lg:px-8 min-h-[72px] flex items-center justify-between gap-6" role="navigation" aria-label="Main Navigation">
        <div className="flex items-center gap-8 min-w-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label={t("siteFullName")}>
            {/* BELTRON Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow"
            >
              <img
                src="https://hercules-cdn.com/file_xiij45xLQaIy98McRcwUAHaj"
                alt="BELTRON Logo"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="hidden sm:block">
              <div className="font-bold text-primary text-xl leading-none tracking-tight">{t("siteName")}</div>
              <div className="text-[11px] text-muted-foreground leading-tight mt-1 w-56">{t("siteFullName")}</div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden xl:flex items-center gap-1 list-none" role="menubar">
            {navItems.map((item) => (
              <li key={item.key} className="relative" role="none"
                onMouseEnter={() => item.children && setActiveDropdown(item.key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-[15px] font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors cursor-pointer"
                  role="menuitem"
                  aria-haspopup={item.children ? "true" : undefined}
                  aria-expanded={activeDropdown === item.key ? "true" : undefined}
                >
                  {t(item.key)}
                  {item.children && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.key && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-52 bg-white border border-border rounded-lg shadow-lg overflow-hidden z-50"
                      role="menu"
                    >
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors cursor-pointer"
                          role="menuitem"
                        >
                          {lang === "hi" ? child.labelHi : child.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>

        {/* Right section: User menu + mobile toggle */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <div className="hidden 2xl:block text-xs text-muted-foreground whitespace-nowrap">
            {t("lastUpdatedDate")}
          </div>

          <div className="flex items-center gap-1 rounded-md border border-border bg-white p-0.5 shadow-xs" aria-label="Language selector">
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${lang === "en" ? "bg-primary text-primary-foreground" : "hover:bg-white"}`}
              aria-label="Switch to English"
              aria-pressed={lang === "en"}
            >
              EN
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${lang === "hi" ? "bg-primary text-primary-foreground" : "hover:bg-white"}`}
              aria-label="Switch to Hindi"
              aria-pressed={lang === "hi"}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLang("bho")}
              className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${lang === "bho" ? "bg-primary text-primary-foreground" : "hover:bg-white"}`}
              aria-label="Switch to Bhojpuri"
              aria-pressed={lang === "bho"}
            >
              भोजपुरी
            </button>
          </div>

          <div className="flex items-center gap-0.5 border-l border-border pl-2">
            <button
              onClick={decreaseFontSize}
              className="w-8 h-8 inline-flex items-center justify-center rounded-md hover:bg-secondary transition-colors"
              aria-label={t("decreaseText")}
              title={t("decreaseText")}
            >
              <Type className="w-4 h-4" />
              <span className="text-[10px] leading-none">-</span>
            </button>
            <button
              onClick={increaseFontSize}
              className="w-8 h-8 inline-flex items-center justify-center rounded-md hover:bg-secondary transition-colors"
              aria-label={t("increaseText")}
              title={t("increaseText")}
            >
              <Type className="w-4 h-4" />
              <span className="text-[10px] leading-none">+</span>
            </button>
            <Link
              to="/accessibility"
              className="w-8 h-8 inline-flex items-center justify-center rounded-md hover:bg-secondary transition-colors"
              aria-label={t("screenReader")}
              title={t("screenReader")}
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>

          <UserMenu />
        </div>

        <div className="flex xl:hidden items-center gap-2">
          <button
            className="p-2 rounded-md hover:bg-secondary transition-colors cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden overflow-hidden border-t border-border bg-white"
          >
            <div className="px-4 py-3 space-y-1">
              <div className="px-3 pb-3 mb-2 border-b border-border">
                <div className="flex items-center gap-2 mb-3">
                  <button
                    onClick={() => setLang("en")}
                    className={`px-2.5 py-1 rounded border text-xs font-semibold ${lang === "en" ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}
                    aria-pressed={lang === "en"}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang("hi")}
                    className={`px-2.5 py-1 rounded border text-xs font-semibold ${lang === "hi" ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}
                    aria-pressed={lang === "hi"}
                  >
                    हिंदी
                  </button>
                  <button
                    onClick={() => setLang("bho")}
                    className={`px-2.5 py-1 rounded border text-xs font-semibold ${lang === "bho" ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}
                    aria-pressed={lang === "bho"}
                  >
                    भोजपुरी
                  </button>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">{t("lastUpdatedDate")}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={decreaseFontSize} className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-border" aria-label={t("decreaseText")}>
                      <Type className="w-4 h-4" />
                      <span className="text-[10px] leading-none">-</span>
                    </button>
                    <button onClick={increaseFontSize} className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-border" aria-label={t("increaseText")}>
                      <Type className="w-4 h-4" />
                      <span className="text-[10px] leading-none">+</span>
                    </button>
                    <Link to="/accessibility" className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-border" aria-label={t("screenReader")}>
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
              {navItems.map((item) => (
                <div key={item.key}>
                  <a
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(item.key)}
                  </a>
                  {item.children && (
                    <div className="pl-4 space-y-0.5">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-3 py-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          {lang === "hi" ? child.labelHi : child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
