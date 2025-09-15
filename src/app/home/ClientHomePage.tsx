"use client";

import { PaymentsOverview } from "@/components/Charts/payments-overview";
import { TopOrdersByRevenue } from "@/components/Charts/TopOrdersByRevenue";
import { WeeksProfit } from "@/components/Charts/weeks-profit";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense } from "react";
import { InvoiceTable } from "@/components/Tables/invoice-table";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";
import TotalRevenueLineGraph from "@/components/Charts/total-revenue-line";
import { RegionLabels } from "./_components/region-labels";

interface ClientHomePageProps {
  invoiceData: any;
  totalOrders: number;
  currentPage: number;
  selected_time_frame?: string;
}

export function ClientHomePage({ invoiceData, totalOrders, currentPage, selected_time_frame }: ClientHomePageProps) {
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);
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
        <div className="col-span-12">
          <TotalRevenueLineGraph />
        </div>
        <div className="col-span-12">
          <Suspense fallback={null}>
            <InvoiceTable data={invoiceData} totalOrders={totalOrders} currentPage={currentPage} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

