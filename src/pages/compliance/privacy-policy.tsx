import { useLang } from "@/lib/language-context.tsx";

export default function PrivacyPolicyPage() {
  const { lang } = useLang();

  if (lang === "hi") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 prose prose-sm max-w-none">
        <h1 className="text-2xl font-bold mb-6">गोपनीयता नीति</h1>

        <p className="text-muted-foreground text-sm leading-relaxed">
          बिहार राज्य इलेक्ट्रॉनिक्स विकास निगम लि. (बेल्ट्रॉन) आपकी गोपनीयता का सम्मान करता है।
          यह गोपनीयता नीति बताती है कि इस वेबसाइट पर एकत्रित जानकारी का उपयोग कैसे किया जाता है।
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">सूचना का संग्रहण</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          यह वेबसाइट स्वचालित रूप से कुछ जानकारी एकत्र करती है जैसे IP पता, ब्राउज़र प्रकार, 
          ऑपरेटिंग सिस्टम, और पहुंच का समय। यह जानकारी केवल सांख्यिकीय विश्लेषण के लिए है।
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">व्यक्तिगत जानकारी</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          हम केवल वही व्यक्तिगत जानकारी एकत्र करते हैं जो आप स्वेच्छा से प्रदान करते हैं, 
          जैसे संपर्क फॉर्म, पंजीकरण, या सेवा अनुरोध के माध्यम से। इस जानकारी का उपयोग 
          केवल अनुरोधित सेवा प्रदान करने के लिए किया जाता है।
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">सुरक्षा</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          हम आपकी जानकारी की सुरक्षा के लिए SSL एन्क्रिप्शन और अन्य उद्योग-मानक सुरक्षा 
          उपायों का उपयोग करते हैं। ISO 27001 प्रमाणित डेटा सेंटर में डेटा संग्रहित किया जाता है।
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">कुकीज़</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          यह वेबसाइट आपके ब्राउज़िंग अनुभव को बेहतर बनाने के लिए कुकीज़ का उपयोग कर सकती है। 
          आप अपने ब्राउज़र की सेटिंग्स में कुकीज़ को अक्षम कर सकते हैं।
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">संपर्क</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          गोपनीयता संबंधी प्रश्नों के लिए कृपया privacy@beltron.org पर संपर्क करें।
        </p>

        <p className="text-xs text-muted-foreground mt-8 border-t border-border pt-4">
          अंतिम अपडेट: 28 मई, 2026
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 prose prose-sm max-w-none">
      <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-muted-foreground text-sm leading-relaxed">
        Bihar State Electronics Development Corporation Ltd. (BELTRON) respects your privacy. This 
        Privacy Policy explains how information collected on this website is used and safeguarded.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Information Collection</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        This website automatically collects certain information such as IP address, browser type, 
        operating system, and access time. This information is used solely for statistical analysis 
        and website performance improvement.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Personal Information</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        We collect personal information only when voluntarily provided by you through contact forms, 
        registration, or service requests. Such information is used exclusively to deliver the 
        requested service and is not shared with third parties without your consent.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Data Security</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        We implement SSL encryption and industry-standard security measures to protect your data. 
        All data is stored in ISO 27001 certified data centres operated by the Government of Bihar.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Cookies</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        This website may use cookies to enhance your browsing experience. You can disable cookies 
        through your browser settings. Disabling cookies may limit certain features.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Third-Party Links</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Links to external websites are provided for convenience. BELTRON is not responsible for 
        the privacy practices of third-party websites.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Contact</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        For privacy-related queries, please contact us at privacy@beltron.org or call 0612-2525154.
      </p>

      <p className="text-xs text-muted-foreground mt-8 border-t border-border pt-4">
        Last Updated: 28 May, 2026
      </p>
    </div>
  );
}
