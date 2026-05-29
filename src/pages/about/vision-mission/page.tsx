import { useLang } from "@/lib/language-context.tsx";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Eye, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card.tsx";

const content = {
  en: {
    pageTitle: "Vision & Mission",
    visionLabel: "Vision",
    missionLabel: "Mission",
    vision:
      "e-Development of Bihar as the engine for transition into a developed State and an empowered society.",
    missionIntro1:
      "Bihar State Electronics Development Corporation Ltd. (BSEDC Ltd.), is a Govt. of Bihar undertaking engaged in businesses related to Electronics, Computer goods and IT services. The corporation caters to the technological needs of the government and carries out IT project conceptualization and implementation for the State Government Departments and agencies.",
    missionIntro2:
      "BSEDC believes that an opportunity for delivering solutions and IT services is beyond the routine delivery of IT services and solutions, understand vision, mission of the organization, assess the needs of the stakeholders, work towards measurable objectives and deliver value to the beneficiaries by delivering superior value through its services and solutions.",
    missionPoints: [
      "To Provide Excellent Electronic, IT Goods, IT Services to the Government of Bihar.",
      "To help its clients adapt themselves to the modern management techniques.",
      "To create a robust IT eco-system for enhancing competitiveness and productivity of the key economic sectors affecting the lives of the majority of the population of the State.",
      "To disseminate the IT and ITeS activities across the State so that rural population is equally benefited.",
      "To significantly enhance the availability of skilled manpower in the Government sector.",
      "To provide seamless and reliable citizen-centric services and information for the public, thereby enhancing efficiency, transparency and accountability of Government.",
    ],
  },
  hi: {
    pageTitle: "विज़न और मिशन",
    visionLabel: "विज़न",
    missionLabel: "मिशन",
    vision:
      "बिहार का ई-विकास एक विकसित राज्य और सशक्त समाज में परिवर्तन के इंजन के रूप में।",
    missionIntro1:
      "बिहार राज्य इलेक्ट्रॉनिक्स विकास निगम लि. (बी.एस.ई.डी.सी. लि.), बिहार सरकार का उपक्रम है जो इलेक्ट्रॉनिक्स, कंप्यूटर सामान और आईटी सेवाओं से संबंधित व्यवसायों में संलग्न है। यह निगम सरकार की तकनीकी आवश्यकताओं की पूर्ति करता है और राज्य सरकार के विभागों और एजेंसियों के लिए आईटी परियोजनाओं की अवधारणा और कार्यान्वयन करता है।",
    missionIntro2:
      "बी.एस.ई.डी.सी. का मानना है कि समाधान और आईटी सेवाएं प्रदान करने का अवसर आईटी सेवाओं और समाधानों की नियमित डिलीवरी से परे है, संगठन के विज़न, मिशन को समझना, हितधारकों की आवश्यकताओं का आकलन करना, मापनीय उद्देश्यों की ओर कार्य करना और अपनी सेवाओं और समाधानों के माध्यम से बेहतर मूल्य प्रदान करके लाभार्थियों को मूल्य प्रदान करना है।",
    missionPoints: [
      "बिहार सरकार को उत्कृष्ट इलेक्ट्रॉनिक, आईटी सामान, आईटी सेवाएं प्रदान करना।",
      "अपने ग्राहकों को आधुनिक प्रबंधन तकनीकों के अनुकूल बनाने में सहायता करना।",
      "राज्य की अधिकांश जनसंख्या के जीवन को प्रभावित करने वाले प्रमुख आर्थिक क्षेत्रों की प्रतिस्पर्धात्मकता और उत्पादकता बढ़ाने के लिए एक मजबूत आईटी पारिस्थितिकी तंत्र बनाना।",
      "राज्य भर में आईटी और आईटीईएस गतिविधियों का प्रसार करना ताकि ग्रामीण जनसंख्या को समान रूप से लाभ मिले।",
      "सरकारी क्षेत्र में कुशल जनशक्ति की उपलब्धता में उल्लेखनीय वृद्धि करना।",
      "जनता के लिए निर्बाध और विश्वसनीय नागरिक-केंद्रित सेवाएं और सूचना प्रदान करना, जिससे सरकार की दक्षता, पारदर्शिता और जवाबदेही बढ़े।",
    ],
  },
  bho: {
    pageTitle: "विज़न आ मिशन",
    visionLabel: "विज़न",
    missionLabel: "मिशन",
    vision:
      "बिहार के ई-विकास एगो विकसित राज्य आ सशक्त समाज में बदलाव के इंजन के रूप में।",
    missionIntro1:
      "बिहार राज्य इलेक्ट्रॉनिक्स विकास निगम लि. (बी.एस.ई.डी.सी. लि.), बिहार सरकार के उपक्रम हवे जवन इलेक्ट्रॉनिक्स, कंप्यूटर सामान आ आईटी सेवा से जुड़ल व्यवसाय में लागल बा। ई निगम सरकार के तकनीकी जरूरत पूरा करेला आ राज्य सरकार के विभाग आ एजेंसी खातिर आईटी परियोजना के अवधारणा आ कार्यान्वयन करेला।",
    missionIntro2:
      "बी.एस.ई.डी.सी. के मानना बा कि समाधान आ आईटी सेवा देवे के अवसर आईटी सेवा आ समाधान के नियमित डिलीवरी से परे बा, संगठन के विज़न, मिशन के समझल, हितधारक के जरूरत के आकलन कइल, मापनीय उद्देश्य के ओर काम कइल आ अपना सेवा आ समाधान से बेहतर मूल्य दे के लाभार्थी के मूल्य देवल बा।",
    missionPoints: [
      "बिहार सरकार के उत्कृष्ट इलेक्ट्रॉनिक, आईटी सामान, आईटी सेवा देवल।",
      "अपना ग्राहक के आधुनिक प्रबंधन तकनीक में ढालल में मदद कइल।",
      "राज्य के अधिकांश जनसंख्या के जीवन के प्रभावित करे वाला प्रमुख आर्थिक क्षेत्र के प्रतिस्पर्धात्मकता आ उत्पादकता बढ़ावे खातिर एगो मजबूत आईटी पारिस्थितिकी तंत्र बनावल।",
      "राज्य भर में आईटी आ आईटीईएस गतिविधि के प्रसार कइल ताकि ग्रामीण जनसंख्या के बराबर लाभ मिले।",
      "सरकारी क्षेत्र में कुशल जनशक्ति के उपलब्धता में उल्लेखनीय वृद्धि कइल।",
      "जनता खातिर निर्बाध आ विश्वसनीय नागरिक-केंद्रित सेवा आ सूचना देवल, जेकरा से सरकार के दक्षता, पारदर्शिता आ जवाबदेही बढ़े।",
    ],
  },
};

export default function VisionMissionPage() {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const t = content[lang];

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-10"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {t.pageTitle}
        </h1>
        <div className="w-16 h-1 bg-primary rounded-full" />
      </motion.div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="mb-10"
      >
        <Card className="border-primary/20 shadow-md overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                {t.visionLabel}
              </h2>
            </div>
            <p className="text-lg text-foreground font-medium leading-relaxed pl-15">
              {t.vision}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      >
        <Card className="border-primary/20 shadow-md overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                {t.missionLabel}
              </h2>
            </div>

            <div className="space-y-4 pl-15">
              <p className="text-muted-foreground leading-relaxed">
                {t.missionIntro1}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t.missionIntro2}
              </p>

              <ul className="space-y-3 mt-4">
                {t.missionPoints.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: 0.5 + i * 0.1,
                      ease: "easeOut",
                    }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="text-foreground leading-relaxed">
                      {point}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
