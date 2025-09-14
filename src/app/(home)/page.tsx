import { PaymentsOverview } from "@/components/Charts/payments-overview";
import { TopOrdersByRevenue } from "@/components/Charts/TopOrdersByRevenue";
import { WeeksProfit } from "@/components/Charts/weeks-profit";
// import { TopChannels } from "@/components/Tables/top-customers";
// import { TopChannelsSkeleton } from "@/components/Tables/top-customers/skeleton";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense } from "react";
import { InvoiceTable } from "@/components/Tables/invoice-table";
import { getInvoiceTableData } from "@/components/Tables/fetch";
// import { ChatsCard } from "./_components/chats-card";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";
import { RegionLabels } from "./_components/region-labels";

type PropsType = {
  searchParams: {
    selected_time_frame?: string;
    invoicePage?: string;
  };
};

export default async function Home({ searchParams }: PropsType) {
  const { selected_time_frame, invoicePage } = searchParams;
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

  const currentPage = parseInt(invoicePage || "1");
  const itemsPerPage = 5;

  const { data: invoiceData, totalOrders } = await getInvoiceTableData(currentPage, itemsPerPage);

  return (
    <>
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewCardsGroup />
      </Suspense>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">

        <PaymentsOverview
          className="col-span-12 xl:col-span-12"
          key={extractTimeFrame("payments_overview")}
          timeFrame={extractTimeFrame("payments_overview")?.split(":")[1]}
        />

        <WeeksProfit
          key={extractTimeFrame("weeks_profit")}
          timeFrame={extractTimeFrame("weeks_profit")?.split(":")[1]}
          className="col-span-12 xl:col-span-12"
        />

        <TopOrdersByRevenue
          className="col-span-12 xl:col-span-12"
          key={extractTimeFrame("used_devices")}
          timeFrame={extractTimeFrame("used_devices")?.split(":")[1]}
        />

        

        {/* <div className="col-span-12">
          <Suspense fallback={<TopChannelsSkeleton />}>
            <TopChannels />
          </Suspense>
        </div> */}

        <div className="col-span-12">
          <Suspense fallback={null}>
            <InvoiceTable data={invoiceData} totalOrders={totalOrders} currentPage={currentPage} />
          </Suspense>
        </div>
      </div>
    </>
  );
}