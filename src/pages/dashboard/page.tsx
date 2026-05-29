import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { BarChart3, FolderKanban, ShoppingCart } from "lucide-react";
import SummaryCards from "./_components/summary-cards.tsx";
import TenderAnalyticsChart from "./_components/tender-analytics-chart.tsx";
import ServiceDistributionChart from "./_components/service-distribution-chart.tsx";
import WorkforceChart from "./_components/workforce-chart.tsx";
import DistrictCoverage from "./_components/district-coverage.tsx";
import ProjectTracker from "./_components/project-tracker.tsx";
import ProcurementTable from "./_components/procurement-table.tsx";
import AnimatedPage from "@/components/animated-page.tsx";

export default function DashboardPage() {
  return (
    <AnimatedPage className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          Governance Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time analytics and project tracking for BELTRON operations
        </p>
      </div>

      {/* Summary stats */}
      <SummaryCards />

      {/* Tabbed sections */}
      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-3 gap-1">
          <TabsTrigger value="analytics" className="gap-1.5 cursor-pointer">
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="gap-1.5 cursor-pointer">
            <FolderKanban className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Projects</span>
          </TabsTrigger>
          <TabsTrigger value="procurement" className="gap-1.5 cursor-pointer">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Procurement</span>
          </TabsTrigger>
        </TabsList>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <TenderAnalyticsChart />
            <ServiceDistributionChart />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <WorkforceChart />
            <DistrictCoverage />
          </div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <ProjectTracker />
        </TabsContent>

        {/* Procurement Tab */}
        <TabsContent value="procurement" className="space-y-4">
          <ProcurementTable />
        </TabsContent>
      </Tabs>
    </AnimatedPage>
  );
}
