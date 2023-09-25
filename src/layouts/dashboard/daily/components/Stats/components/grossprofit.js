import React, { useEffect, useState } from "react";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { IoDocumentText } from "react-icons/io5";
import { supabase } from "supabaseClient.js"; // Import your Supabase client
import { useAuth } from "hooks/Auth";

const DailyGrossProfit = () => {
  const [totalGrossProfit, setTotalGrossProfit] = useState(0);
  const { user } = useAuth();
  const userId = user?.id;

  const getGrossProfit = async () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based, so add 1
    const currentDay = currentDate.getDate(); // Get the day of the month

    // Create a formatted date string in "YYYY-MM-DD" format
    const formattedDate = `${currentYear}-${currentMonth.toString().padStart(2, "0")}-${currentDay.toString().padStart(2, "0")}`;

    // Fetch profit data for the current user from your Supabase table for the current day
    const { data, error } = await supabase
      .from("sales")
      .select("profit, date")
      .eq("user_id", userId)
      .eq("date", formattedDate);

    if (error) {
      console.error("Error fetching profit data:", error);
      return;
    }

    // Calculate the total gross profit for the current day by manually adding up 'profit' values
    let total = 0;
    for (const sale of data) {
      const profitValue = parseFloat(sale.profit.replace("$", "").replace(/,/g, "")); // Remove "$" and commas, then parse to float
      if (!isNaN(profitValue)) {
        total += profitValue;
      }
    }

    setTotalGrossProfit(total);
  };

  useEffect(() => {
    getGrossProfit();
  }, [userId]);

  const formattedTotalGrossProfit = totalGrossProfit.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <MiniStatisticsCard
      title={{ text: "Daily Gross Profit" }}
      count={formattedTotalGrossProfit} // Format as currency
      icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
    />
  );
};

export default DailyGrossProfit;
