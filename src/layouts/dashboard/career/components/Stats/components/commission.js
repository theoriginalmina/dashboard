import React, { useEffect, useState } from "react";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { IoWallet } from "react-icons/io5";
import { supabase } from "supabaseClient.js"; // Import your Supabase client
import { useAuth } from "hooks/Auth";

const CareerCommission = () => {
  const [totalCommission, setTotalCommission] = useState(0);
  const { user } = useAuth();
  const userId = user?.id;

  const getCommission = async () => {
    // Fetch commission data for the current user from your Supabase table
    const { data, error } = await supabase
      .from("sales")
      .select("commission")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching commission data:", error);
      return;
    }

    // Calculate the total commission by manually adding up 'commission' values
    let total = 0;
    for (const sale of data) {
      const commissionValue = parseFloat(sale.commission.replace("$", "").replace(/,/g, "")); // Remove "$" and commas, then parse to float
      if (!isNaN(commissionValue)) {
        total += commissionValue;
      }
    }
    
    setTotalCommission(total);
  };

  useEffect(() => {
    getCommission();
  }, [userId]);

  return (
    <MiniStatisticsCard
      title={{ text: "Career Commission", fontWeight: "regular" }}
      count={`${totalCommission.toLocaleString("en-US", { style: "currency", currency: "USD" })}`} // Format as currency
      icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
    />
  );
};

export default CareerCommission;
