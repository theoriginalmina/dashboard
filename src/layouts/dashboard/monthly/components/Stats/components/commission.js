import React, { useEffect, useState } from "react";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { IoWallet } from "react-icons/io5";
import { supabase } from "supabaseClient.js"; // Import your Supabase client
import { useAuth } from "hooks/Auth";

const MonthlyCommission = () => {
  const [totalCommission, setTotalCommission] = useState(0);
  const { user } = useAuth();
  const userId = user?.id;

  const getCommission = async () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based, so add 1

    // Create a formatted date string for the first day of the current month in "YYYY-MM-DD" format
    const firstDayOfMonth = `${currentYear}-${currentMonth.toString().padStart(2, "0")}-01`;

    // Fetch commission data for the current user from your Supabase table for the current month
    const { data, error } = await supabase
      .from("sales")
      .select("commission, date")
      .eq("user_id", userId)
      .gte("date", firstDayOfMonth) // Filter by the first day of the current month and onwards
      .lte("date", currentDate.toISOString().split('T')[0]); // Filter by the current date

    if (error) {
      console.error("Error fetching commission data:", error);
      return;
    }

    // Calculate the total commission for the current month by manually adding up 'commission' values
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

  const formattedTotalCommission = totalCommission.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <MiniStatisticsCard
      title={{ text: "Monthly Commission", fontWeight: "regular" }}
      count={formattedTotalCommission} // Format as currency
      icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
    />
  );
};

export default MonthlyCommission;




