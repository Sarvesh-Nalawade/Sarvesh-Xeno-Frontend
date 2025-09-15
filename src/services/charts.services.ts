export async function getTotalRevenueMonthlyData() {
  const res = await fetch("http://localhost:8000/user/get-total-revenue", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch total revenue data");
  const revenueEntries = await res.json(); // Array of { total_price, timestamp }

  // Group by year and month
  const yearlyMonthly = new Map(); // { year: { month: total } }
  for (const entry of revenueEntries) {
    const date = new Date(entry.timestamp);
    const year = date.getFullYear();
    const month = date.getMonth();
    if (!yearlyMonthly.has(year)) yearlyMonthly.set(year, Array(12).fill(0));
    yearlyMonthly.get(year)[month] += entry.total_price;
  }

  // Get last 5 years, descending
  const years = Array.from(yearlyMonthly.keys()).sort((a, b) => b - a).slice(0, 5);
  years.sort((a, b) => a - b); // sort ascending for chart

  // Format for ApexCharts multi-series: [{ name: '2024', data: [..12 months..] }, ...]
  const series = years.map((year) => ({
    name: year.toString(),
    data: yearlyMonthly.get(year),
  }));

  return { series, years };
}

// ...rest of file unchanged...

export async function getDevicesUsedData(timeFrame) {
  // TODO: Replace with backend fetch or remove if not needed
  return [];
}

export async function getPaymentsOverviewData(timeFrame) {
  // TODO: Replace with backend fetch or remove if not needed
  return { received: [], due: [] };
}

export async function getWeeksProfitData(timeFrame) {
  const res = await fetch("http://localhost:8000/user/get-weeks-data", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch weeks data");
  const weekEntries = await res.json(); // Array of { total_price, timestamp, confirmed }

  // Find the latest timestamp in the data
  const timestamps = weekEntries.map((entry) => new Date(entry.timestamp));
  const latestTimestamp = new Date(Math.max(...timestamps.map(d => d.getTime())));

  // Find the start of 'this week' (6 days before the latest date)
  const endOfThisWeek = new Date(latestTimestamp);
  endOfThisWeek.setHours(0,0,0,0);
  const startOfThisWeek = new Date(endOfThisWeek);
  startOfThisWeek.setDate(endOfThisWeek.getDate() - 6);

  // 'Last week' is the previous 7 days
  const endOfLastWeek = new Date(startOfThisWeek);
  endOfLastWeek.setDate(startOfThisWeek.getDate() - 1);
  const startOfLastWeek = new Date(endOfLastWeek);
  startOfLastWeek.setDate(endOfLastWeek.getDate() - 6);

  function getWeekData(start, end) {
    // Days of week for x axis (Sat - Fri)
    const dayNames = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
    // Construct an array for each day in the week
    const sales = dayNames.map(name => ({ x: name, y: 0 }));
    const revenue = dayNames.map(name => ({ x: name, y: 0 }));

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayIndex = d.getDay(); // 0 (Sun) to 6 (Sat)
      const dayName = dayNames[dayIndex];
      // Find all entries for this day
      const dayEntries = weekEntries.filter((entry) => {
        const entryDate = new Date(entry.timestamp);
        return entryDate.toDateString() === d.toDateString();
      });
      // Set sales (sum of confirmed)
      const salesTotal = dayEntries.reduce((acc, entry) => acc + (entry.confirmed || 0), 0);
      const revenueTotal = dayEntries.reduce((acc, entry) => acc + (entry.total_price || 0), 0);
      // Find the index in sales/revenue arrays
      const idx = sales.findIndex(obj => obj.x === dayName);
      if (idx !== -1) {
        sales[idx].y = salesTotal;
        revenue[idx].y = revenueTotal;
      }
    }
    return { sales, revenue };
  }

  if (timeFrame === "last week") {
    return getWeekData(startOfLastWeek, endOfLastWeek);
  }
  // Default to 'this week'
  return getWeekData(startOfThisWeek, endOfThisWeek);
}

export async function getTopProductsByOrderData(timeFrame) {
  // TODO: Replace with backend fetch or remove if not needed
  return [];
}

export async function getTopCustomersByOrderData(timeFrame) {
  // TODO: Replace with backend fetch or remove if not needed
  return [];
}

export async function getTopOrdersByRevenueData(timeFrame) {
  // Fetch all orders data from backend
  const res = await fetch("http://localhost:8000/user/get-total-revenue", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch total revenue data");
  const orders = await res.json(); // Array of { total_price, timestamp }
  // Sort by total_price descending, take top 5
  const top5 = [...orders]
    .sort((a, b) => b.total_price - a.total_price)
    .slice(0, 5);
  return {
    labels: top5.map((order, i) => `Order ${i + 1} (${new Date(order.timestamp).toLocaleDateString()})`),
    values: top5.map(order => order.total_price),
    raw: top5,
  };
}

export async function getCampaignVisitorsData() {
  // TODO: Replace with backend fetch or remove if not needed
  return { total_visitors: 0, performance: 0, chart: [] };
}

export async function getVisitorsAnalyticsData() {
  // TODO: Replace with backend fetch or remove if not needed
  return [];
}

export async function getCostsPerInteractionData() {
  // TODO: Replace with backend fetch or remove if not needed
  return { avg_cost: 0, growth: 0, chart: [] };
}
