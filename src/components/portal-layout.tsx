import { Outlet, useLocation, Link } from "react-router-dom";
import AccessibilityBar from "@/pages/home/_components/accessibility-bar.tsx";
import Navbar from "@/pages/home/_components/navbar.tsx";
import Footer from "@/pages/home/_components/footer.tsx";
import { ChevronRight, Home } from "lucide-react";

const breadcrumbMap: Record<string, string> = {
  tenders: "Tenders",
  careers: "Careers & Recruitment",
  circulars: "Circulars & Notifications",
  services: "Our Services",
  dashboard: "Governance Dashboard",
  profile: "My Profile",
  documents: "Document Download Center",
  grievances: "Grievance Redressal",
  "employee-requests": "Employee Requests",
  empanelment: "Vendor Empanelment",
  projects: "Projects",
  about: "About Us",
  "vision-mission": "Vision & Mission",
  accessibility: "Accessibility Statement",
  sitemap: "Sitemap",
  "privacy-policy": "Privacy Policy",
  terms: "Terms of Use",
  disclaimer: "Disclaimer",
};

function Breadcrumb() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  return (
    <div className="bg-secondary/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
          <Home className="w-3 h-3" />
          Home
        </Link>
        {segments.map((seg, i) => (
          <span key={seg} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 opacity-50" />
            {i === segments.length - 1 ? (
              <span className="text-foreground font-medium capitalize">
                {breadcrumbMap[seg] ?? seg}
              </span>
            ) : (
              <Link
                to={"/" + segments.slice(0, i + 1).join("/")}
                className="hover:text-primary transition-colors capitalize"
              >
                {breadcrumbMap[seg] ?? seg}
              </Link>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PortalLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AccessibilityBar />
      <Navbar />
      <Breadcrumb />
      <main id="main-content" tabIndex={-1} className="flex-1 bg-background">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
