import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";
import { monthlyTenderData } from "@/lib/dashboard-data.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { TrendingUp } from "lucide-react";

export default function TenderAnalyticsChart() {
  const totalPublished = monthlyTenderData.reduce((s, d) => s + d.published, 0);
  const totalAwarded = monthlyTenderData.reduce((s, d) => s + d.awarded, 0);
  const totalValue = monthlyTenderData.reduce((s, d) => s + d.value, 0);

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Tender Activity (12 Months)
          </CardTitle>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>Published: <strong className="text-foreground">{totalPublished}</strong></span>
            <span>Awarded: <strong className="text-foreground">{totalAwarded}</strong></span>
            <span>Value: <strong className="text-foreground">{"\u20B9"} {totalValue.toFixed(1)} Cr</strong></span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthlyTenderData} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.01 240)" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11 }}
                stroke="oklch(0.5 0.03 250)"
              />
              <YAxis yAxisId="count" tick={{ fontSize: 11 }} stroke="oklch(0.5 0.03 250)" />
              <YAxis yAxisId="value" orientation="right" tick={{ fontSize: 11 }} stroke="oklch(0.5 0.03 250)" />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid oklch(0.88 0.01 240)",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar yAxisId="count" dataKey="published" fill="oklch(0.52 0.19 250)" name="Published" radius={[3, 3, 0, 0]} />
              <Bar yAxisId="count" dataKey="awarded" fill="oklch(0.62 0.15 160)" name="Awarded" radius={[3, 3, 0, 0]} />
              <Line
                yAxisId="value"
                type="monotone"
                dataKey="value"
                stroke="oklch(0.72 0.18 50)"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Value (Cr)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
