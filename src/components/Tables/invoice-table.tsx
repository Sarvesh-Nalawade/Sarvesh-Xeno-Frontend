"use client";

import { TrashIcon } from "@/assets/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { DownloadIcon, PreviewIcon } from "./icons";
import { useState } from "react";

type InvoiceTableProps = {
  data: Array<any>;
  className?: string;
};

type SortDirection = 'asc' | 'desc';

export function InvoiceTable({ data, className }: InvoiceTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isSortedByTimestamp, setIsSortedByTimestamp] = useState(false);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Sorting logic
  let displayedData = [...(data || [])];
  if (isSortedByTimestamp) {
    displayedData.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(displayedData.length / itemsPerPage);

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

  const handleSortByTimestamp = () => {
    if (!isSortedByTimestamp) {
      setIsSortedByTimestamp(true);
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setIsSortedByTimestamp(false);
    }
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          All Order Detail Table
        </h2>
        <button
          onClick={handleSortByTimestamp}
          className={`px-4 py-2 text-sm font-medium border rounded-md disabled:opacity-50 transition-all duration-200 ${isSortedByTimestamp ? 'bg-pink-600 text-white border-4 border-yellow-400 font-extrabold shadow-lg scale-110' : 'text-dark dark:text-white'}`}
        >
          Sort by Timestamp{isSortedByTimestamp ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ''}
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
            <TableHead className="min-w-[155px] xl:pl-7.5">Order ID</TableHead>
            <TableHead>Invoice Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems.map((item: { name: string; price: number; date: string; status: string; quantity: number; discount: number }, index: number) => (
            <TableRow key={index} className="border-[#eee] dark:border-3">
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.name}</h5>
              </TableCell>

              <TableCell>
                <p className="text-dark dark:text-white">
                  {dayjs(item.date).format("MMM DD, YYYY")}
                </p>
              </TableCell>

              <TableCell>
                <div
                  className={cn(
                    "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                    {
                      "bg-[#219653]/[0.08] text-[#219653]":
                        item.status === "Paid",
                      "bg-[#D34053]/[0.08] text-[#D34053]":
                        item.status === "Unpaid",
                      "bg-[#FFA70B]/[0.08] text-[#FFA70B]":
                        item.status === "Pending",
                    },
                  )}
                >
                  {item.status}
                </div>
              </TableCell>

              <TableCell>
                <p className="text-dark dark:text-white">{item.quantity}</p>
              </TableCell>

              <TableCell>
                <p className="text-dark dark:text-white">₹ {typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</p>
              </TableCell>
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
