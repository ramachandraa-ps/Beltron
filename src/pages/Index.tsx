import AccessibilityBar from "./home/_components/accessibility-bar.tsx";
import Navbar from "./home/_components/navbar.tsx";
import HeroSection from "./home/_components/hero-section.tsx";
import ImpactMetrics from "./home/_components/impact-metrics.tsx";
import PersonaSection from "./home/_components/persona-section.tsx";
import InfoPanels from "./home/_components/info-panels.tsx";
import ServicesSection from "./home/_components/services-section.tsx";
import NewsSection from "./home/_components/news-section.tsx";
import Footer from "./home/_components/footer.tsx";
import AnimatedDivider from "@/components/animated-divider.tsx";
import LeadershipSection from "./home/_components/leadership-section.tsx";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* GIGW: Accessibility toolbar at top */}
      <AccessibilityBar />

      {/* Main header / navigation */}
      <Navbar />

      {/* Main content landmark */}
      <main id="main-content" tabIndex={-1} className="flex-1">
        <HeroSection />
        <ImpactMetrics />
        <AnimatedDivider />
        <LeadershipSection />
        <AnimatedDivider />
        <PersonaSection />
        <InfoPanels />
        <AnimatedDivider />
        <ServicesSection />
        <AnimatedDivider />
        <NewsSection />
      </main>

      {/* GIGW-compliant footer */}
      <Footer />
    </div>
  );
}
