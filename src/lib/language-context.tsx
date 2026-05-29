import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { translations } from "./beltron-data.ts";
import type { Language, TranslationKey } from "./beltron-data.ts";

type LanguageContextType = {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: TranslationKey) => string;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);

  const t = (key: TranslationKey): string => {
    const val = translations[lang][key] as string;
    return val.replace("{year}", new Date().getFullYear().toString());
  };

  const increaseFontSize = () => setFontSize((f) => Math.min(f + 2, 22));
  const decreaseFontSize = () => setFontSize((f) => Math.max(f - 2, 12));
  const toggleHighContrast = () => setHighContrast((h) => !h);

  // GIGW keyboard shortcuts (Alt + 1-5)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!e.altKey) return;
    switch (e.key) {
      case "1":
        e.preventDefault();
        window.location.href = "/";
        break;
      case "2":
        e.preventDefault();
        document.getElementById("main-content")?.focus();
        break;
      case "3":
        e.preventDefault();
        window.location.href = "/sitemap";
        break;
      case "4":
        e.preventDefault();
        document.querySelector<HTMLInputElement>("[data-search-input]")?.focus();
        break;
      case "5":
        e.preventDefault();
        window.location.href = "#contact";
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Update html lang attribute for screen readers
  useEffect(() => {
    const langMap: Record<Language, string> = { en: "en", hi: "hi", bho: "bho" };
    document.documentElement.lang = langMap[lang];
    document.documentElement.dir = "ltr";
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t, fontSize, increaseFontSize, decreaseFontSize, highContrast, toggleHighContrast }}
    >
      <div
        style={{ fontSize: `${fontSize}px` }}
        className={highContrast ? "high-contrast" : ""}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be inside LanguageProvider");
  return ctx;
}
