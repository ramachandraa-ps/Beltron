import { districtCoverage } from "@/lib/dashboard-data.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";

export default function DistrictCoverage() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          District Coverage
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
          {districtCoverage.map((d) => (
            <div key={d.district} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    d.status === "active" ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                <span className="text-sm font-medium">{d.district}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{d.projects} projects</span>
                <Badge
                  variant={d.status === "active" ? "default" : "secondary"}
                  className="text-[10px] px-1.5 py-0"
                >
                  {d.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
