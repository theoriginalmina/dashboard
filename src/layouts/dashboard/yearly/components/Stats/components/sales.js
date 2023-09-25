import React, { useEffect, useState } from "react";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { IoDocumentText } from "react-icons/io5";
import { supabase } from "supabaseClient.js"; // Import your Supabase client
import { useAuth } from "hooks/Auth";

const YearlyTotalSales = () => {
  const [totalSales, setTotalSales] = useState(0);
  const { user } = useAuth();
  const userId = user?.id;

  const getSales = async () => {
    const currentYear = new Date().getFullYear(); // Get the current year

    // Fetch sales data for the current user from your Supabase table for the current year
    const { data, error } = await supabase
      .from("sales")
      .select("sale, date")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching sales data:", error);
      return;
    }

    // Calculate the total sales for the current year by manually adding up 'sale' values
    let total = 0;
    for (const sale of data) {
      const saleYear = new Date(sale.date).getFullYear();
      if (saleYear === currentYear) {
        const saleValue = parseFloat(sale.sale.replace("$", "").replace(/,/g, "")); // Remove "$" and commas, then parse to float
        if (!isNaN(saleValue)) {
          total += saleValue;
        }
      }
    }

    setTotalSales(total);
  };

  useEffect(() => {
    getSales();
  }, [userId]);

  const formattedTotalSales = totalSales.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <MiniStatisticsCard
      title={{ text: "Total Yearly Sales" }}
      count={formattedTotalSales} // Format as currency
      icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
    />
  );
};

export default YearlyTotalSales;
