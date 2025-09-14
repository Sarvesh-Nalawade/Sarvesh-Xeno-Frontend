import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// Define the Product type based on the backend model
interface Product {
  title: string;
  price: number;
  inv_item_qty: number;
  weight: number | null;
}

export function TopProductsTable({ data, className }: { data: Product[], className?: string }) {

  // Process data for the table: get top 5 products by inventory quantity
  const topProducts = (data || [])
    .sort((a, b) => b.inv_item_qty - a.inv_item_qty)
    .slice(0, 5);

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Top 5 Products by Inventory Quantity
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center">
            <TableHead className="min-w-[120px] !text-left">Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Inventory Quantity</TableHead>
            <TableHead>Weight</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {topProducts.map((product) => (
            <TableRow
              className="text-center text-base font-medium text-dark dark:text-white"
              key={product.title}
            >
              <TableCell className="flex min-w-fit items-center gap-3 text-left">
                {product.title}
              </TableCell>

              <TableCell>₹ {product.price.toFixed(2)}</TableCell>

              <TableCell>{product.inv_item_qty}</TableCell>

              <TableCell>{product.weight || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}