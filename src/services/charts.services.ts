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

  if (timeFrame === "yearly") {
    return {
      received: [
        { x: 2020, y: 450 },
        { x: 2021, y: 620 },
        { x: 2022, y: 780 },
        { x: 2023, y: 920 },
        { x: 2024, y: 1080 },
      ],
      due: [
        { x: 2020, y: 1480 },
        { x: 2021, y: 1720 },
        { x: 2022, y: 1950 },
        { x: 2023, y: 2300 },
        { x: 2024, y: 1200 },
      ],
    };
  }

  return {
    received: [
      { x: "Jan", y: 0 },
      { x: "Feb", y: 20 },
      { x: "Mar", y: 35 },
      { x: "Apr", y: 45 },
      { x: "May", y: 35 },
      { x: "Jun", y: 55 },
      { x: "Jul", y: 65 },
      { x: "Aug", y: 50 },
      { x: "Sep", y: 65 },
      { x: "Oct", y: 75 },
      { x: "Nov", y: 60 },
      { x: "Dec", y: 75 },
    ],
    due: [
      { x: "Jan", y: 15 },
      { x: "Feb", y: 9 },
      { x: "Mar", y: 17 },
      { x: "Apr", y: 32 },
      { x: "May", y: 25 },
      { x: "Jun", y: 68 },
      { x: "Jul", y: 80 },
      { x: "Aug", y: 68 },
      { x: "Sep", y: 84 },
      { x: "Oct", y: 94 },
      { x: "Nov", y: 74 },
      { x: "Dec", y: 62 },
    ],
  };
}

export async function getWeeksProfitData(timeFrame?: string) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (timeFrame === "last week") {
    return {
      sales: [
        { x: "Sat", y: 33 },
        { x: "Sun", y: 44 },
        { x: "Mon", y: 31 },
        { x: "Tue", y: 57 },
        { x: "Wed", y: 12 },
        { x: "Thu", y: 33 },
        { x: "Fri", y: 55 },
      ],
      revenue: [
        { x: "Sat", y: 10 },
        { x: "Sun", y: 20 },
        { x: "Mon", y: 17 },
        { x: "Tue", y: 7 },
        { x: "Wed", y: 10 },
        { x: "Thu", y: 23 },
        { x: "Fri", y: 13 },
      ],
    };
  }

  return {
    sales: [
      { x: "Sat", y: 44 },
      { x: "Sun", y: 55 },
      { x: "Mon", y: 41 },
      { x: "Tue", y: 67 },
      { x: "Wed", y: 22 },
      { x: "Thu", y: 43 },
      { x: "Fri", y: 65 },
    ],
    revenue: [
      { x: "Sat", y: 13 },
      { x: "Sun", y: 23 },
      { x: "Mon", y: 20 },
      { x: "Tue", y: 8 },
      { x: "Wed", y: 13 },
      { x: "Thu", y: 27 },
      { x: "Fri", y: 15 },
    ],
  };
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