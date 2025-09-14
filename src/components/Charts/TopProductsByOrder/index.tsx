import { cn } from "@/lib/utils";
import { DonutChart } from "../used-devices/chart";

// Define the Product type based on the backend model
interface Product {
  title: string;
  price: number;
  inv_item_qty: number;
  weight: number | null;
}

type PropsType = {
  data: Product[];
  className?: string;
};

export function TopProductsByOrder({ data, className }: PropsType) {

  // Process data for the chart: get top 5 products by inventory quantity
  const chartData = (data || [])
    .sort((a, b) => b.inv_item_qty - a.inv_item_qty)
    .slice(0, 5)
    .map(product => ({
      name: product.title,
      amount: product.inv_item_qty
    }));

  return (
    <div
      className={cn(
        "grid grid-cols-1 grid-rows-[auto_1fr] gap-9 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Top 5 Products by Inventory Quantity
        </h2>
      </div>

      <div className="grid place-items-center">
        <DonutChart data={chartData} />
      </div>
    </div>
  );
}