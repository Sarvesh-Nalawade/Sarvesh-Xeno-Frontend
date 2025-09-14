import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useState } from "react";

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

export function AllCustomersTable({ data, className }: { data: Customer[], className?: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (data || []).slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil((data || []).length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        All Customers
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
          {currentItems.map((customer) => (
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

              <TableCell>{customer.revenue_generated.toFixed(2)}</TableCell>
              <TableCell>{customer.tags || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-dark dark:text-white disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-sm font-medium text-dark dark:text-white">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-dark dark:text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}