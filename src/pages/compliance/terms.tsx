import { useLang } from "@/lib/language-context.tsx";

export default function TermsPage() {
  const { lang } = useLang();

  if (lang === "hi") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 prose prose-sm max-w-none">
        <h1 className="text-2xl font-bold mb-6">उपयोग की शर्तें</h1>

        <p className="text-muted-foreground text-sm leading-relaxed">
          इस वेबसाइट का उपयोग करके, आप निम्नलिखित नियमों और शर्तों से बाध्य होना स्वीकार करते हैं।
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">सामान्य शर्तें</h2>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
          <li>इस वेबसाइट पर उपलब्ध सामग्री केवल सूचनात्मक उद्देश्यों के लिए है।</li>
          <li>बेल्ट्रॉन बिना पूर्व सूचना के किसी भी समय सामग्री को बदलने का अधिकार रखता है।</li>
          <li>उपयोगकर्ता इस वेबसाइट का उपयोग केवल वैध उद्देश्यों के लिए करेंगे।</li>
          <li>किसी भी अनधिकृत उपयोग से कानूनी कार्रवाई हो सकती है।</li>
        </ul>

        <h2 className="text-lg font-semibold mt-6 mb-3">बौद्धिक संपदा</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          इस वेबसाइट पर सभी सामग्री, लोगो और डिज़ाइन बेल्ट्रॉन / बिहार सरकार की संपत्ति है। 
          बिना लिखित अनुमति के पुनर्प्रकाशन या वितरण प्रतिबंधित है।
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">दायित्व की सीमा</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          बेल्ट्रॉन इस वेबसाइट के उपयोग से होने वाली किसी भी प्रत्यक्ष या अप्रत्यक्ष हानि 
          के लिए उत्तरदायी नहीं होगा।
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">शासी कानून</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          ये शर्तें भारत के कानून के अनुसार शासित होंगी। किसी भी विवाद का क्षेत्राधिकार 
          पटना, बिहार के न्यायालयों में होगा।
        </p>

        <p className="text-xs text-muted-foreground mt-8 border-t border-border pt-4">
          अंतिम अपडेट: 28 मई, 2026
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 prose prose-sm max-w-none">
      <h1 className="text-2xl font-bold mb-6">Terms of Use</h1>

      <p className="text-muted-foreground text-sm leading-relaxed">
        By using this website, you agree to be bound by the following terms and conditions. If you 
        do not agree, please refrain from using this website.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">General Conditions</h2>
      <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
        <li>Content on this website is provided for informational purposes only.</li>
        <li>BELTRON reserves the right to modify content at any time without prior notice.</li>
        <li>Users shall use this website for lawful purposes only.</li>
        <li>Any unauthorized use may result in legal action under applicable Indian laws.</li>
        <li>Downloaded documents are for personal/official use only and shall not be redistributed commercially.</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-3">Intellectual Property</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        All content, logos, and design on this website are the property of BELTRON / Government of Bihar. 
        Reproduction, redistribution, or republication without written permission is prohibited.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Limitation of Liability</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        BELTRON shall not be held liable for any direct, indirect, incidental, or consequential 
        damages arising from the use of this website or any linked external sites.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Governing Law</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        These terms are governed by the laws of India. Any disputes shall be subject to the 
        exclusive jurisdiction of the courts in Patna, Bihar.
      </p>

      <p className="text-xs text-muted-foreground mt-8 border-t border-border pt-4">
        Last Updated: 28 May, 2026
      </p>
    </div>
  );
}
