
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

// Define the Customer type based on the backend model
interface Customer {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  revenue_generated: number;
  tags: string | null;
}

export function TopCustomersTable({ data, className }: { data: Customer[], className?: string }) {

  // Process data for the table: get top 5 customers by revenue
  const topCustomers = (data || [])
    .sort((a, b) => b.revenue_generated - a.revenue_generated)
    .slice(0, 5);

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Top 5 Customers by Revenue
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center">
            <TableHead className="min-w-[120px] !text-left">Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="!text-right">Email</TableHead>
            <TableHead>Revenue generated</TableHead>
            <TableHead>Tag</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {topCustomers.map((customer) => (
            <TableRow
              className="text-center text-base font-medium text-dark dark:text-white"
              key={customer.id}
            >
              <TableCell className="flex min-w-fit items-center gap-3 text-left">
                {customer.first_name} {customer.last_name}
              </TableCell>

              <TableCell>{customer.phone || "N/A"}</TableCell>

              <TableCell className="!text-right text-green-light-1">
                {customer.email || "N/A"}
              </TableCell>

              <TableCell>₹ {customer.revenue_generated.toFixed(2)}</TableCell>
              <TableCell>{customer.tags || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
