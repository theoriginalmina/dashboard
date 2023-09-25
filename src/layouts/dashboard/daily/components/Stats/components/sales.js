import React, { useEffect, useState } from "react";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { IoDocumentText } from "react-icons/io5";
import { supabase } from "supabaseClient.js"; // Import your Supabase client
import { useAuth } from "hooks/Auth";

const DailyTotalSales = () => {
  const [totalSales, setTotalSales] = useState(0);
  const { user } = useAuth();
  const userId = user?.id;

  const getSales = async () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based, so add 1
    const currentDay = currentDate.getDate(); // Get the day of the month

    // Create a formatted date string in "YYYY-MM-DD" format
    const formattedDate = `${currentYear}-${currentMonth.toString().padStart(2, "0")}-${currentDay.toString().padStart(2, "0")}`;

    // Fetch sales data for the current user from your Supabase table for the current day
    const { data, error } = await supabase
      .from("sales")
      .select("sale, date")
      .eq("user_id", userId)
      .eq("date", formattedDate);

    if (error) {
      console.error("Error fetching sales data:", error);
      return;
    }

    // Calculate the total sales for the current day by manually adding up 'sale' values
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

  const formattedTotalSales = totalSales.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <MiniStatisticsCard
      title={{ text: "Daily Total Sales" }}
      count={formattedTotalSales} // Format as currency
      icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
    />
  );
};

export default DailyTotalSales;

