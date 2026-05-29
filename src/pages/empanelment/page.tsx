import { useState } from "react";
import { useLang } from "@/lib/language-context.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { toast } from "sonner";
import {
  Building2,
  CheckCircle2,
  ClipboardList,
  FileText,
  Mail,
  MapPin,
  Phone,
  Send,
  User,
} from "lucide-react";
import AnimatedPage from "@/components/animated-page.tsx";

type ServiceCategory =
  | "it_infrastructure"
  | "software_development"
  | "networking"
  | "cloud_services"
  | "hardware_supply"
  | "consulting"
  | "data_center"
  | "cybersecurity"
  | "training"
  | "other";

const SERVICE_CATEGORIES: { value: ServiceCategory; label: string; labelHi: string }[] = [
  { value: "it_infrastructure", label: "IT Infrastructure", labelHi: "आईटी अवसंरचना" },
  { value: "software_development", label: "Software Development", labelHi: "सॉफ्टवेयर विकास" },
  { value: "networking", label: "Networking & Communication", labelHi: "नेटवर्किंग एवं संचार" },
  { value: "cloud_services", label: "Cloud Services", labelHi: "क्लाउड सेवाएं" },
  { value: "hardware_supply", label: "Hardware Supply", labelHi: "हार्डवेयर आपूर्ति" },
  { value: "consulting", label: "IT Consulting", labelHi: "आईटी परामर्श" },
  { value: "data_center", label: "Data Center Operations", labelHi: "डेटा सेंटर संचालन" },
  { value: "cybersecurity", label: "Cybersecurity", labelHi: "साइबर सुरक्षा" },
  { value: "training", label: "IT Training & Capacity Building", labelHi: "आईटी प्रशिक्षण" },
  { value: "other", label: "Other", labelHi: "अन्य" },
];

const COMPANY_TYPES = [
  { value: "proprietorship", label: "Proprietorship", labelHi: "एकल स्वामित्व" },
  { value: "partnership", label: "Partnership", labelHi: "साझेदारी" },
  { value: "private_limited", label: "Private Limited", labelHi: "प्राइवेट लिमिटेड" },
  { value: "public_limited", label: "Public Limited", labelHi: "पब्लिक लिमिटेड" },
  { value: "llp", label: "LLP", labelHi: "एलएलपी" },
  { value: "government", label: "Government PSU", labelHi: "सरकारी PSU" },
];

const TURNOVER_RANGES = [
  { value: "below_1cr", label: "Below ₹1 Crore", labelHi: "₹1 करोड़ से कम" },
  { value: "1_5cr", label: "₹1 - 5 Crore", labelHi: "₹1 - 5 करोड़" },
  { value: "5_25cr", label: "₹5 - 25 Crore", labelHi: "₹5 - 25 करोड़" },
  { value: "25_100cr", label: "₹25 - 100 Crore", labelHi: "₹25 - 100 करोड़" },
  { value: "above_100cr", label: "Above ₹100 Crore", labelHi: "₹100 करोड़ से अधिक" },
];

type FormStep = "company" | "services" | "documents" | "review";

const STEPS: { key: FormStep; label: string; labelHi: string }[] = [
  { key: "company", label: "Company Details", labelHi: "कंपनी विवरण" },
  { key: "services", label: "Service Categories", labelHi: "सेवा श्रेणियां" },
  { key: "documents", label: "Documents & Compliance", labelHi: "दस्तावेज़ एवं अनुपालन" },
  { key: "review", label: "Review & Submit", labelHi: "समीक्षा एवं प्रस्तुत करें" },
];

type FormData = {
  companyName: string;
  companyType: string;
  registrationNumber: string;
  panNumber: string;
  gstNumber: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  yearEstablished: string;
  turnoverRange: string;
  employeeCount: string;
  selectedCategories: ServiceCategory[];
  hasMSMECert: boolean;
  hasISOCert: boolean;
  hasCMMICert: boolean;
  previousGovExperience: boolean;
  experienceDetails: string;
  agreeTerms: boolean;
};

const INITIAL_FORM: FormData = {
  companyName: "",
  companyType: "",
  registrationNumber: "",
  panNumber: "",
  gstNumber: "",
  contactPerson: "",
  designation: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "Bihar",
  pincode: "",
  yearEstablished: "",
  turnoverRange: "",
  employeeCount: "",
  selectedCategories: [],
  hasMSMECert: false,
  hasISOCert: false,
  hasCMMICert: false,
  previousGovExperience: false,
  experienceDetails: "",
  agreeTerms: false,
};

export default function EmpanelmentPage() {
  const { lang } = useLang();
  const [currentStep, setCurrentStep] = useState<FormStep>("company");
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const isEn = lang === "en";
  const currentStepIndex = STEPS.findIndex((s) => s.key === currentStep);

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleCategory = (cat: ServiceCategory) => {
    setForm((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(cat)
        ? prev.selectedCategories.filter((c) => c !== cat)
        : [...prev.selectedCategories, cat],
    }));
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case "company":
        if (!form.companyName || !form.companyType || !form.contactPerson || !form.email || !form.phone) {
          toast.error(isEn ? "Please fill all required fields" : "कृपया सभी आवश्यक फ़ील्ड भरें");
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
          toast.error(isEn ? "Please enter a valid email" : "कृपया एक वैध ईमेल दर्ज करें");
          return false;
        }
        return true;
      case "services":
        if (form.selectedCategories.length === 0) {
          toast.error(isEn ? "Please select at least one service category" : "कृपया कम से कम एक सेवा श्रेणी चुनें");
          return false;
        }
        return true;
      case "documents":
        return true;
      case "review":
        if (!form.agreeTerms) {
          toast.error(isEn ? "Please agree to the terms and conditions" : "कृपया नियमों और शर्तों से सहमत हों");
          return false;
        }
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep()) return;
    const idx = currentStepIndex;
    if (idx < STEPS.length - 1) {
      setCurrentStep(STEPS[idx + 1].key);
    }
  };

  const prevStep = () => {
    const idx = currentStepIndex;
    if (idx > 0) {
      setCurrentStep(STEPS[idx - 1].key);
    }
  };

  const handleSubmit = () => {
    if (!validateStep()) return;
    const refId = `EMP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    setReferenceId(refId);
    setSubmitted(true);
    toast.success(isEn ? "Empanelment form submitted successfully!" : "एम्पेनलमेंट फॉर्म सफलतापूर्वक जमा किया गया!");
  };

  if (submitted) {
    return (
      <AnimatedPage>
        <div className="max-w-2xl mx-auto px-4 py-12">
          <Card className="text-center">
            <CardContent className="pt-8 pb-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {isEn ? "Application Submitted Successfully" : "आवेदन सफलतापूर्वक प्रस्तुत"}
              </h2>
              <p className="text-muted-foreground">
                {isEn
                  ? "Your empanelment application has been received. Our team will review it within 7-10 working days."
                  : "आपका एम्पेनलमेंट आवेदन प्राप्त हो गया है। हमारी टीम 7-10 कार्य दिवसों में इसकी समीक्षा करेगी।"}
              </p>
              <div className="bg-secondary rounded-lg p-4 inline-block">
                <p className="text-xs text-muted-foreground mb-1">
                  {isEn ? "Reference Number" : "संदर्भ संख्या"}
                </p>
                <p className="text-lg font-mono font-bold text-primary">{referenceId}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {isEn
                  ? "Please save this reference number for future correspondence."
                  : "कृपया भविष्य के पत्राचार के लिए इस संदर्भ संख्या को सहेजें।"}
              </p>
            </CardContent>
          </Card>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {isEn ? "Vendor Empanelment Form" : "विक्रेता एम्पेनलमेंट फॉर्म"}
            </h1>
          </div>
          <p className="text-muted-foreground text-sm ml-[52px]">
            {isEn
              ? "Register your company for empanelment with BELTRON for IT & e-Governance projects"
              : "आईटी एवं ई-गवर्नेंस परियोजनाओं के लिए बेल्ट्रॉन के साथ एम्पेनलमेंट हेतु अपनी कंपनी का पंजीकरण करें"}
          </p>
        </div>

        {/* Step indicator */}
        <div className="mb-8">
          <div className="flex items-center gap-1">
            {STEPS.map((step, i) => (
              <div key={step.key} className="flex-1 flex items-center">
                <div className="flex-1">
                  <div
                    className={`h-2 rounded-full transition-colors ${
                      i <= currentStepIndex ? "bg-primary" : "bg-secondary"
                    }`}
                  />
                  <p className={`text-xs mt-1.5 ${i === currentStepIndex ? "text-primary font-medium" : "text-muted-foreground"}`}>
                    {isEn ? step.label : step.labelHi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {isEn ? STEPS[currentStepIndex].label : STEPS[currentStepIndex].labelHi}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {currentStep === "company" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      {isEn ? "Company Name *" : "कंपनी का नाम *"}
                    </Label>
                    <Input
                      value={form.companyName}
                      onChange={(e) => updateField("companyName", e.target.value)}
                      placeholder={isEn ? "e.g. TechSolutions Pvt Ltd" : "उदा. टेकसॉल्यूशन्स प्रा. लि."}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isEn ? "Company Type *" : "कंपनी का प्रकार *"}</Label>
                    <select
                      className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                      value={form.companyType}
                      onChange={(e) => updateField("companyType", e.target.value)}
                    >
                      <option value="">{isEn ? "Select type..." : "प्रकार चुनें..."}</option>
                      {COMPANY_TYPES.map((ct) => (
                        <option key={ct.value} value={ct.value}>
                          {isEn ? ct.label : ct.labelHi}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{isEn ? "Registration / CIN Number" : "पंजीकरण / CIN संख्या"}</Label>
                    <Input
                      value={form.registrationNumber}
                      onChange={(e) => updateField("registrationNumber", e.target.value)}
                      placeholder="U72200BR2018PTC..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isEn ? "PAN Number" : "पैन नंबर"}</Label>
                    <Input
                      value={form.panNumber}
                      onChange={(e) => updateField("panNumber", e.target.value.toUpperCase())}
                      placeholder="ABCDE1234F"
                      maxLength={10}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isEn ? "GST Number" : "जीएसटी नंबर"}</Label>
                    <Input
                      value={form.gstNumber}
                      onChange={(e) => updateField("gstNumber", e.target.value.toUpperCase())}
                      placeholder="10ABCDE1234F1Z5"
                      maxLength={15}
                    />
                  </div>
                </div>

                <hr className="border-border" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {isEn ? "Contact Person *" : "संपर्क व्यक्ति *"}
                    </Label>
                    <Input
                      value={form.contactPerson}
                      onChange={(e) => updateField("contactPerson", e.target.value)}
                      placeholder={isEn ? "Full Name" : "पूरा नाम"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isEn ? "Designation" : "पद"}</Label>
                    <Input
                      value={form.designation}
                      onChange={(e) => updateField("designation", e.target.value)}
                      placeholder={isEn ? "e.g. Director, Manager" : "उदा. निदेशक, प्रबंधक"}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      {isEn ? "Email *" : "ईमेल *"}
                    </Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="contact@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      {isEn ? "Phone *" : "फोन *"}
                    </Label>
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {isEn ? "Registered Office Address" : "पंजीकृत कार्यालय का पता"}
                  </Label>
                  <Input
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder={isEn ? "Street address" : "सड़क का पता"}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{isEn ? "City" : "शहर"}</Label>
                    <Input
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder={isEn ? "e.g. Patna" : "उदा. पटना"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isEn ? "State" : "राज्य"}</Label>
                    <Input
                      value={form.state}
                      onChange={(e) => updateField("state", e.target.value)}
                      placeholder="Bihar"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isEn ? "PIN Code" : "पिन कोड"}</Label>
                    <Input
                      value={form.pincode}
                      onChange={(e) => updateField("pincode", e.target.value)}
                      placeholder="800001"
                      maxLength={6}
                    />
                  </div>
                </div>
              </>
            )}

            {currentStep === "services" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label>{isEn ? "Year Established" : "स्थापना वर्ष"}</Label>
                    <Input
                      type="number"
                      value={form.yearEstablished}
                      onChange={(e) => updateField("yearEstablished", e.target.value)}
                      placeholder="2015"
                      min="1900"
                      max="2026"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isEn ? "Annual Turnover" : "वार्षिक टर्नओवर"}</Label>
                    <select
                      className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                      value={form.turnoverRange}
                      onChange={(e) => updateField("turnoverRange", e.target.value)}
                    >
                      <option value="">{isEn ? "Select range..." : "रेंज चुनें..."}</option>
                      {TURNOVER_RANGES.map((tr) => (
                        <option key={tr.value} value={tr.value}>
                          {isEn ? tr.label : tr.labelHi}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>{isEn ? "Number of Employees" : "कर्मचारियों की संख्या"}</Label>
                    <Input
                      type="number"
                      value={form.employeeCount}
                      onChange={(e) => updateField("employeeCount", e.target.value)}
                      placeholder="50"
                      min="1"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    {isEn ? "Select Service Categories (at least one) *" : "सेवा श्रेणियां चुनें (कम से कम एक) *"}
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {SERVICE_CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => toggleCategory(cat.value)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm text-left transition-colors cursor-pointer ${
                          form.selectedCategories.includes(cat.value)
                            ? "border-primary bg-primary/5 text-primary font-medium"
                            : "border-border hover:border-primary/40 text-foreground"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            form.selectedCategories.includes(cat.value)
                              ? "bg-primary border-primary"
                              : "border-muted-foreground/40"
                          }`}
                        >
                          {form.selectedCategories.includes(cat.value) && (
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          )}
                        </div>
                        {isEn ? cat.label : cat.labelHi}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {currentStep === "documents" && (
              <>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {isEn
                      ? "Please indicate the certifications and experience relevant to your empanelment."
                      : "कृपया अपने एम्पेनलमेंट से संबंधित प्रमाणपत्र और अनुभव बताएं।"}
                  </p>

                  <div className="space-y-3">
                    <Label className="font-medium">{isEn ? "Certifications" : "प्रमाणपत्र"}</Label>
                    <div className="space-y-2">
                      {[
                        { key: "hasMSMECert" as const, label: "MSME / Udyam Registration", labelHi: "MSME / उद्यम पंजीकरण" },
                        { key: "hasISOCert" as const, label: "ISO Certification (9001/27001)", labelHi: "ISO प्रमाणन (9001/27001)" },
                        { key: "hasCMMICert" as const, label: "CMMI Level 3 or above", labelHi: "CMMI स्तर 3 या उससे ऊपर" },
                      ].map((cert) => (
                        <label
                          key={cert.key}
                          className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={form[cert.key]}
                            onChange={(e) => updateField(cert.key, e.target.checked)}
                            className="w-4 h-4 rounded border-input accent-primary"
                          />
                          <span className="text-sm">{isEn ? cert.label : cert.labelHi}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <hr className="border-border" />

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.previousGovExperience}
                        onChange={(e) => updateField("previousGovExperience", e.target.checked)}
                        className="w-4 h-4 rounded border-input accent-primary"
                      />
                      <span className="text-sm font-medium">
                        {isEn
                          ? "Previous experience with Government projects"
                          : "सरकारी परियोजनाओं के साथ पूर्व अनुभव"}
                      </span>
                    </label>
                    {form.previousGovExperience && (
                      <textarea
                        className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={form.experienceDetails}
                        onChange={(e) => updateField("experienceDetails", e.target.value)}
                        placeholder={
                          isEn
                            ? "Briefly describe your relevant government project experience..."
                            : "अपने प्रासंगिक सरकारी परियोजना अनुभव का संक्षेप में वर्णन करें..."
                        }
                      />
                    )}
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 mt-0.5 shrink-0" />
                      <p>
                        {isEn
                          ? "Physical copies of certificates (PAN, GST, Registration, MSME, ISO, work orders) must be submitted to BELTRON office within 15 days of online application."
                          : "प्रमाणपत्रों (PAN, GST, पंजीकरण, MSME, ISO, कार्य आदेश) की भौतिक प्रतियां ऑनलाइन आवेदन के 15 दिनों के भीतर बेल्ट्रॉन कार्यालय में जमा करनी होंगी।"}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === "review" && (
              <>
                <div className="space-y-4">
                  <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
                    <h4 className="font-medium text-sm">{isEn ? "Company Information" : "कंपनी की जानकारी"}</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">{isEn ? "Company:" : "कंपनी:"}</span>
                      <span className="font-medium">{form.companyName || "—"}</span>
                      <span className="text-muted-foreground">{isEn ? "Type:" : "प्रकार:"}</span>
                      <span>{COMPANY_TYPES.find((c) => c.value === form.companyType)?.[isEn ? "label" : "labelHi"] || "—"}</span>
                      <span className="text-muted-foreground">{isEn ? "Contact:" : "संपर्क:"}</span>
                      <span>{form.contactPerson || "—"}</span>
                      <span className="text-muted-foreground">{isEn ? "Email:" : "ईमेल:"}</span>
                      <span>{form.email || "—"}</span>
                      <span className="text-muted-foreground">{isEn ? "Phone:" : "फोन:"}</span>
                      <span>{form.phone || "—"}</span>
                    </div>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
                    <h4 className="font-medium text-sm">{isEn ? "Selected Services" : "चयनित सेवाएं"}</h4>
                    <div className="flex flex-wrap gap-2">
                      {form.selectedCategories.map((cat) => {
                        const found = SERVICE_CATEGORIES.find((c) => c.value === cat);
                        return (
                          <span key={cat} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {found ? (isEn ? found.label : found.labelHi) : cat}
                          </span>
                        );
                      })}
                      {form.selectedCategories.length === 0 && (
                        <span className="text-xs text-muted-foreground">{isEn ? "None selected" : "कोई नहीं चुना"}</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                    <h4 className="font-medium text-sm">{isEn ? "Certifications" : "प्रमाणपत्र"}</h4>
                    <div className="text-sm space-y-1">
                      <p>MSME: {form.hasMSMECert ? "✓" : "✗"} | ISO: {form.hasISOCert ? "✓" : "✗"} | CMMI: {form.hasCMMICert ? "✓" : "✗"}</p>
                      <p>{isEn ? "Govt. Experience:" : "सरकारी अनुभव:"} {form.previousGovExperience ? "✓" : "✗"}</p>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/30 transition-colors">
                    <input
                      type="checkbox"
                      checked={form.agreeTerms}
                      onChange={(e) => updateField("agreeTerms", e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-input accent-primary"
                    />
                    <span className="text-sm">
                      {isEn
                        ? "I hereby declare that all information provided is true and correct to the best of my knowledge. I understand that providing false information may lead to rejection of my empanelment application."
                        : "मैं एतद्द्वारा घोषणा करता/करती हूं कि प्रदान की गई सभी जानकारी मेरी जानकारी के अनुसार सत्य और सही है। मैं समझता/समझती हूं कि गलत जानकारी देने पर मेरा एम्पेनलमेंट आवेदन अस्वीकार किया जा सकता है।"}
                    </span>
                  </label>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStepIndex === 0}
            className="cursor-pointer"
          >
            ← {isEn ? "Previous" : "पिछला"}
          </Button>

          {currentStep === "review" ? (
            <Button onClick={handleSubmit} className="cursor-pointer gap-2">
              <Send className="w-4 h-4" />
              {isEn ? "Submit Application" : "आवेदन जमा करें"}
            </Button>
          ) : (
            <Button onClick={nextStep} className="cursor-pointer">
              {isEn ? "Next" : "अगला"} →
            </Button>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}
