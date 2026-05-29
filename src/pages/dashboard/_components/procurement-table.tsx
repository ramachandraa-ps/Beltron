import { procurementOrders } from "@/lib/dashboard-data.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { ShoppingCart } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";

const statusStyle: Record<string, string> = {
  delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "in-transit": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  delayed: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  processing: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

export default function ProcurementTable() {
  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-primary" />
          Recent Procurement Orders
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">PO ID</TableHead>
              <TableHead className="text-xs">Item</TableHead>
              <TableHead className="text-xs hidden md:table-cell">Vendor</TableHead>
              <TableHead className="text-xs hidden lg:table-cell">Qty</TableHead>
              <TableHead className="text-xs">Value</TableHead>
              <TableHead className="text-xs hidden sm:table-cell">Delivery Due</TableHead>
              <TableHead className="text-xs">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {procurementOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="text-xs font-mono">{order.id}</TableCell>
                <TableCell className="text-xs max-w-[200px] truncate">{order.item}</TableCell>
                <TableCell className="text-xs hidden md:table-cell max-w-[160px] truncate">
                  {order.vendor}
                </TableCell>
                <TableCell className="text-xs hidden lg:table-cell">{order.qty}</TableCell>
                <TableCell className="text-xs font-medium">{order.value}</TableCell>
                <TableCell className="text-xs hidden sm:table-cell">{order.deliveryDue}</TableCell>
                <TableCell>
                  <Badge
                    className={`text-[10px] px-1.5 py-0 border-0 capitalize ${statusStyle[order.status]}`}
                  >
                    {order.status.replace("-", " ")}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
