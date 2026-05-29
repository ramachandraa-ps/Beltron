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
  Briefcase,
  CheckCircle2,
  Clock,
  Clipboard,
  Laptop,
  Loader2,
  Monitor,
  Network,
  Plus,
  Send,
  Ticket,
  GraduationCap,
  ArrowRightLeft,
  CalendarDays,
  CircleDot,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils.ts";
import AnimatedPage from "@/components/animated-page.tsx";

type RequestType = "it_support" | "hardware" | "software_access" | "network" | "leave" | "transfer" | "training" | "other";
type Priority = "low" | "medium" | "high" | "urgent";
type ViewMode = "list" | "form";

const REQUEST_TYPES: { value: RequestType; label: string; labelHi: string; icon: React.ReactNode }[] = [
  { value: "it_support", label: "IT Support", labelHi: "आईटी सहायता", icon: <Laptop className="w-4 h-4" /> },
  { value: "hardware", label: "Hardware Request", labelHi: "हार्डवेयर अनुरोध", icon: <Monitor className="w-4 h-4" /> },
  { value: "software_access", label: "Software Access", labelHi: "सॉफ्टवेयर एक्सेस", icon: <CircleDot className="w-4 h-4" /> },
  { value: "network", label: "Network / Connectivity", labelHi: "नेटवर्क / कनेक्टिविटी", icon: <Network className="w-4 h-4" /> },
  { value: "leave", label: "Leave Application", labelHi: "अवकाश आवेदन", icon: <CalendarDays className="w-4 h-4" /> },
  { value: "transfer", label: "Transfer Request", labelHi: "स्थानांतरण अनुरोध", icon: <ArrowRightLeft className="w-4 h-4" /> },
  { value: "training", label: "Training / Certification", labelHi: "प्रशिक्षण / प्रमाणन", icon: <GraduationCap className="w-4 h-4" /> },
  { value: "other", label: "Other", labelHi: "अन्य", icon: <Ticket className="w-4 h-4" /> },
];

const STATUS_CONFIG: Record<string, { label: string; labelHi: string; color: string; icon: React.ReactNode }> = {
  pending: { label: "Pending", labelHi: "लंबित", color: "bg-amber-100 text-amber-800", icon: <Clock className="w-3.5 h-3.5" /> },
  approved: { label: "Approved", labelHi: "स्वीकृत", color: "bg-blue-100 text-blue-800", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  in_progress: { label: "In Progress", labelHi: "प्रगति पर", color: "bg-purple-100 text-purple-800", icon: <Loader2 className="w-3.5 h-3.5" /> },
  completed: { label: "Completed", labelHi: "पूर्ण", color: "bg-green-100 text-green-800", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  rejected: { label: "Rejected", labelHi: "अस्वीकृत", color: "bg-red-100 text-red-800", icon: <XCircle className="w-3.5 h-3.5" /> },
};

const PRIORITY_CONFIG: Record<string, { label: string; labelHi: string; color: string }> = {
  low: { label: "Low", labelHi: "कम", color: "text-green-600" },
  medium: { label: "Medium", labelHi: "मध्यम", color: "text-amber-600" },
  high: { label: "High", labelHi: "उच्च", color: "text-orange-600" },
  urgent: { label: "Urgent", labelHi: "अत्यावश्यक", color: "text-red-600" },
};

function RequestForm({ onSuccess }: { onSuccess: (requestId: string) => void }) {
  const { lang } = useLang();
  const submitRequest = useMutation(api.employeeRequests.submit);

  const [type, setType] = useState<RequestType>("it_support");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
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
      const result = await submitRequest({
        type,
        subject: subject.trim(),
        description: description.trim(),
        priority,
      });
      toast.success(
        lang === "hi"
          ? `अनुरोध दर्ज हो गया। ID: ${result.requestId}`
          : `Request submitted. ID: ${result.requestId}`
      );
      onSuccess(result.requestId);
    } catch (error) {
      if (error instanceof ConvexError) {
        const data = error.data as { message: string };
        toast.error(data.message);
      } else {
        toast.error(lang === "hi" ? "अनुरोध प्रस्तुत करने में त्रुटि" : "Failed to submit request");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Request type selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {lang === "hi" ? "अनुरोध का प्रकार चुनें" : "Select Request Type"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {REQUEST_TYPES.map((rt) => (
              <button
                key={rt.value}
                type="button"
                onClick={() => setType(rt.value)}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-lg border-2 text-center transition-all cursor-pointer",
                  type === rt.value
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/40 hover:bg-secondary/50"
                )}
              >
                <div className={cn(type === rt.value ? "text-primary" : "text-muted-foreground")}>
                  {rt.icon}
                </div>
                <span className="text-xs font-medium leading-tight">
                  {lang === "hi" ? rt.labelHi : rt.label}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Ticket className="w-5 h-5 text-primary" />
            {lang === "hi" ? "अनुरोध विवरण" : "Request Details"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>{lang === "hi" ? "विषय *" : "Subject *"}</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={lang === "hi" ? "संक्षेप में अपना अनुरोध लिखें" : "Brief summary of your request"}
              maxLength={200}
              required
            />
          </div>

          <div>
            <Label>{lang === "hi" ? "प्राथमिकता *" : "Priority *"}</Label>
            <div className="flex gap-2 mt-1">
              {(["low", "medium", "high", "urgent"] as Priority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={cn(
                    "flex-1 py-2 rounded-lg border text-xs font-medium transition-all cursor-pointer",
                    priority === p
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  )}
                >
                  {lang === "hi" ? PRIORITY_CONFIG[p].labelHi : PRIORITY_CONFIG[p].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>{lang === "hi" ? "विस्तृत विवरण *" : "Detailed Description *"}</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={lang === "hi" ? "कृपया अपने अनुरोध का विस्तृत विवरण दें..." : "Describe your request in detail..."}
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

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting} className="cursor-pointer gap-2">
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {submitting
            ? (lang === "hi" ? "प्रस्तुत हो रहा..." : "Submitting...")
            : (lang === "hi" ? "अनुरोध भेजें" : "Submit Request")}
        </Button>
      </div>
    </form>
  );
}

function RequestCard({ request }: { request: { requestId: string; subject: string; type: string; status: string; priority: string; description: string; _creationTime: number; assignedTo?: string; adminRemarks?: string; completedAt?: string } }) {
  const { lang } = useLang();
  const statusConfig = STATUS_CONFIG[request.status];
  const priorityConfig = PRIORITY_CONFIG[request.priority];
  const typeInfo = REQUEST_TYPES.find((t) => t.value === request.type);

  const copyId = () => {
    navigator.clipboard.writeText(request.requestId);
    toast.success(lang === "hi" ? "ID कॉपी हो गई" : "Request ID copied");
  };

  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="pt-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={copyId}
              className="flex items-center gap-1.5 text-xs font-mono bg-secondary px-2 py-1 rounded cursor-pointer hover:bg-secondary/80"
              title="Copy request ID"
            >
              <Clipboard className="w-3 h-3" />
              {request.requestId}
            </button>
            <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", statusConfig.color)}>
              {statusConfig.icon}
              {lang === "hi" ? statusConfig.labelHi : statusConfig.label}
            </span>
            <span className={cn("text-xs font-medium", priorityConfig.color)}>
              {lang === "hi" ? priorityConfig.labelHi : priorityConfig.label}
            </span>
          </div>
        </div>

        {/* Subject + Type */}
        <h3 className="text-sm font-semibold text-foreground mb-1">{request.subject}</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          {typeInfo && (
            <span className="inline-flex items-center gap-1 bg-secondary/70 px-2 py-0.5 rounded">
              {typeInfo.icon}
              {lang === "hi" ? typeInfo.labelHi : typeInfo.label}
            </span>
          )}
          <span>
            {new Date(request._creationTime).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{request.description}</p>

        {/* Timeline / meta */}
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
          {request.assignedTo && (
            <span>{lang === "hi" ? "सौंपा गया:" : "Assigned:"} <span className="font-medium text-foreground">{request.assignedTo}</span></span>
          )}
          {request.completedAt && (
            <span>{lang === "hi" ? "पूर्ण:" : "Completed:"} {new Date(request.completedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          )}
        </div>

        {/* Admin remarks */}
        {request.adminRemarks && (
          <div className="border-l-4 border-primary pl-3 mt-3">
            <p className="text-[11px] font-medium text-primary mb-0.5">
              {lang === "hi" ? "प्रशासनिक टिप्पणी" : "Admin Remarks"}
            </p>
            <p className="text-xs text-muted-foreground">{request.adminRemarks}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RequestList() {
  const { lang } = useLang();
  const requests = useQuery(api.employeeRequests.listByUser, {});
  const [filterStatus, setFilterStatus] = useState<string>("all");

  if (requests === undefined) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  const filteredRequests = filterStatus === "all"
    ? requests
    : requests.filter((r) => r.status === filterStatus);

  // Summary counts
  const counts = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    in_progress: requests.filter((r) => r.status === "in_progress" || r.status === "approved").length,
    completed: requests.filter((r) => r.status === "completed").length,
  };

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground mb-1">
            {lang === "hi"
              ? "आपने अभी तक कोई अनुरोध नहीं किया है"
              : "You have not submitted any requests yet"}
          </p>
          <p className="text-xs text-muted-foreground">
            {lang === "hi"
              ? "अपना पहला अनुरोध बनाने के लिए 'नया अनुरोध' पर क्लिक करें"
              : "Click 'New Request' to create your first service request"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-foreground">{counts.total}</p>
          <p className="text-[11px] text-muted-foreground">{lang === "hi" ? "कुल अनुरोध" : "Total"}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-amber-600">{counts.pending}</p>
          <p className="text-[11px] text-muted-foreground">{lang === "hi" ? "लंबित" : "Pending"}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-purple-600">{counts.in_progress}</p>
          <p className="text-[11px] text-muted-foreground">{lang === "hi" ? "प्रगति पर" : "In Progress"}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-green-600">{counts.completed}</p>
          <p className="text-[11px] text-muted-foreground">{lang === "hi" ? "पूर्ण" : "Completed"}</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1.5">
        {[
          { value: "all", label: "All", labelHi: "सभी" },
          { value: "pending", label: "Pending", labelHi: "लंबित" },
          { value: "approved", label: "Approved", labelHi: "स्वीकृत" },
          { value: "in_progress", label: "In Progress", labelHi: "प्रगति पर" },
          { value: "completed", label: "Completed", labelHi: "पूर्ण" },
          { value: "rejected", label: "Rejected", labelHi: "अस्वीकृत" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilterStatus(tab.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer",
              filterStatus === tab.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            )}
          >
            {lang === "hi" ? tab.labelHi : tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      {filteredRequests.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-8">
          {lang === "hi" ? "इस श्रेणी में कोई अनुरोध नहीं" : "No requests in this category"}
        </p>
      ) : (
        <div className="space-y-3">
          {filteredRequests.map((req) => (
            <RequestCard key={req._id} request={req} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmployeeRequestPortal() {
  const { lang } = useLang();
  const [view, setView] = useState<ViewMode>("list");
  const [lastRequestId, setLastRequestId] = useState<string | null>(null);

  const handleSuccess = (requestId: string) => {
    setLastRequestId(requestId);
    setView("list");
  };

  return (
    <div className="space-y-6">
      {/* Action bar */}
      <div className="flex items-center gap-2">
        <Button
          variant={view === "list" ? "default" : "secondary"}
          size="sm"
          onClick={() => setView("list")}
          className="cursor-pointer gap-2"
        >
          <Ticket className="w-4 h-4" />
          {lang === "hi" ? "मेरे अनुरोध" : "My Requests"}
        </Button>
        <Button
          variant={view === "form" ? "default" : "secondary"}
          size="sm"
          onClick={() => setView("form")}
          className="cursor-pointer gap-2"
        >
          <Plus className="w-4 h-4" />
          {lang === "hi" ? "नया अनुरोध" : "New Request"}
        </Button>
      </div>

      {/* Success banner */}
      {lastRequestId && view === "list" && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-green-800">
              {lang === "hi" ? "अनुरोध सफलतापूर्वक प्रस्तुत!" : "Request submitted successfully!"}
            </p>
            <p className="text-xs text-green-700 mt-0.5">
              {lang === "hi" ? "अनुरोध ID:" : "Request ID:"}{" "}
              <span className="font-mono font-semibold">{lastRequestId}</span>
            </p>
          </div>
          <button
            onClick={() => setLastRequestId(null)}
            className="text-green-600 hover:text-green-800 cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Views */}
      {view === "list" && <RequestList />}
      {view === "form" && <RequestForm onSuccess={handleSuccess} />}
    </div>
  );
}

export default function EmployeeRequestsPage() {
  const { lang } = useLang();

  return (
    <AnimatedPage>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {lang === "hi" ? "कर्मचारी अनुरोध ट्रैकर" : "Employee Request Tracker"}
          </h1>
          <p className="text-muted-foreground">
            {lang === "hi"
              ? "आईटी सहायता, हार्डवेयर, सॉफ्टवेयर एक्सेस, अवकाश और स्थानांतरण अनुरोध प्रबंधित करें"
              : "Submit and track IT support, hardware, software access, leave, and transfer requests"}
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
              <Briefcase className="w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground text-center">
                {lang === "hi"
                  ? "अनुरोध प्रस्तुत करने या ट्रैक करने के लिए साइन इन करें"
                  : "Sign in to submit or track your service requests"}
              </p>
              <SignInButton signInText={lang === "hi" ? "साइन इन करें" : "Sign In"} />
            </CardContent>
          </Card>
        </Unauthenticated>

        <Authenticated>
          <EmployeeRequestPortal />
        </Authenticated>
      </div>
    </AnimatedPage>
  );
}
