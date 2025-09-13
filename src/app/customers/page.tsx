import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { TopChannels } from "@/components/Tables/top-customers";
import { TopChannelsSkeleton } from "@/components/Tables/top-customers/skeleton";
import { UsedDevices } from "@/components/Charts/used-devices";
import { UsedDevicesSkeleton } from "@/components/Charts/used-devices/skeleton";
// import { TopProducts } from "@/components/Tables/top-products";
// import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";

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
        
        
        <Suspense fallback={<UsedDevicesSkeleton />}>
          <UsedDevices />
        </Suspense>

        <Suspense fallback={<TopChannelsSkeleton />}>
          <TopChannels />
        </Suspense>
      </div>
    </>
  );
};

export default TablesPage;
