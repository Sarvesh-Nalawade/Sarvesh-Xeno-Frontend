"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getTotalRevenueMonthlyData } from "@/services/charts.services";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TotalRevenueLineGraph() {
  const [data, setData] = useState<{ x: string; y: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTotalRevenueMonthlyData()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-12 text-center">Loading...</div>;
  if (error) return <div className="py-12 text-center text-red-500">Error: {error}</div>;

  const chartOptions = {
    chart: {
      type: "line",
      toolbar: { show: true },
      zoom: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#5750F1"],
    },
    markers: {
      size: 5,
      colors: ["#0ABEF9"],
      strokeColors: "#5750F1",
      strokeWidth: 2,
      hover: {
        size: 8,
      },
    },
    xaxis: {
      categories: data.map((d) => d.x),
      labels: { rotate: -45, style: { fontSize: "12px" } },
      title: { text: "Month", style: { fontWeight: 700 } },
    },
    yaxis: {
      labels: { style: { fontSize: "12px" } },
      title: { text: "Total Revenue", style: { fontWeight: 700 } },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}`,
      },
    },
    colors: ["#5750F1"],
    grid: { strokeDashArray: 6 },
    dataLabels: { enabled: false },
    legend: { show: false },
  };

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card mt-7">
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Total Revenue (Last 5 Years)
      </h2>
      <Chart
        options={chartOptions}
        series={[{ name: "Total Revenue", data: data.map((d) => d.y) }]}
        type="line"
        height={380}
      />
    </div>
  );
}

