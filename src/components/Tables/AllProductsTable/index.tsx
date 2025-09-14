
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Define the Product type based on the backend model
interface Product {
  title: string;
  price: number;
  inv_item_qty: number;
  weight: number | null;
}

export function AllProductsTable({ data, className }: { data: Product[], className?: string }) {
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
        All Products
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
          {currentItems.map((product) => (
            <TableRow
              className="text-center text-base font-medium text-dark dark:text-white"
              key={product.title}
            >
              <TableCell className="flex min-w-fit items-center gap-3 text-left">
                {product.title}
              </TableCell>

              <TableCell>${product.price.toFixed(2)}</TableCell>

              <TableCell>{product.inv_item_qty}</TableCell>

              <TableCell>{product.weight || "N/A"}</TableCell>
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
