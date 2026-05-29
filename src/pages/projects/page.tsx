import { useLang } from "@/lib/language-context.tsx";
import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { Network, Globe, CheckCircle2, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";

const projects = [
  {
    id: "seclan2",
    title: "Bihar State Secretariat LAN 2.0 (SecLAN 2.0)",
    titleHi: "बिहार राज्य सचिवालय LAN 2.0 (SecLAN 2.0)",
    titleBho: "बिहार राज्य सचिवालय LAN 2.0 (SecLAN 2.0)",
    description:
      "A next-generation Local Area Network infrastructure for the Bihar State Secretariat, providing high-speed, secure, and reliable connectivity to all secretariat departments and offices. SecLAN 2.0 ensures seamless intra-government communication, data sharing, and e-governance operations within the secretariat complex.",
    descriptionHi:
      "बिहार राज्य सचिवालय के लिए अगली पीढ़ी का लोकल एरिया नेटवर्क अवसंरचना, जो सचिवालय के सभी विभागों और कार्यालयों को उच्च-गति, सुरक्षित और विश्वसनीय कनेक्टिविटी प्रदान करता है। SecLAN 2.0 सचिवालय परिसर में निर्बाध अंतर-सरकारी संचार, डेटा साझाकरण और ई-गवर्नेंस संचालन सुनिश्चित करता है।",
    descriptionBho:
      "बिहार राज्य सचिवालय खातिर अगिला पीढ़ी के लोकल एरिया नेटवर्क, जवन सचिवालय के सगरी विभाग आ कार्यालय के तेज, सुरक्षित आ भरोसेमंद कनेक्टिविटी देला। SecLAN 2.0 सचिवालय परिसर में बिना रुकावट सरकारी संवाद, डेटा साझा आ ई-गवर्नेंस के काम सुनिश्चित करेला।",
    icon: Network,
    status: "Active",
    image: "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    highlights: [
      { en: "High-speed connectivity across all secretariat floors", hi: "सचिवालय की सभी मंजिलों पर उच्च-गति कनेक्टिविटी", bho: "सचिवालय के सगरी मंजिल पर तेज कनेक्टिविटी" },
      { en: "Secure network with multi-layer firewall protection", hi: "बहु-स्तरीय फ़ायरवॉल सुरक्षा के साथ सुरक्षित नेटवर्क", bho: "बहु-स्तरीय फ़ायरवॉल सुरक्षा वाला सुरक्षित नेटवर्क" },
      { en: "Supports e-governance & digital office operations", hi: "ई-गवर्नेंस और डिजिटल कार्यालय संचालन का समर्थन", bho: "ई-गवर्नेंस आ डिजिटल ऑफिस संचालन के सपोर्ट" },
      { en: "Redundant architecture for 99.9% uptime", hi: "99.9% अपटाइम के लिए रिडंडेंट आर्किटेक्चर", bho: "99.9% अपटाइम खातिर रिडंडेंट आर्किटेक्चर" },
    ],
  },
  {
    id: "bswan2",
    title: "Bihar State Wide Area Network 2.0 (BSWAN)",
    titleHi: "बिहार राज्य वाइड एरिया नेटवर्क 2.0 (BSWAN)",
    titleBho: "बिहार राज्य वाइड एरिया नेटवर्क 2.0 (BSWAN)",
    description:
      "A state-wide high-bandwidth network connecting all 38 district headquarters, sub-divisions, and block offices to the State Data Centre. BSWAN 2.0 serves as the backbone of Bihar's e-governance ecosystem, enabling video conferencing, centralized application access, and secure government communications across the entire state.",
    descriptionHi:
      "एक राज्यव्यापी उच्च-बैंडविड्थ नेटवर्क जो सभी 38 जिला मुख्यालयों, उप-विभागों और ब्लॉक कार्यालयों को राज्य डेटा केंद्र से जोड़ता है। BSWAN 2.0 बिहार के ई-गवर्नेंस पारिस्थितिकी तंत्र की रीढ़ के रूप में कार्य करता है, जो पूरे राज्य में वीडियो कॉन्फ्रेंसिंग, केंद्रीकृत एप्लिकेशन एक्सेस और सुरक्षित सरकारी संचार को सक्षम बनाता है।",
    descriptionBho:
      "एगो राज्यव्यापी तेज बैंडविड्थ नेटवर्क जवन सगरी 38 जिला मुख्यालय, उप-विभाग आ ब्लॉक कार्यालय के राज्य डेटा केंद्र से जोड़ेला। BSWAN 2.0 बिहार के ई-गवर्नेंस के रीढ़ हवे, जवन पूरा राज्य में वीडियो कॉन्फ्रेंसिंग, केंद्रीकृत एप्लिकेशन एक्सेस आ सुरक्षित सरकारी संवाद के मुमकिन बनावेला।",
    icon: Globe,
    status: "Active",
    image: "https://images.unsplash.com/photo-1695384539284-683ca3b2b602?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    highlights: [
      { en: "Connects all 38 districts to State Data Centre", hi: "सभी 38 जिलों को राज्य डेटा केंद्र से जोड़ता है", bho: "सगरी 38 जिला के राज्य डेटा केंद्र से जोड़ेला" },
      { en: "Video conferencing & centralized application access", hi: "वीडियो कॉन्फ्रेंसिंग और केंद्रीकृत एप्लिकेशन एक्सेस", bho: "वीडियो कॉन्फ्रेंसिंग आ केंद्रीकृत एप्लिकेशन एक्सेस" },
      { en: "High-bandwidth fiber optic backbone", hi: "उच्च-बैंडविड्थ फाइबर ऑप्टिक बैकबोन", bho: "तेज बैंडविड्थ फाइबर ऑप्टिक बैकबोन" },
      { en: "Enables e-governance services across all blocks", hi: "सभी ब्लॉकों में ई-गवर्नेंस सेवाएं सक्षम करता है", bho: "सगरी ब्लॉक में ई-गवर्नेंस सेवा चालू करेला" },
    ],
  },
];

export default function ProjectsPage() {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getText = (item: { en: string; hi: string; bho: string }) => {
    if (lang === "en") return item.en;
    if (lang === "hi") return item.hi;
    return item.bho;
  };

  const heading = lang === "en"
    ? "Projects"
    : lang === "hi"
      ? "परियोजनाएं"
      : "परियोजना";

  const subheading = lang === "en"
    ? "Bihar State Electronics Development Corporation Ltd. (BELTRON) has excelled in achieving great success on numerous projects"
    : lang === "hi"
      ? "बिहार राज्य इलेक्ट्रॉनिक्स विकास निगम लि. (बेल्ट्रॉन) ने अनेक परियोजनाओं में उत्कृष्ट सफलता प्राप्त की है"
      : "बिहार राज्य इलेक्ट्रॉनिक्स विकास निगम लि. (बेल्ट्रॉन) अनेक परियोजना में बहुत बढ़िया सफलता हासिल कइले बा";

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="w-5 h-5 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {heading}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          {heading}
        </h1>
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          {subheading}
        </p>
        <div className="w-16 h-1 bg-primary rounded-full mt-4" />
      </motion.div>

      {/* Project cards */}
      <div className="space-y-8">
        {projects.map((project, i) => {
          const Icon = project.icon;
          const title = lang === "en" ? project.title : lang === "hi" ? project.titleHi : project.titleBho;
          const description = lang === "en" ? project.description : lang === "hi" ? project.descriptionHi : project.descriptionBho;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i, ease: "easeOut" }}
            >
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  {/* Image */}
                  <div className="lg:col-span-2 h-48 lg:h-auto">
                    <img
                      src={project.image}
                      alt={title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-3 p-6 flex flex-col">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {project.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground leading-tight">
                        {title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-1">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {description}
                      </p>
                      <ul className="space-y-2">
                        {project.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                            <span>{getText(h)}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
