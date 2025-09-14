import fs from "fs/promises";
import path from "path";
import * as logos from "@/assets/logos";

type Customer = {
  id: number;
  shop_id: number;
  timestamp: string;
  first_name: string;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  tags: string;
};

type Address = {
  id: number;
  customer_id: number;
  shop_id: number;
  city: string;
};

type Order = {
  id: number;
  customer_id: number;
  shop_id: number;
  total_price: number;
};

export async function getTopProducts() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const dataPath = path.join(process.cwd(), "data", "products.json");
  const data = await fs.readFile(dataPath, "utf-8");
  const products = JSON.parse(data);

  const variantsPath = path.join(process.cwd(), "data", "variants.json");
  const variantsData = await fs.readFile(variantsPath, "utf-8");
  const variants = JSON.parse(variantsData);

  const lineItemsPath = path.join(process.cwd(), "data", "line_items.json");
  const lineItemsData = await fs.readFile(lineItemsPath, "utf-8");
  const lineItems = JSON.parse(lineItemsData);

  return products.slice(0, 4).map((product: any) => {
    const productVariants = variants.filter(
      (v: any) => v.product_id === product.id,
    );
    const sold = lineItems
      .filter((li: any) => li.product_id === product.id)
      .reduce((acc: number, li: any) => acc + li.quantity, 0);
    const profit = sold * (productVariants[0]?.price || 0) * 0.1; // Assuming 10% profit margin and using first variant price

    return {
      name: product.title,
      category: product.product_type,
      price: productVariants[0]?.price || 0,
      sold,
      profit,
    };
  });
}

export async function getInvoiceTableData(page: number = 1, limit: number = 5) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const dataPath = path.join(process.cwd(), "data", "orders.json");
  const data = await fs.readFile(dataPath, "utf-8");
  const orders = JSON.parse(data);

  const lineItemsPath = path.join(process.cwd(), "data", "line_items.json");
  const lineItemsData = await fs.readFile(lineItemsPath, "utf-8");
  const lineItems = JSON.parse(lineItemsData);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedOrders = orders.slice(startIndex, endIndex).map((order: any) => {
    const items = lineItems.filter((li: any) => li.order_id === order.id);
    return {
      name: `Order #${order.order_number}`,
      price: order.total_price,
      date: order.timestamp,
      status: order.financial_status,
      quantity: items.reduce((acc: number, item: any) => acc + item.quantity, 0),
      discount: order.total_discount,
    };
  });

  return {
    data: paginatedOrders,
    totalOrders: orders.length,
  };
}

export async function getTopChannels() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const customersPath = path.join(process.cwd(), "data", "customers.json");
  const customersData = await fs.readFile(customersPath, "utf-8");
  const customers: Customer[] = JSON.parse(customersData);

  const addressesPath = path.join(process.cwd(), "data", "addresses.json");
  const addressesData = await fs.readFile(addressesPath, "utf-8");
  const addresses: Address[] = JSON.parse(addressesData);

  const ordersPath = path.join(process.cwd(), "data", "orders.json");
  const ordersData = await fs.readFile(ordersPath, "utf-8");
  const orders: Order[] = JSON.parse(ordersData);

  const customerRevenue: { [key: number]: number } = {};
  for (const order of orders) {
    if (order.customer_id) {
      customerRevenue[order.customer_id] =
        (customerRevenue[order.customer_id] || 0) + order.total_price;
    }
  }

  const topCustomers = customers
    .map((customer) => {
      const address = addresses.find((a) => a.customer_id === customer.id);
      return {
        name: `${customer.first_name} ${customer.last_name || ""}`.trim(),
        phone: customer.phone || "N/A",
        email: customer.email || "N/A",
        city: address?.city || "N/A",
        revenue: customerRevenue[customer.id] || 0,
        tag: customer.tags,
      };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return topCustomers;
}
