import { useState } from "react";
import { useLang } from "@/lib/language-context.tsx";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
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
  const { t, lang } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white border-b border-border shadow-sm sticky top-0 z-40" role="banner">
      {/* Top contact bar */}
      <div className="hidden lg:flex bg-secondary/60 border-b border-border px-4">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between py-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3" />
              0612-2525154
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3 h-3" />
              info@beltron.org
            </span>
          </div>
          <span>{t("lastUpdatedDate")}</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between" role="navigation" aria-label="Main Navigation">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" aria-label={t("siteFullName")}>
          {/* BELTRON Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow"
          >
            <img
              src="https://hercules-cdn.com/file_xiij45xLQaIy98McRcwUAHaj"
              alt="BELTRON Logo"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="hidden sm:block">
            <div className="font-bold text-primary text-lg leading-tight">{t("siteName")}</div>
            <div className="text-[10px] text-muted-foreground leading-tight max-w-[200px]">{t("siteFullName")}</div>
          </div>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-0.5 list-none" role="menubar">
          {navItems.map((item) => (
            <li key={item.key} className="relative" role="none"
              onMouseEnter={() => item.children && setActiveDropdown(item.key)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.href}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors cursor-pointer"
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

        {/* Right section: User menu + mobile toggle */}
        <div className="flex items-center gap-3">
          <UserMenu />
          <button
            className="lg:hidden p-2 rounded-md hover:bg-secondary transition-colors cursor-pointer"
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
            className="lg:hidden overflow-hidden border-t border-border bg-white"
          >
            <div className="px-4 py-3 space-y-1">
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
