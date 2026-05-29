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
import { User, Building2, Briefcase, MapPin, Phone, Shield, Save } from "lucide-react";
import AnimatedPage from "@/components/animated-page.tsx";

type UserRole = "citizen" | "vendor" | "employee";

const ROLES: { value: UserRole; label: string; labelHi: string; icon: React.ReactNode; description: string; descriptionHi: string }[] = [
  {
    value: "citizen",
    label: "Citizen",
    labelHi: "नागरिक",
    icon: <User className="w-5 h-5" />,
    description: "Access government services and track applications",
    descriptionHi: "सरकारी सेवाओं तक पहुँचें और आवेदनों को ट्रैक करें",
  },
  {
    value: "vendor",
    label: "Vendor / MSME",
    labelHi: "विक्रेता / MSME",
    icon: <Building2 className="w-5 h-5" />,
    description: "Participate in tenders and manage procurement",
    descriptionHi: "निविदाओं में भाग लें और प्रोक्योरमेंट प्रबंधित करें",
  },
  {
    value: "employee",
    label: "Government Employee",
    labelHi: "सरकारी कर्मचारी",
    icon: <Briefcase className="w-5 h-5" />,
    description: "Manage requests, HR processes and approvals",
    descriptionHi: "अनुरोध, मानव संसाधन प्रक्रियाओं और अनुमोदनों का प्रबंधन करें",
  },
];

function ProfileForm() {
  const { lang } = useLang();
  const currentUser = useQuery(api.users.getCurrentUser, {});
  const updateProfile = useMutation(api.users.updateProfile);

  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(undefined);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [initialized, setInitialized] = useState(false);

  // Populate form once data loads
  if (currentUser && !initialized) {
    setSelectedRole(currentUser.role ?? undefined);
    setName(currentUser.name ?? "");
    setPhone(currentUser.phone ?? "");
    setDistrict(currentUser.district ?? "");
    setDepartment(currentUser.department ?? "");
    setDesignation(currentUser.designation ?? "");
    setOrganizationName(currentUser.organizationName ?? "");
    setGstNumber(currentUser.gstNumber ?? "");
    setInitialized(true);
  }

  if (currentUser === undefined) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  const handleSave = async () => {
    try {
      await updateProfile({
        role: selectedRole,
        name: name || undefined,
        phone: phone || undefined,
        district: district || undefined,
        department: department || undefined,
        designation: designation || undefined,
        organizationName: organizationName || undefined,
        gstNumber: gstNumber || undefined,
      });
      toast.success(lang === "hi" ? "प्रोफ़ाइल अपडेट किया गया" : "Profile updated successfully");
    } catch {
      toast.error(lang === "hi" ? "अपडेट में त्रुटि" : "Failed to update profile");
    }
  };

  return (
    <div className="space-y-8">
      {/* User info header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            {lang === "hi" ? "खाता जानकारी" : "Account Information"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>{lang === "hi" ? "ईमेल" : "Email"}</Label>
              <p className="text-sm text-muted-foreground mt-1">{currentUser?.email ?? "—"}</p>
            </div>
            <div>
              <Label>{lang === "hi" ? "नाम" : "Full Name"}</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                {lang === "hi" ? "फ़ोन" : "Phone"}
              </Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <Label className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {lang === "hi" ? "ज़िला" : "District"}
              </Label>
              <Input
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Patna"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role selection */}
      <Card>
        <CardHeader>
          <CardTitle>{lang === "hi" ? "भूमिका चुनें" : "Select Your Role"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            {ROLES.map((role) => (
              <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`p-4 rounded-lg border-2 text-left transition-all cursor-pointer ${
                  selectedRole === role.value
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/40 hover:bg-secondary/50"
                }`}
              >
                <div className={`mb-2 ${selectedRole === role.value ? "text-primary" : "text-muted-foreground"}`}>
                  {role.icon}
                </div>
                <p className="font-semibold text-sm">{lang === "hi" ? role.labelHi : role.label}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {lang === "hi" ? role.descriptionHi : role.description}
                </p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role-specific fields */}
      {selectedRole === "vendor" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              {lang === "hi" ? "संगठन विवरण" : "Organization Details"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>{lang === "hi" ? "संगठन का नाम" : "Organization Name"}</Label>
                <Input
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder="Acme Solutions Pvt Ltd"
                />
              </div>
              <div>
                <Label>{lang === "hi" ? "GST नंबर" : "GST Number"}</Label>
                <Input
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedRole === "employee" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              {lang === "hi" ? "विभाग विवरण" : "Department Details"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>{lang === "hi" ? "विभाग" : "Department"}</Label>
                <Input
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="IT Division"
                />
              </div>
              <div>
                <Label>{lang === "hi" ? "पद" : "Designation"}</Label>
                <Input
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="Senior Engineer"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="cursor-pointer gap-2">
          <Save className="w-4 h-4" />
          {lang === "hi" ? "प्रोफ़ाइल सहेजें" : "Save Profile"}
        </Button>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { lang } = useLang();

  return (
    <AnimatedPage>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">
          {lang === "hi" ? "मेरी प्रोफ़ाइल" : "My Profile"}
        </h1>

        <AuthLoading>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </AuthLoading>

        <Unauthenticated>
          <Card>
            <CardContent className="flex flex-col items-center gap-4 py-12">
              <User className="w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground text-center">
                {lang === "hi"
                  ? "अपनी प्रोफ़ाइल देखने के लिए साइन इन करें"
                  : "Sign in to view and manage your profile"}
              </p>
              <SignInButton signInText={lang === "hi" ? "साइन इन करें" : "Sign In"} />
            </CardContent>
          </Card>
        </Unauthenticated>

        <Authenticated>
          <ProfileForm />
        </Authenticated>
      </div>
    </AnimatedPage>
  );
}
