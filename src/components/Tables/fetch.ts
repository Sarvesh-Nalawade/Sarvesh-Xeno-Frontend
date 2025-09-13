import * as logos from "@/assets/logos";

export async function getTopProducts() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      image: "/images/product/product-01.png",
      name: "Apple Watch Series 7",
      category: "Electronics",
      price: 296,
      sold: 22,
      profit: 45,
    },
    {
      image: "/images/product/product-02.png",
      name: "Macbook Pro M1",
      category: "Electronics",
      price: 546,
      sold: 12,
      profit: 125,
    },
    {
      image: "/images/product/product-03.png",
      name: "Dell Inspiron 15",
      category: "Electronics",
      price: 443,
      sold: 64,
      profit: 247,
    },
    {
      image: "/images/product/product-04.png",
      name: "HP Probook 450",
      category: "Electronics",
      price: 499,
      sold: 72,
      profit: 103,
    },
  ];
}

export async function getInvoiceTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Premium Package",
      price: 120.0,
      date: "2025-09-10T10:00:00.000Z",
      status: "Paid",
      quantity: 2,
      discount: 10.0,
    },
    {
      name: "Basic Package",
      price: 30.0,
      date: "2025-09-11T11:30:00.000Z",
      status: "Pending",
      quantity: 1,
      discount: 0.0,
    },
    {
      name: "Enterprise Package",
      price: 500.0,
      date: "2025-09-12T14:00:00.000Z",
      status: "Unpaid",
      quantity: 5,
      discount: 50.0,
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2025-09-13T18:00:00.000Z",
      status: "Paid",
      quantity: 1,
      discount: 5.0,
    },
  ];
}

export async function getTopChannels() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return [
    {
      name: "Sarvesh",
      visitors: "8805060804",
      revenues: "sarvesh.me@gmail.com",
      sales: "Pune",
      conversion: 2.59,
      tag: "vip"
    },
    {
      name: "Ujjawal",
      visitors: "8805060804",
      revenues: "sarvesh.me@gmail.com",
      sales: "Pune",
      conversion: 2.59,
      tag: "vip"
      
    },
    {
      name: "Bhushan",
      visitors: "8805060804",
      revenues: "sarvesh.me@gmail.com",
      sales: "Pune",
      conversion: 2.59,
      tag: "vip"
      
    },
    {
      name: "Vedant",
      visitors: "8805060804",
      revenues: "sarvesh.me@gmail.com",
      sales: "Pune",
      conversion: 2.59,
      tag: "vip"
      
    },
    {
      name: "Aryan",
      visitors: "8805060804",
      revenues: "sarvesh.me@gmail.com",
      sales: "Pune",
      conversion: 2.59,
      tag: "vip"
      
    },
  ];
}
