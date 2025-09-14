"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TopChannels } from "@/components/Tables/top-customers";
import { TopCustomersByOrder } from "@/components/Charts/TopCustomersByOrder";
import { useEffect, useState } from "react";

// Define the Customer type based on the backend model
interface Customer {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  revenue_generated: number;
  tags: string | null;
}


const CustomerDashboardPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("http://localhost:8000/user/get-customers", {
          credentials: "include", // Important to send the auth cookie
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch customers: ${res.statusText}`);
        }

        const data = await res.json();
        setCustomers(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Customers" />

      {loading && (
        <div className="text-center">Loading customer data...</div>
      )}

      {error && (
        <div className="text-center text-red-500">Error: {error}</div>
      )}

      {!loading && !error && (
        <div className="space-y-10">
          <TopCustomersByOrder data={customers} />
          <TopChannels data={customers} />
        </div>
      )}
    </>
  );
};

export default CustomerDashboardPage;
