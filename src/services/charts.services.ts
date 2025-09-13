import { promises as fs } from "fs";
import path from "path";

export async function getDevicesUsedData(
  timeFrame?: "monthly" | "yearly" | (string & {}),
) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = [
    {
      name: "Desktop",
      percentage: 0.65,
      amount: 1625,
    },
    {
      name: "Tablet",
      percentage: 0.1,
      amount: 250,
    },
    {
      name: "Mobile",
      percentage: 0.2,
      amount: 500,
    },
    {
      name: "Unknown",
      percentage: 0.05,
      amount: 125,
    },
  ];

  if (timeFrame === "yearly") {
    data[0].amount = 19500;
    data[1].amount = 3000;
    data[2].amount = 6000;
    data[3].amount = 1500;
  }

  return data;
}

export async function getPaymentsOverviewData(
  timeFrame?: "monthly" | "yearly" | (string & {}),
) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const ordersPath = path.join(process.cwd(), "data", "orders.json");
  const ordersData = await fs.readFile(ordersPath, "utf-8");
  const orders: {
    created_at: string;
    total_price: string;
    financial_status: "paid" | "pending";
  }[] = JSON.parse(ordersData);

  if (timeFrame === "yearly") {
    const yearlyData = orders.reduce(
      (acc, order) => {
        const year = new Date(order.created_at).getFullYear();
        const price = parseFloat(order.total_price);
        if (!acc[year]) {
          acc[year] = { received: 0, due: 0 };
        }
        if (order.financial_status === "paid") {
          acc[year].received += price;
        } else {
          acc[year].due += price;
        }
        return acc;
      },
      {} as Record<number, { received: number; due: number }>,
    );

    const received = Object.entries(yearlyData).map(([year, data]) => ({
      x: parseInt(year),
      y: data.received,
    }));
    const due = Object.entries(yearlyData).map(([year, data]) => ({
      x: parseInt(year),
      y: data.due,
    }));

    return { received, due };
  }

  const monthlyData = orders.reduce(
    (acc, order) => {
      const month = new Date(order.created_at).toLocaleString("default", {
        month: "short",
      });
      const price = parseFloat(order.total_price);
      if (!acc[month]) {
        acc[month] = { received: 0, due: 0 };
      }
      if (order.financial_status === "paid") {
        acc[month].received += price;
      } else {
        acc[month].due += price;
      }
      return acc;
    },
    {} as Record<string, { received: number; due: number }>,
  );

  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const received = monthOrder.map((month) => ({
    x: month,
    y: monthlyData[month]?.received || 0,
  }));
  const due = monthOrder.map((month) => ({
    x: month,
    y: monthlyData[month]?.due || 0,
  }));

  return { received, due };
}

export async function getWeeksProfitData(timeFrame?: string) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const ordersPath = path.join(process.cwd(), "data", "orders.json");
  const ordersData = await fs.readFile(ordersPath, "utf-8");
  const orders: {
    created_at: string;
    total_price: string;
    financial_status: "paid" | "pending";
  }[] = JSON.parse(ordersData);

  const now = new Date();
  const today = now.getDay(); // 0 (Sun) to 6 (Sat)

  const getWeekData = (startDate: Date) => {
    const weekData: { sales: { x: string; y: number }[], revenue: { x: string; y: number }[] } = {
      sales: [
        { x: "Sat", y: 0 },
        { x: "Sun", y: 0 },
        { x: "Mon", y: 0 },
        { x: "Tue", y: 0 },
        { x: "Wed", y: 0 },
        { x: "Thu", y: 0 },
        { x: "Fri", y: 0 },
      ],
      revenue: [
        { x: "Sat", y: 0 },
        { x: "Sun", y: 0 },
        { x: "Mon", y: 0 },
        { x: "Tue", y: 0 },
        { x: "Wed", y: 0 },
        { x: "Thu", y: 0 },
        { x: "Fri", y: 0 },
      ],
    };

    const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      const dayStr = dayMap[day.getDay()];

      const ordersForDay = orders.filter((order) => {
        const orderDate = new Date(order.created_at);
        return orderDate.toDateString() === day.toDateString();
      });

      const dayIndex = weekData.sales.findIndex(d => d.x === dayStr);
      if(dayIndex !== -1) {
        weekData.sales[dayIndex].y = ordersForDay.length;
        weekData.revenue[dayIndex].y = ordersForDay.reduce((acc, order) => {
          if (order.financial_status === "paid") {
            return acc + parseFloat(order.total_price);
          }
          return acc;
        }, 0);
      }
    }
    return weekData;
  };

  if (timeFrame === "last week") {
    const lastWeekStartDate = new Date(now);
    lastWeekStartDate.setDate(now.getDate() - today - 7);
    return getWeekData(lastWeekStartDate);
  }

  // Default to "this week"
  const thisWeekStartDate = new Date(now);
  thisWeekStartDate.setDate(now.getDate() - today);
  return getWeekData(thisWeekStartDate);
}

export async function getTopProductsByOrderData(
  timeFrame?: "monthly" | "yearly" | (string & {}),
) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const lineItemsPath = path.join(process.cwd(), "data", "line_items.json");
  const productsPath = path.join(process.cwd(), "data", "products.json");

  const [lineItemsData, productsData] = await Promise.all([
    fs.readFile(lineItemsPath, "utf-8"),
    fs.readFile(productsPath, "utf-8"),
  ]);

  const lineItems: { product_id: string; quantity: number }[] =
    JSON.parse(lineItemsData);
  const products: { id: string; title: string }[] = JSON.parse(productsData);

  const productQuantities = lineItems.reduce(
    (acc, item) => {
      acc[item.product_id] = (acc[item.product_id] || 0) + item.quantity;
      return acc;
    },
    {} as Record<string, number>,
  );

  const sortedProducts = Object.entries(productQuantities)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const totalQuantity = sortedProducts.reduce(
    (sum, [, quantity]) => sum + (quantity as number),
    0,
  );

  const topProducts = sortedProducts.map(([productId, quantity]) => {
    const product = products.find((p) => p.id === productId);
    return {
      name: product ? product.title : "Unknown Product",
      amount: quantity as number,
      percentage: totalQuantity > 0 ? (quantity as number) / totalQuantity : 0,
    };
  });

  if (timeFrame === "yearly") {
    topProducts.forEach((item) => (item.amount *= 12)); // This logic might need adjustment based on real data
  }

  return topProducts;
}

export async function getTopCustomersByOrderData(
  timeFrame?: "monthly" | "yearly" | (string & {}),
) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const ordersPath = path.join(process.cwd(), "data", "orders.json");
  const customersPath = path.join(process.cwd(), "data", "customers.json");

  const [ordersData, customersData] = await Promise.all([
    fs.readFile(ordersPath, "utf-8"),
    fs.readFile(customersPath, "utf-8"),
  ]);

  const orders: { customer_id: string }[] = JSON.parse(ordersData);
  const customers: { id: string; first_name: string; last_name: string }[] =
    JSON.parse(customersData);

  const customerOrderCounts = orders.reduce(
    (acc, order) => {
      if (order.customer_id) {
        acc[order.customer_id] = (acc[order.customer_id] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const sortedCustomers = Object.entries(customerOrderCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const totalOrders = sortedCustomers.reduce(
    (sum, [, count]) => sum + (count as number),
    0,
  );

  const topCustomers = sortedCustomers.map(([customerId, count]) => {
    const customer = customers.find((c) => c.id === customerId);
    return {
      name: customer
        ? `${customer.first_name} ${customer.last_name}`
        : "Unknown Customer",
      amount: count as number,
      percentage: totalOrders > 0 ? (count as number) / totalOrders : 0,
    };
  });

  if (timeFrame === "yearly") {
    topCustomers.forEach((item) => (item.amount *= 12)); // This logic might need adjustment based on real data
  }

  return topCustomers;
}

export async function getTopOrdersByRevenueData(
  timeFrame?: "monthly" | "yearly" | (string & {}),
) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const ordersPath = path.join(process.cwd(), "data", "orders.json");
  const ordersData = await fs.readFile(ordersPath, "utf-8");
  const orders: { order_number: string; total_price: string }[] =
    JSON.parse(ordersData);

  const sortedOrders = orders
    .sort((a, b) => parseFloat(b.total_price) - parseFloat(a.total_price))
    .slice(0, 5);

  const totalRevenue = sortedOrders.reduce(
    (sum, order) => sum + parseFloat(order.total_price),
    0,
  );

  const topOrders = sortedOrders.map((order) => {
    const revenue = parseFloat(order.total_price);
    return {
      name: `Order #${order.order_number}`,
      amount: revenue,
      percentage: totalRevenue > 0 ? revenue / totalRevenue : 0,
    };
  });

  if (timeFrame === "yearly") {
    topOrders.forEach((item) => (item.amount *= 12)); // This logic might need adjustment based on real data
  }

  return topOrders;
}

export async function getCampaignVisitorsData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    total_visitors: 784_000,
    performance: -1.5,
    chart: [
      { x: "S", y: 168 },
      { x: "S", y: 385 },
      { x: "M", y: 201 },
      { x: "T", y: 298 },
      { x: "W", y: 187 },
      { x: "T", y: 195 },
      { x: "F", y: 291 },
    ],
  };
}

export async function getVisitorsAnalyticsData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112, 123, 212, 270,
    190, 310, 115, 90, 380, 112, 223, 292, 170, 290, 110, 115, 290, 380, 312,
  ].map((value, index) => ({ x: index + 1 + "", y: value }));
}

export async function getCostsPerInteractionData() {
  return {
    avg_cost: 560.93,
    growth: 2.5,
    chart: [
      {
        name: "Google Ads",
        data: [
          { x: "Sep", y: 15 },
          { x: "Oct", y: 12 },
          { x: "Nov", y: 61 },
          { x: "Dec", y: 118 },
          { x: "Jan", y: 78 },
          { x: "Feb", y: 125 },
          { x: "Mar", y: 165 },
          { x: "Apr", y: 61 },
          { x: "May", y: 183 },
          { x: "Jun", y: 238 },
          { x: "Jul", y: 237 },
          { x: "Aug", y: 235 },
        ],
      },
      {
        name: "Facebook Ads",
        data: [
          { x: "Sep", y: 75 },
          { x: "Oct", y: 77 },
          { x: "Nov", y: 151 },
          { x: "Dec", y: 72 },
          { x: "Jan", y: 7 },
          { x: "Feb", y: 58 },
          { x: "Mar", y: 60 },
          { x: "Apr", y: 185 },
          { x: "May", y: 239 },
          { x: "Jun", y: 135 },
          { x: "Jul", y: 119 },
          { x: "Aug", y: 124 },
        ],
      },
    ],
  };
}