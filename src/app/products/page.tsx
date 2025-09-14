"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TopProductsByOrder } from "@/components/Charts/TopProductsByOrder";
import { TopProductsTable } from "@/components/Tables/TopProductsTable";
import { AllProductsTable } from "@/components/Tables/AllProductsTable";
import { useEffect, useState } from "react";

// Define the Product type based on the backend model
interface Product {
  title: string;
  price: number;
  inv_item_qty: number;
  weight: number | null;
}

const ProductDashboardPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/user/get-products", {
          credentials: "include", // Important to send the auth cookie
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`);
        }

        const data = await res.json();
        setProducts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Products" />

      {loading && (
        <div className="text-center">Loading product data...</div>
      )}

      {error && (
        <div className="text-center text-red-500">Error: {error}</div>
      )}

      {!loading && !error && (
        <div className="space-y-10">
          <TopProductsByOrder data={products} />
          <TopProductsTable data={products} />
          <AllProductsTable data={products} />
        </div>
      )}
    </>
  );
};

export default ProductDashboardPage;