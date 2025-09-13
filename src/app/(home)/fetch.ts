import { promises as fs } from "fs";
import path from "path";

export async function getOverviewData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const ordersPath = path.join(process.cwd(), "data", "orders.json");
  const productsPath = path.join(process.cwd(), "data", "products.json");
  const customersPath = path.join(process.cwd(), "data", "customers.json");

  const [ordersData, productsData, customersData] = await Promise.all([
    fs.readFile(ordersPath, "utf-8"),
    fs.readFile(productsPath, "utf-8"),
    fs.readFile(customersPath, "utf-8"),
  ]);

  const orders: { total_price: string }[] = JSON.parse(ordersData);
  const products = JSON.parse(productsData);
  const customers = JSON.parse(customersData);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + parseFloat(order.total_price),
    0,
  );

  return {
    views: {
      value: 2456, // This can be updated if view data becomes available
      growthRate: 0.43,
    },
    profit: {
      value: totalRevenue,
      growthRate: 4.35, // This should be calculated based on historical data if available
    },
    products: {
      value: products.length,
      growthRate: 2.59, // This should be calculated
    },
    users: {
      value: customers.length,
      growthRate: -0.95, // This should be calculated
    },
  };
}

export async function getChatsData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      name: "Jacob Jones",
      profile: "/images/user/user-01.png",
      isActive: true,
      lastMessage: {
        content: "See you tomorrow at the meeting!",
        type: "text",
        timestamp: "2024-12-19T14:30:00Z",
        isRead: false,
      },
      unreadCount: 3,
    },
    {
      name: "Wilium Smith",
      profile: "/images/user/user-03.png",
      isActive: true,
      lastMessage: {
        content: "Thanks for the update",
        type: "text",
        timestamp: "2024-12-19T10:15:00Z",
        isRead: true,
      },
      unreadCount: 0,
    },
    {
      name: "Johurul Haque",
      profile: "/images/user/user-04.png",
      isActive: false,
      lastMessage: {
        content: "What's up?",
        type: "text",
        timestamp: "2024-12-19T10:15:00Z",
        isRead: true,
      },
      unreadCount: 0,
    },
    {
      name: "M. Chowdhury",
      profile: "/images/user/user-05.png",
      isActive: false,
      lastMessage: {
        content: "Where are you now?",
        type: "text",
        timestamp: "2024-12-19T10:15:00Z",
        isRead: true,
      },
      unreadCount: 2,
    },
    {
      name: "Akagami",
      profile: "/images/user/user-07.png",
      isActive: false,
      lastMessage: {
        content: "Hey, how are you?",
        type: "text",
        timestamp: "2024-12-19T10:15:00Z",
        isRead: true,
      },
      unreadCount: 0,
    },
  ];
}