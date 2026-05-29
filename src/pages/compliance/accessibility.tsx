import { useLang } from "@/lib/language-context.tsx";
import { CheckCircle2, Keyboard, Eye, Monitor, Volume2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";

export default function AccessibilityPage() {
  const { lang } = useLang();

  const content = lang === "hi" ? {
    title: "अभिगम्यता विवरण",
    intro: "बिहार राज्य इलेक्ट्रॉनिक्स विकास निगम लि. (बेल्ट्रॉन) अपनी वेबसाइट को दिव्यांग व्यक्तियों सहित सभी उपयोगकर्ताओं के लिए सुलभ बनाने के लिए प्रतिबद्ध है।",
    standardTitle: "अनुपालन मानक",
    standardDesc: "यह वेबसाइट WCAG 2.1 स्तर AA के अनुरूप है तथा भारत सरकार की वेबसाइट दिशानिर्देश (GIGW) का अनुपालन करती है।",
    features: [
      { title: "कीबोर्ड नेविगेशन", desc: "सभी कार्यक्षमता केवल कीबोर्ड से उपलब्ध है। Tab, Shift+Tab, Enter, और Esc कुंजी का उपयोग करें।", icon: Keyboard },
      { title: "स्क्रीन रीडर संगतता", desc: "JAWS, NVDA, और VoiceOver के साथ संगत। ARIA लैंडमार्क और भूमिकाएं प्रदान की गई हैं।", icon: Volume2 },
      { title: "दृश्य अभिगम्यता", desc: "पाठ का आकार समायोजित करें, उच्च कंट्रास्ट मोड सक्षम करें, और फोकस संकेतक का उपयोग करें।", icon: Eye },
      { title: "प्रदर्शन अनुकूलन", desc: "कम बैंडविड्थ वाले मोबाइल उपकरणों पर भी सुगमता से कार्य करता है।", icon: Monitor },
    ],
    shortcutsTitle: "कीबोर्ड शॉर्टकट",
    shortcuts: [
      { key: "Alt + 1", action: "होमपेज" },
      { key: "Alt + 2", action: "मुख्य सामग्री पर जाएं" },
      { key: "Alt + 3", action: "साइटमैप" },
      { key: "Alt + 4", action: "खोज" },
      { key: "Alt + 5", action: "संपर्क" },
    ],
    toolsTitle: "अभिगम्यता उपकरण",
    toolsDesc: "शीर्ष पट्टी में अभिगम्यता नियंत्रण उपलब्ध हैं:",
    tools: [
      "भाषा परिवर्तन (अंग्रेजी / हिंदी)",
      "पाठ का आकार बढ़ाएं / घटाएं (A+ / A-)",
      "उच्च कंट्रास्ट मोड",
      "स्क्रीन रीडर सहायता",
    ],
    feedbackTitle: "प्रतिक्रिया",
    feedbackDesc: "यदि आपको किसी अभिगम्यता समस्या का सामना होता है, तो कृपया हमसे संपर्क करें:",
  } : {
    title: "Accessibility Statement",
    intro: "Bihar State Electronics Development Corporation Ltd. (BELTRON) is committed to making its website accessible to all users, including persons with disabilities.",
    standardTitle: "Compliance Standards",
    standardDesc: "This website conforms to WCAG 2.1 Level AA and complies with the Guidelines for Indian Government Websites (GIGW) published by the National Informatics Centre.",
    features: [
      { title: "Keyboard Navigation", desc: "All functionality is accessible via keyboard alone. Use Tab, Shift+Tab, Enter, and Esc keys to navigate.", icon: Keyboard },
      { title: "Screen Reader Compatible", desc: "Fully compatible with JAWS, NVDA, and VoiceOver. ARIA landmarks, roles, and live regions are implemented throughout.", icon: Volume2 },
      { title: "Visual Accessibility", desc: "Adjustable text size, high-contrast mode, and visible focus indicators for all interactive elements.", icon: Eye },
      { title: "Performance Optimized", desc: "Lightweight, responsive design that works on low-bandwidth mobile connections.", icon: Monitor },
    ],
    shortcutsTitle: "Keyboard Shortcuts",
    shortcuts: [
      { key: "Alt + 1", action: "Homepage" },
      { key: "Alt + 2", action: "Skip to Main Content" },
      { key: "Alt + 3", action: "Sitemap" },
      { key: "Alt + 4", action: "Search" },
      { key: "Alt + 5", action: "Contact" },
    ],
    toolsTitle: "Accessibility Tools",
    toolsDesc: "An accessibility toolbar is available at the top of every page providing:",
    tools: [
      "Language toggle (English / Hindi)",
      "Text size increase / decrease (A+ / A-)",
      "High-contrast mode",
      "Screen reader access link",
    ],
    feedbackTitle: "Feedback",
    feedbackDesc: "If you encounter any accessibility issues, please contact us at:",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{content.title}</h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{content.intro}</p>
      </div>

      {/* Compliance standard */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            {content.standardTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{content.standardDesc}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {["WCAG 2.1 AA", "GIGW 3.0", "ISO 27001", "Section 508"].map((badge) => (
              <span key={badge} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                {badge}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {content.features.map((f) => (
          <Card key={f.title}>
            <CardContent className="flex gap-3 pt-5">
              <div className="p-2 rounded-lg bg-primary/10 h-fit">
                <f.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{f.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Keyboard shortcuts */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{content.shortcutsTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {content.shortcuts.map((s) => (
              <div key={s.key} className="flex items-center gap-3 text-sm">
                <kbd className="text-xs font-mono bg-secondary px-2 py-0.5 rounded border border-border min-w-[80px] text-center">
                  {s.key}
                </kbd>
                <span className="text-muted-foreground">{s.action}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accessibility tools */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{content.toolsTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">{content.toolsDesc}</p>
          <ul className="space-y-1.5">
            {content.tools.map((tool) => (
              <li key={tool} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                {tool}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Feedback */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{content.feedbackTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">{content.feedbackDesc}</p>
          <div className="text-sm space-y-1">
            <p><strong>Email:</strong> accessibility@beltron.org</p>
            <p><strong>Phone:</strong> 0612-2525154 (Ext: 230)</p>
            <p><strong>Address:</strong> BELTRON Bhawan, Shastri Nagar, Patna – 800 023</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
