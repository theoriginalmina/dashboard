import React, { useEffect, useState } from "react";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { IoWallet } from "react-icons/io5";
import { supabase } from "supabaseClient.js"; // Import your Supabase client
import { useAuth } from "hooks/Auth";

const YearlyCommission = () => {
  const [totalCommission, setTotalCommission] = useState(0);
  const { user } = useAuth();
  const userId = user?.id;

  const getCommission = async () => {
    const currentYear = new Date().getFullYear(); // Get the current year

    // Fetch commission data for the current user from your Supabase table for the current year
    const { data, error } = await supabase
      .from("sales")
      .select("commission, date")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching commission data:", error);
      return;
    }

    // Calculate the total commission for the current year by manually adding up 'commission' values
    let total = 0;
    for (const sale of data) {
      const saleYear = new Date(sale.date).getFullYear();
      if (saleYear === currentYear) {
        const commissionValue = parseFloat(sale.commission.replace("$", "").replace(/,/g, "")); // Remove "$" and commas, then parse to float
        if (!isNaN(commissionValue)) {
          total += commissionValue;
        }
      }
    }

    setTotalCommission(total);
  };

  useEffect(() => {
    getCommission();
  }, [userId]);

  const formattedTotalCommission = totalCommission.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <MiniStatisticsCard
      title={{ text: "Yearly Commission", fontWeight: "regular" }}
      count={formattedTotalCommission} // Format as currency
      icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
    />
  );
};

export default YearlyCommission;


