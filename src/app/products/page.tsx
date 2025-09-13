import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { TopChannels } from "@/components/Tables/top-customers";
// import { TopChannelsSkeleton } from "@/components/Tables/top-customers/skeleton";
import { TopProducts } from "@/components/Tables/top-products";
import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";
import { TopProductsByOrder } from "@/components/Charts/TopProductsByOrder";
import { UsedDevicesSkeleton } from "@/components/Charts/used-devices/skeleton";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tables",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="space-y-10">
        {/* <Suspense fallback={<TopChannelsSkeleton />}>
          <TopChannels />
        </Suspense> */}
        
        <Suspense fallback={<UsedDevicesSkeleton />}>
          <TopProductsByOrder />
        </Suspense>

        <Suspense fallback={<TopProductsSkeleton />}>
          <TopProducts />
        </Suspense>

        
      </div>
    </>
  );
};

export default TablesPage;
