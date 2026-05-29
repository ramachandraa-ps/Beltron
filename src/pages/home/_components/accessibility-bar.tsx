import { useLang } from "@/lib/language-context.tsx";
import { Type, Sun, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function AccessibilityBar() {
  const { t, increaseFontSize, decreaseFontSize, highContrast, toggleHighContrast, lang, setLang } = useLang();

  return (
    <div
      className="bg-[oklch(0.22_0.06_250)] text-[oklch(0.9_0.01_240)] text-xs py-1.5 px-4"
      role="toolbar"
      aria-label="Accessibility Tools"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        {/* Skip link – visually hidden, focusable */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-semibold z-50"
        >
          {t("skipToContent")}
        </a>

        {/* Left: National portals */}
        <div className="flex items-center gap-3 text-[oklch(0.75_0.03_240)]">
          <span className="font-semibold text-[oklch(0.85_0.05_250)]">{t("govtOfBihar")}</span>
          <span>|</span>
          <a href="https://digitalindia.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            {t("digitalIndia")}
          </a>
          <span>|</span>
          <a href="https://www.makeinindia.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            {t("makeInIndia")}
          </a>
        </div>

        {/* Right: Accessibility controls */}
        <div className="flex items-center gap-1">
          {/* Language selector */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-0.5 rounded border transition-colors font-medium cursor-pointer ${
                lang === "en"
                  ? "bg-[oklch(0.4_0.08_250)] border-[oklch(0.5_0.08_250)] text-white"
                  : "border-[oklch(0.4_0.06_250)] hover:bg-[oklch(0.3_0.08_250)]"
              }`}
              aria-label="Switch to English"
              aria-pressed={lang === "en"}
            >
              EN
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`px-2 py-0.5 rounded border transition-colors font-medium cursor-pointer ${
                lang === "hi"
                  ? "bg-[oklch(0.4_0.08_250)] border-[oklch(0.5_0.08_250)] text-white"
                  : "border-[oklch(0.4_0.06_250)] hover:bg-[oklch(0.3_0.08_250)]"
              }`}
              aria-label="हिंदी में बदलें"
              aria-pressed={lang === "hi"}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLang("bho")}
              className={`px-2 py-0.5 rounded border transition-colors font-medium cursor-pointer ${
                lang === "bho"
                  ? "bg-[oklch(0.4_0.08_250)] border-[oklch(0.5_0.08_250)] text-white"
                  : "border-[oklch(0.4_0.06_250)] hover:bg-[oklch(0.3_0.08_250)]"
              }`}
              aria-label="भोजपुरी में बदलीं"
              aria-pressed={lang === "bho"}
            >
              भोजपुरी
            </button>
          </div>

          <span className="mx-1 text-[oklch(0.4_0.06_250)]">|</span>

          <button
            onClick={decreaseFontSize}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-[oklch(0.3_0.08_250)] transition-colors cursor-pointer"
            aria-label={t("decreaseText")}
            title={t("decreaseText")}
          >
            <Type className="w-3.5 h-3.5" />
            <span className="text-[9px] leading-none">-</span>
          </button>

          <button
            onClick={increaseFontSize}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-[oklch(0.3_0.08_250)] transition-colors cursor-pointer"
            aria-label={t("increaseText")}
            title={t("increaseText")}
          >
            <Type className="w-4 h-4" />
            <span className="text-[9px] leading-none">+</span>
          </button>

          <button
            onClick={toggleHighContrast}
            className={`w-7 h-7 flex items-center justify-center rounded transition-colors cursor-pointer ${
              highContrast ? "bg-yellow-400 text-black" : "hover:bg-[oklch(0.3_0.08_250)]"
            }`}
            aria-label={t("highContrast")}
            title={t("highContrast")}
            aria-pressed={highContrast}
          >
            <Sun className="w-3.5 h-3.5" />
          </button>

          <Link
            to="/accessibility"
            className="px-2 py-0.5 rounded hover:bg-[oklch(0.3_0.08_250)] transition-colors cursor-pointer flex items-center gap-1"
            aria-label={t("screenReader")}
            title={t("screenReader")}
          >
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">{t("screenReader")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
