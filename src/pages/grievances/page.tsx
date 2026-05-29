import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useLang } from "@/lib/language-context.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  MessageSquare,
  Plus,
  Search,
  Send,
  ShieldAlert,
  Clipboard,
} from "lucide-react";
import { cn } from "@/lib/utils.ts";
import AnimatedPage from "@/components/animated-page.tsx";

type GrievanceCategory =
  | "service_delay"
  | "technical_issue"
  | "corruption"
  | "staff_behavior"
  | "infrastructure"
  | "payment_issue"
  | "other";

type Priority = "low" | "medium" | "high";
type ViewMode = "list" | "form" | "track";

const CATEGORIES: { value: GrievanceCategory; label: string; labelHi: string }[] = [
  { value: "service_delay", label: "Service Delay", labelHi: "सेवा में देरी" },
  { value: "technical_issue", label: "Technical Issue", labelHi: "तकनीकी समस्या" },
  { value: "corruption", label: "Corruption / Malpractice", labelHi: "भ्रष्टाचार / कदाचार" },
  { value: "staff_behavior", label: "Staff Behavior", labelHi: "कर्मचारी व्यवहार" },
  { value: "infrastructure", label: "Infrastructure Problem", labelHi: "अवसंरचना समस्या" },
  { value: "payment_issue", label: "Payment / Financial Issue", labelHi: "भुगतान / वित्तीय मुद्दा" },
  { value: "other", label: "Other", labelHi: "अन्य" },
];

const DEPARTMENTS = [
  "BELTRON",
  "IT Department",
  "Urban Development",
  "Home Department",
  "Revenue & Land",
  "Education Department",
  "Health Department",
  "Science & Technology",
];

const STATUS_CONFIG: Record<string, { label: string; labelHi: string; color: string; icon: React.ReactNode }> = {
  submitted: { label: "Submitted", labelHi: "प्रस्तुत", color: "bg-blue-100 text-blue-800", icon: <FileText className="w-3.5 h-3.5" /> },
  under_review: { label: "Under Review", labelHi: "समीक्षाधीन", color: "bg-amber-100 text-amber-800", icon: <Clock className="w-3.5 h-3.5" /> },
  in_progress: { label: "In Progress", labelHi: "प्रगति पर", color: "bg-purple-100 text-purple-800", icon: <Loader2 className="w-3.5 h-3.5" /> },
  resolved: { label: "Resolved", labelHi: "समाधान", color: "bg-green-100 text-green-800", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  closed: { label: "Closed", labelHi: "बंद", color: "bg-gray-100 text-gray-800", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
};

const PRIORITY_CONFIG: Record<string, { label: string; color: string }> = {
  low: { label: "Low", color: "text-green-600" },
  medium: { label: "Medium", color: "text-amber-600" },
  high: { label: "High", color: "text-red-600" },
};

function GrievanceForm({ onSuccess }: { onSuccess: (trackingId: string) => void }) {
  const { lang } = useLang();
  const submitGrievance = useMutation(api.grievances.submit);

  const [category, setCategory] = useState<GrievanceCategory>("service_delay");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("BELTRON");
  const [district, setDistrict] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject.trim() || !description.trim()) {
      toast.error(lang === "hi" ? "कृपया सभी आवश्यक फ़ील्ड भरें" : "Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitGrievance({
        category,
        subject: subject.trim(),
        description: description.trim(),
        department,
        district: district.trim() || undefined,
        priority,
      });
      toast.success(
        lang === "hi"
          ? `शिकायत दर्ज हो गई। ट्रैकिंग ID: ${result.trackingId}`
          : `Grievance submitted. Tracking ID: ${result.trackingId}`
      );
      onSuccess(result.trackingId);
    } catch (error) {
      if (error instanceof ConvexError) {
        const data = error.data as { message: string };
        toast.error(data.message);
      } else {
        toast.error(lang === "hi" ? "प्रस्तुत करने में त्रुटि" : "Failed to submit grievance");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="w-5 h-5 text-primary" />
            {lang === "hi" ? "शिकायत विवरण" : "Grievance Details"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Subject */}
          <div>
            <Label>{lang === "hi" ? "विषय *" : "Subject *"}</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={lang === "hi" ? "संक्षेप में अपनी शिकायत लिखें" : "Brief summary of your grievance"}
              maxLength={200}
              required
            />
          </div>

          {/* Category + Priority */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>{lang === "hi" ? "श्रेणी *" : "Category *"}</Label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as GrievanceCategory)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {lang === "hi" ? cat.labelHi : cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>{lang === "hi" ? "प्राथमिकता *" : "Priority *"}</Label>
              <div className="flex gap-2 mt-1">
                {(["low", "medium", "high"] as Priority[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={cn(
                      "flex-1 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer capitalize",
                      priority === p
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    )}
                  >
                    {p === "low" ? (lang === "hi" ? "कम" : "Low") :
                     p === "medium" ? (lang === "hi" ? "मध्यम" : "Medium") :
                     (lang === "hi" ? "उच्च" : "High")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Department + District */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>{lang === "hi" ? "संबंधित विभाग *" : "Related Department *"}</Label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm cursor-pointer"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>{lang === "hi" ? "ज़िला (वैकल्पिक)" : "District (optional)"}</Label>
              <Input
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Patna"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label>{lang === "hi" ? "विस्तृत विवरण *" : "Detailed Description *"}</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={lang === "hi" ? "कृपया अपनी शिकायत का विस्तृत विवरण दें..." : "Please describe your grievance in detail..."}
              rows={5}
              required
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <p className="text-[11px] text-muted-foreground mt-1">
              {description.length}/2000 {lang === "hi" ? "अक्षर" : "characters"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={submitting} className="cursor-pointer gap-2">
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {submitting
            ? (lang === "hi" ? "प्रस्तुत हो रहा..." : "Submitting...")
            : (lang === "hi" ? "शिकायत दर्ज करें" : "Submit Grievance")}
        </Button>
      </div>
    </form>
  );
}

function TrackGrievance() {
  const { lang } = useLang();
  const [trackingInput, setTrackingInput] = useState("");
  const [searchId, setSearchId] = useState("");

  const grievance = useQuery(
    api.grievances.getByTracking,
    searchId ? { trackingId: searchId } : "skip"
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      setSearchId(trackingInput.trim().toUpperCase());
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            {lang === "hi" ? "शिकायत ट्रैक करें" : "Track Your Grievance"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value)}
              placeholder={lang === "hi" ? "ट्रैकिंग ID दर्ज करें (जैसे GRV-2026-12345)" : "Enter Tracking ID (e.g. GRV-2026-12345)"}
              className="flex-1"
            />
            <Button type="submit" className="cursor-pointer gap-2">
              <Search className="w-4 h-4" />
              {lang === "hi" ? "खोजें" : "Search"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {searchId && grievance === undefined && (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {searchId && grievance === null && (
        <Card>
          <CardContent className="py-8 text-center">
            <AlertTriangle className="w-10 h-10 mx-auto text-amber-500 mb-3" />
            <p className="text-muted-foreground">
              {lang === "hi"
                ? `"${searchId}" के लिए कोई शिकायत नहीं मिली`
                : `No grievance found for "${searchId}"`}
            </p>
          </CardContent>
        </Card>
      )}

      {grievance && (
        <GrievanceDetailCard grievance={grievance} />
      )}
    </div>
  );
}

function GrievanceDetailCard({ grievance }: { grievance: { trackingId: string; subject: string; category: string; department: string; status: string; priority: string; description: string; _creationTime: number; adminRemarks?: string; resolvedAt?: string } }) {
  const { lang } = useLang();
  const statusConfig = STATUS_CONFIG[grievance.status];
  const priorityConfig = PRIORITY_CONFIG[grievance.priority];
  const categoryLabel = CATEGORIES.find((c) => c.value === grievance.category);

  const copyTrackingId = () => {
    navigator.clipboard.writeText(grievance.trackingId);
    toast.success(lang === "hi" ? "ट्रैकिंग ID कॉपी हो गई" : "Tracking ID copied");
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={copyTrackingId}
                className="flex items-center gap-1.5 text-xs font-mono bg-secondary px-2 py-1 rounded cursor-pointer hover:bg-secondary/80"
                title="Copy tracking ID"
              >
                <Clipboard className="w-3 h-3" />
                {grievance.trackingId}
              </button>
              <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", statusConfig.color)}>
                {statusConfig.icon}
                {lang === "hi" ? statusConfig.labelHi : statusConfig.label}
              </span>
            </div>
            <h3 className="text-base font-semibold text-foreground">{grievance.subject}</h3>
          </div>
          <span className={cn("text-xs font-medium", priorityConfig.color)}>
            {priorityConfig.label}
          </span>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-4 text-sm">
          <div>
            <span className="text-muted-foreground">{lang === "hi" ? "श्रेणी:" : "Category:"}</span>
            <span className="ml-1 font-medium">{lang === "hi" ? categoryLabel?.labelHi : categoryLabel?.label}</span>
          </div>
          <div>
            <span className="text-muted-foreground">{lang === "hi" ? "विभाग:" : "Department:"}</span>
            <span className="ml-1 font-medium">{grievance.department}</span>
          </div>
          <div>
            <span className="text-muted-foreground">{lang === "hi" ? "तिथि:" : "Filed on:"}</span>
            <span className="ml-1 font-medium">
              {new Date(grievance._creationTime).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-3 mb-4">
          <p className="text-sm text-foreground whitespace-pre-wrap">{grievance.description}</p>
        </div>

        {grievance.adminRemarks && (
          <div className="border-l-4 border-primary pl-3 mt-3">
            <p className="text-xs font-medium text-primary mb-1">
              {lang === "hi" ? "प्रशासनिक टिप्पणी" : "Admin Remarks"}
            </p>
            <p className="text-sm text-muted-foreground">{grievance.adminRemarks}</p>
          </div>
        )}

        {grievance.resolvedAt && (
          <p className="text-xs text-muted-foreground mt-3">
            {lang === "hi" ? "समाधान तिथि:" : "Resolved on:"}{" "}
            {new Date(grievance.resolvedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function GrievanceList() {
  const { lang } = useLang();
  const grievances = useQuery(api.grievances.listByUser, {});

  if (grievances === undefined) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full" />
        ))}
      </div>
    );
  }

  if (grievances.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <ShieldAlert className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground mb-1">
            {lang === "hi"
              ? "आपने अभी तक कोई शिकायत दर्ज नहीं की है"
              : "You have not submitted any grievances yet"}
          </p>
          <p className="text-xs text-muted-foreground">
            {lang === "hi"
              ? "अपनी पहली शिकायत दर्ज करने के लिए 'नई शिकायत' पर क्लिक करें"
              : "Click 'New Grievance' to file your first complaint"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {grievances.map((g) => (
        <GrievanceDetailCard key={g._id} grievance={g} />
      ))}
    </div>
  );
}

function GrievancePortal() {
  const { lang } = useLang();
  const [view, setView] = useState<ViewMode>("list");
  const [lastTrackingId, setLastTrackingId] = useState<string | null>(null);

  const handleSubmitSuccess = (trackingId: string) => {
    setLastTrackingId(trackingId);
    setView("list");
  };

  return (
    <div className="space-y-6">
      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={view === "list" ? "default" : "secondary"}
          size="sm"
          onClick={() => setView("list")}
          className="cursor-pointer gap-2"
        >
          <FileText className="w-4 h-4" />
          {lang === "hi" ? "मेरी शिकायतें" : "My Grievances"}
        </Button>
        <Button
          variant={view === "form" ? "default" : "secondary"}
          size="sm"
          onClick={() => setView("form")}
          className="cursor-pointer gap-2"
        >
          <Plus className="w-4 h-4" />
          {lang === "hi" ? "नई शिकायत" : "New Grievance"}
        </Button>
        <Button
          variant={view === "track" ? "default" : "secondary"}
          size="sm"
          onClick={() => setView("track")}
          className="cursor-pointer gap-2"
        >
          <Search className="w-4 h-4" />
          {lang === "hi" ? "ट्रैक करें" : "Track Status"}
        </Button>
      </div>

      {/* Success banner */}
      {lastTrackingId && view === "list" && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-green-800">
              {lang === "hi" ? "शिकायत सफलतापूर्वक दर्ज हो गई!" : "Grievance submitted successfully!"}
            </p>
            <p className="text-xs text-green-700 mt-0.5">
              {lang === "hi" ? "ट्रैकिंग ID:" : "Tracking ID:"}{" "}
              <span className="font-mono font-semibold">{lastTrackingId}</span>
            </p>
          </div>
          <button
            onClick={() => setLastTrackingId(null)}
            className="text-green-600 hover:text-green-800 cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Views */}
      {view === "list" && <GrievanceList />}
      {view === "form" && <GrievanceForm onSuccess={handleSubmitSuccess} />}
      {view === "track" && <TrackGrievance />}
    </div>
  );
}

export default function GrievancesPage() {
  const { lang } = useLang();

  return (
    <AnimatedPage>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {lang === "hi" ? "शिकायत निवारण प्रणाली" : "Grievance Redressal System"}
          </h1>
          <p className="text-muted-foreground">
            {lang === "hi"
              ? "अपनी शिकायत दर्ज करें, ट्रैक करें और समाधान प्राप्त करें"
              : "Submit, track, and resolve your grievances with BELTRON services"}
          </p>
        </div>

        <AuthLoading>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </AuthLoading>

        <Unauthenticated>
          <Card>
            <CardContent className="flex flex-col items-center gap-4 py-12">
              <ShieldAlert className="w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground text-center">
                {lang === "hi"
                  ? "शिकायत दर्ज करने या ट्रैक करने के लिए साइन इन करें"
                  : "Sign in to submit or track your grievances"}
              </p>
              <SignInButton signInText={lang === "hi" ? "साइन इन करें" : "Sign In"} />
            </CardContent>
          </Card>
        </Unauthenticated>

        <Authenticated>
          <GrievancePortal />
        </Authenticated>
      </div>
    </AnimatedPage>
  );
}
