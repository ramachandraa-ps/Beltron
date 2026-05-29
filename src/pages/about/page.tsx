import { useLang } from "@/lib/language-context.tsx";
import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { Users, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";

const teamMembers = [
  {
    name: "Kaushal Kishore, I.A.S",
    nameHi: "कौशल किशोर, आई.ए.एस",
    role: "Managing Director",
    roleHi: "प्रबंध निदेशक",
    department: "BSEDC Ltd., Beltron Bhawan, Shastri Nagar, Patna",
    departmentHi: "बी.एस.ई.डी.सी लि., बेल्ट्रॉन भवन, शास्त्री नगर, पटना",
    image: "https://hercules-cdn.com/file_Ac70TmWd9P7ImxKal7l1j17u",
    isHead: true,
  },
  {
    name: "Rakesh Ranjan, I.A.S",
    nameHi: "राकेश रंजन, आई.ए.एस",
    role: "General Manager",
    roleHi: "महाप्रबंधक",
    department: "",
    departmentHi: "",
    image: "https://bsedc.bihar.gov.in/media/beltronemployees/0beb04e5-fd0d-4d47-b8eb-ef4276f01b9d.jpeg",
    isHead: false,
  },
  {
    name: "Shyam Bihari Singh",
    nameHi: "श्याम बिहारी सिंह",
    role: "General Manager (Project)",
    roleHi: "महाप्रबंधक (परियोजना)",
    department: "",
    departmentHi: "",
    image: "https://bsedc.bihar.gov.in/media/beltronemployees/shyambihari.jpg",
    isHead: false,
  },
  {
    name: "Jitendra Tripathi",
    nameHi: "जितेंद्र त्रिपाठी",
    role: "Manager (P.M.U)",
    roleHi: "प्रबंधक (पी.एम.यू)",
    department: "",
    departmentHi: "",
    image: "https://bsedc.bihar.gov.in/media/beltronemployees/Jitendra_Tripathi.jpg",
    isHead: false,
  },
  {
    name: "Mahendra Kumar",
    nameHi: "महेंद्र कुमार",
    role: "Manager (P.M.U)",
    roleHi: "प्रबंधक (पी.एम.यू)",
    department: "",
    departmentHi: "",
    image: "https://bsedc.bihar.gov.in/media/beltronemployees/Mahendra.jpeg",
    isHead: false,
  },
  {
    name: "Sanjivani",
    nameHi: "संजीवनी",
    role: "Manager (P.M.U)",
    roleHi: "प्रबंधक (पी.एम.यू)",
    department: "",
    departmentHi: "",
    image: "https://bsedc.bihar.gov.in/media/beltronemployees/sanjivni.jpg",
    isHead: false,
  },
  {
    name: "Alok Pratap Suman",
    nameHi: "आलोक प्रताप सुमन",
    role: "Manager (P.M.U)",
    roleHi: "प्रबंधक (पी.एम.यू)",
    department: "",
    departmentHi: "",
    image: "https://bsedc.bihar.gov.in/media/beltronemployees/AlokPratap.jpeg",
    isHead: false,
  },
  {
    name: "Vivek Nirala",
    nameHi: "विवेक निराला",
    role: "Project Lead",
    roleHi: "परियोजना प्रमुख",
    department: "",
    departmentHi: "",
    image: "https://hercules-cdn.com/file_4hdm0RzXs4Qu0cMDJKaj9J9B",
    isHead: false,
  },
  {
    name: "Zahid Lateef",
    nameHi: "ज़ाहिद लतीफ़",
    role: "Project Lead",
    roleHi: "परियोजना प्रमुख",
    department: "",
    departmentHi: "",
    image: "https://bsedc.bihar.gov.in/media/beltronemployees/ZahidLateef.jpg",
    isHead: false,
  },
  {
    name: "Kamlesh Kumar",
    nameHi: "कमलेश कुमार",
    role: "Account Officer",
    roleHi: "लेखा अधिकारी",
    department: "",
    departmentHi: "",
    image: "https://bsedc.bihar.gov.in/media/beltronemployees/CCI02012015_0004-0_5.jpg",
    isHead: false,
  },
  {
    name: "Sudhir Kumar",
    nameHi: "सुधीर कुमार",
    role: "Company Secretary",
    roleHi: "कंपनी सचिव",
    department: "",
    departmentHi: "",
    image: "https://bsedc.bihar.gov.in/media/beltronemployees/sudhirkmr.jpg",
    isHead: false,
  },
  {
    name: "Vijay Kumar Sinha",
    nameHi: "विजय कुमार सिन्हा",
    role: "Assistant Manager Legal",
    roleHi: "सहायक प्रबंधक विधि",
    department: "",
    departmentHi: "",
    image: "https://bsedc.bihar.gov.in/media/beltronemployees/no_pic_QYrn3Tr.jpg",
    isHead: false,
  },
];

export default function AboutPage() {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const isEn = lang === "en";

  const heading = isEn ? "About Us" : lang === "hi" ? "हमारे बारे में" : "हमनी के बारे में";
  const teamHeading = isEn ? "Our Team" : lang === "hi" ? "हमारी टीम" : "हमनी के टीम";
  const subheading = isEn
    ? "Meet the dedicated team driving Bihar's digital transformation through BELTRON"
    : lang === "hi"
      ? "बिहार के डिजिटल परिवर्तन को बेल्ट्रॉन के माध्यम से आगे बढ़ाने वाली समर्पित टीम से मिलें"
      : "बिहार के डिजिटल बदलाव के बेल्ट्रॉन के माध्यम से आगे बढ़ावे वाला समर्पित टीम से मिलीं";

  const aboutIntro = isEn
    ? "Bihar State Electronics Development Corporation Ltd. (BELTRON) is the nodal IT agency of the Government of Bihar, established to spearhead IT infrastructure development, digital services, and e-governance initiatives across the state. With over 40 years of dedicated service, BELTRON has been instrumental in digitizing government operations and bringing technology closer to citizens."
    : lang === "hi"
      ? "बिहार राज्य इलेक्ट्रॉनिक्स विकास निगम लि. (बेल्ट्रॉन) बिहार सरकार की नोडल आईटी एजेंसी है, जिसकी स्थापना राज्य भर में आईटी अवसंरचना विकास, डिजिटल सेवाओं और ई-गवर्नेंस पहलों का नेतृत्व करने के लिए की गई है। 40 से अधिक वर्षों की समर्पित सेवा के साथ, बेल्ट्रॉन ने सरकारी कार्यों को डिजिटल बनाने और नागरिकों तक प्रौद्योगिकी पहुँचाने में महत्वपूर्ण भूमिका निभाई है।"
      : "बिहार राज्य इलेक्ट्रॉनिक्स विकास निगम लि. (बेल्ट्रॉन) बिहार सरकार के नोडल आईटी एजेंसी हवे, जवन राज्य भर में आईटी अवसंरचना विकास, डिजिटल सेवा आ ई-गवर्नेंस पहल के अगुआई करे खातिर बनावल गइल बा। 40 साल से ज्यादा के समर्पित सेवा के साथ, बेल्ट्रॉन सरकारी काम के डिजिटल बनावे आ नागरिक तक तकनीक पहुँचावे में बहुत बड़ भूमिका निभइले बा।";

  const head = teamMembers.find((m) => m.isHead);
  const others = teamMembers.filter((m) => !m.isHead);

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
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          {heading}
        </h1>
        <p className="text-muted-foreground max-w-4xl leading-relaxed">
          {aboutIntro}
        </p>
        <div className="w-16 h-1 bg-primary rounded-full mt-4" />
      </motion.div>

      {/* Our Team section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {teamHeading}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          {teamHeading}
        </h2>
        <p className="text-muted-foreground text-sm mb-8">
          {subheading}
        </p>
      </motion.div>

      {/* MD Card (featured) */}
      {head && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mb-10"
        >
          <Card className="overflow-hidden border-primary/20 shadow-md">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
                <img
                  src={head.image}
                  alt={isEn ? head.name : head.nameHi}
                  className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-primary/20"
                />
                <div className="text-center sm:text-left">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/10 mb-2">
                    {isEn ? head.role : head.roleHi}
                  </Badge>
                  <h3 className="text-xl font-bold text-foreground">
                    {isEn ? head.name : head.nameHi}
                  </h3>
                  {head.department && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {isEn ? head.department : head.departmentHi}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Team grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {others.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 * i, ease: "easeOut" }}
          >
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex flex-col items-center text-center">
                <img
                  src={member.image}
                  alt={isEn ? member.name : member.nameHi}
                  className="w-20 h-20 rounded-full object-cover shadow-sm border-2 border-border mb-3"
                  loading="lazy"
                />
                <h3 className="font-semibold text-sm text-foreground mb-0.5">
                  {isEn ? member.name : member.nameHi}
                </h3>
                <p className="text-xs text-primary font-medium">
                  {isEn ? member.role : member.roleHi}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
