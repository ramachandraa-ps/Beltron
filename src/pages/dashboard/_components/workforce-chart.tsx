import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { workforceByDivision } from "@/lib/dashboard-data.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Users } from "lucide-react";

export default function WorkforceChart() {
  const totalDeployed = workforceByDivision.reduce((s, d) => s + d.deployed, 0);
  const totalAvailable = workforceByDivision.reduce((s, d) => s + d.available, 0);

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            IT Manpower — Division-wise Deployment
          </CardTitle>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>Deployed: <strong className="text-foreground">{totalDeployed.toLocaleString()}</strong></span>
            <span>Available: <strong className="text-foreground">{totalAvailable.toLocaleString()}</strong></span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workforceByDivision} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.01 240)" />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="oklch(0.5 0.03 250)" />
              <YAxis
                dataKey="division"
                type="category"
                width={70}
                tick={{ fontSize: 11 }}
                stroke="oklch(0.5 0.03 250)"
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid oklch(0.88 0.01 240)",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="deployed" fill="oklch(0.52 0.19 250)" name="Deployed" radius={[0, 3, 3, 0]} />
              <Bar dataKey="available" fill="oklch(0.72 0.18 50)" name="Available" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
