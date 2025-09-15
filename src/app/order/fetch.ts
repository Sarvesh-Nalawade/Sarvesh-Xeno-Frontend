import { promises as fs } from "fs";
import path from "path";

export async function getOverviewData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/get-total`, { credentials: "include" });
    if (!response.ok) throw new Error("Failed to fetch totals");
    const data = await response.json();
    // Response: { total_revenue: float, total_customers: int, total_products: int }
    return {
      profit: { value: parseFloat(data.total_revenue) },
      products: { value: parseInt(data.total_products, 10) },
      users: { value: parseInt(data.total_customers, 10) },
    };
  } catch (error) {
    // fallback to demo values if API call fails
    return {
      profit: { value: 123456 },
      products: { value: 100 },
      users: { value: 25 },
    };
  }
}

// getChatsData remains unchanged
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
