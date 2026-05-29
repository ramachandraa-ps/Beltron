import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import AuthCallback from "./pages/auth/Callback.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { LanguageProvider } from "./lib/language-context.tsx";
import PortalLayout from "./components/portal-layout.tsx";
import TendersPage from "./pages/tenders/page.tsx";
import CircularsPage from "./pages/circulars/page.tsx";
import CareersPage from "./pages/careers/page.tsx";
import DashboardPage from "./pages/dashboard/page.tsx";
import AccessibilityPage from "./pages/compliance/accessibility.tsx";
import SitemapPage from "./pages/compliance/sitemap.tsx";
import PrivacyPolicyPage from "./pages/compliance/privacy-policy.tsx";
import TermsPage from "./pages/compliance/terms.tsx";
import DisclaimerPage from "./pages/compliance/disclaimer.tsx";
import ProfilePage from "./pages/profile/page.tsx";
import DocumentsPage from "./pages/documents/page.tsx";
import GrievancesPage from "./pages/grievances/page.tsx";
import EmployeeRequestsPage from "./pages/employee-requests/page.tsx";
import EmpanelmentPage from "./pages/empanelment/page.tsx";
import ProjectsPage from "./pages/projects/page.tsx";
import AboutPage from "./pages/about/page.tsx";
import VisionMissionPage from "./pages/about/vision-mission/page.tsx";
import ScrollToTop from "./components/scroll-to-top.tsx";
import ChatbotWidget from "./components/chatbot-widget.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Homepage — uses its own layout with hero */}
            <Route path="/" element={<Index />} />

            {/* Portal pages — shared layout with breadcrumb */}
            <Route element={<PortalLayout />}>
              <Route path="/tenders" element={<TendersPage />} />
              <Route path="/circulars" element={<CircularsPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/grievances" element={<GrievancesPage />} />
              <Route path="/employee-requests" element={<EmployeeRequestsPage />} />
              <Route path="/empanelment" element={<EmpanelmentPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about/vision-mission" element={<VisionMissionPage />} />
              <Route path="/accessibility" element={<AccessibilityPage />} />
              <Route path="/sitemap" element={<SitemapPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <ChatbotWidget />
      </LanguageProvider>
    </DefaultProviders>
  );
}
