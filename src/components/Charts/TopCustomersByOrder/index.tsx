import { PeriodPicker } from "@/components/period-picker";
import { cn } from "@/lib/utils";
import { DonutChart } from "../used-devices/chart";

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

type PropsType = {
  data: Customer[];
  className?: string;
};

export function TopCustomersByOrder({ data, className }: PropsType) {

  // Process data for the chart: get top 5 customers by revenue
  const chartData = (data || [])
    .sort((a, b) => b.revenue_generated - a.revenue_generated)
    .slice(0, 5)
    .map(customer => ({
      name: customer.first_name,
      amount: customer.revenue_generated
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
          Top 5 Customers by Revenue
        </h2>

        {/* The timeFrame logic is removed as we now depend on the fetched data */}
        {/* <PeriodPicker defaultValue={"monthly"} sectionKey="top_customers_by_order" /> */}
      </div>

      <div className="grid place-items-center">
        <DonutChart data={chartData} />
      </div>
    </div>
  );
}
