import React, { useEffect, useState } from "react";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { IoDocumentText } from "react-icons/io5";
import { supabase } from "supabaseClient.js"; // Import your Supabase client
import { useAuth } from "hooks/Auth";

const CareerTotalSales = () => {
  const [totalSales, setTotalSales] = useState(0);
  const { user } = useAuth();
  const userId = user?.id;

  const getSales = async () => {
    // Fetch sales data for the current user from your Supabase table
    const { data, error } = await supabase
      .from("sales")
      .select("sale")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching sales data:", error);
      return;
    }

    // Calculate the total sales by manually adding up 'sale' values
    let total = 0;
    for (const sale of data) {
      const saleValue = parseFloat(sale.sale.replace("$", "").replace(/,/g, "")); // Remove "$" and commas, then parse to float
      if (!isNaN(saleValue)) {
        total += saleValue;
      }
    }
    
    setTotalSales(total);
  };

  useEffect(() => {
    getSales();
  }, [userId]);

  return (
    <MiniStatisticsCard
      title={{ text: "Total Career Sales" }}
      count={totalSales.toLocaleString("en-US", { style: "currency", currency: "USD" })} // Format as currency
      
      icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
    />
  );
};

export default CareerTotalSales;
