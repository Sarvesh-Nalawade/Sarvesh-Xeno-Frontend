import { getInvoiceTableData } from "@/components/Tables/fetch";

export default async function Home({ searchParams }: { searchParams?: { selected_time_frame?: string; invoicePage?: string; } }) {
  // const { selected_time_frame, invoicePage } = searchParams || {};
  // const currentPage = parseInt(invoicePage || "1");
  // const itemsPerPage = 5;
  // const { data: invoiceData, totalOrders } = await getInvoiceTableData(currentPage, itemsPerPage);
  // return <ClientHomePage invoiceData={invoiceData} totalOrders={totalOrders} currentPage={currentPage} selected_time_frame={selected_time_frame} />;
  return <div>Test page</div>;
}
