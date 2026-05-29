import { useLang } from "@/lib/language-context.tsx";

export default function DisclaimerPage() {
  const { lang } = useLang();

  if (lang === "hi") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 prose prose-sm max-w-none">
        <h1 className="text-2xl font-bold mb-6">अस्वीकरण</h1>

        <p className="text-muted-foreground text-sm leading-relaxed">
          यह वेबसाइट बिहार राज्य इलेक्ट्रॉनिक्स विकास निगम लि. (बेल्ट्रॉन) द्वारा संचालित है।
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">सूचना की सटीकता</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          इस वेबसाइट पर उपलब्ध जानकारी को यथासंभव सटीक और अद्यतित रखने का प्रयास किया गया है। 
          हालांकि, बेल्ट्रॉन इस जानकारी की पूर्णता, सटीकता, विश्वसनीयता, उपयुक्तता या 
          उपलब्धता के बारे में कोई गारंटी नहीं देता है।
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">बाह्य लिंक</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          इस वेबसाइट में अन्य वेबसाइटों के लिंक हो सकते हैं जो बेल्ट्रॉन के नियंत्रण में नहीं हैं। 
          हम इन बाहरी साइटों की सामग्री के लिए जिम्मेदार नहीं हैं।
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">सेवा उपलब्धता</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          बेल्ट्रॉन इस वेबसाइट की निर्बाध या त्रुटि-मुक्त उपलब्धता की गारंटी नहीं देता। 
          रखरखाव या तकनीकी कारणों से सेवाएं अस्थायी रूप से अनुपलब्ध हो सकती हैं।
        </p>

        <p className="text-xs text-muted-foreground mt-8 border-t border-border pt-4">
          अंतिम अपडेट: 28 मई, 2026
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 prose prose-sm max-w-none">
      <h1 className="text-2xl font-bold mb-6">Disclaimer</h1>

      <p className="text-muted-foreground text-sm leading-relaxed">
        This website is maintained by Bihar State Electronics Development Corporation Ltd. (BELTRON), 
        a Government of Bihar undertaking.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Accuracy of Information</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        While every effort has been made to ensure the accuracy and currency of information on this 
        website, BELTRON makes no guarantees regarding the completeness, accuracy, reliability, 
        suitability, or availability of the information, products, services, or related graphics.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">External Links</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        This website may contain links to external websites that are not under BELTRON{"'"}s control. 
        The inclusion of any link does not imply endorsement. BELTRON is not responsible for the 
        content or privacy practices of linked sites.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">No Warranty</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        This website and its content are provided on an {'"'}as is{'"'} basis without warranty of any kind, 
        either express or implied. BELTRON does not warrant that the website will be uninterrupted 
        or error-free.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Virus Protection</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        BELTRON does not guarantee that files available for download are free of viruses or other 
        harmful components. Users are responsible for implementing sufficient protection.
      </p>

      <p className="text-xs text-muted-foreground mt-8 border-t border-border pt-4">
        Last Updated: 28 May, 2026
      </p>
    </div>
  );
}
