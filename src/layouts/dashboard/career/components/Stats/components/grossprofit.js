import React, { useEffect, useState } from "react";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { IoDocumentText } from "react-icons/io5";
import { supabase } from "supabaseClient.js"; // Import your Supabase client
import { useAuth } from "hooks/Auth";

const CareerGrossProfit = () => {
  const [totalGrossProfit, setTotalGrossProfit] = useState(0);
  const { user } = useAuth();
  const userId = user?.id;

  const getGrossProfit = async () => {
    // Fetch profit data for the current user from your Supabase table
    const { data, error } = await supabase
      .from("sales")
      .select("profit")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching profit data:", error);
      return;
    }

    // Calculate the total profit by manually adding up 'profit' values
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

  return (
    <MiniStatisticsCard
      title={{ text: "Career Gross Profit" }}
      count={`${totalGrossProfit.toLocaleString("en-US", { style: "currency", currency: "USD" })}`} // Format as currency
      icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
    />
  );
};

export default CareerGrossProfit;
