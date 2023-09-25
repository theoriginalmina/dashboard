import React, { useEffect, useState } from "react";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { IoGlobe } from "react-icons/io5";
import { supabase } from "supabaseClient.js"; // Import your Supabase client
import { useAuth } from "hooks/Auth";

const MonthlyCarsSold = () => {
  const [totalCarsSold, setTotalCarsSold] = useState(0);
  const { user } = useAuth();
  const userId = user?.id;

  const getCount = async () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based, so add 1

    // Create a formatted date string for the first day of the current month in "YYYY-MM-DD" format
    const firstDayOfMonth = `${currentYear}-${currentMonth.toString().padStart(2, "0")}-01`;

    // Fetch car sales data for the current user from your Supabase table for the current month
    const { data, error } = await supabase
      .from("sales")
      .select("count, date")
      .eq("user_id", userId)
      .gte("date", firstDayOfMonth) // Filter by the first day of the current month and onwards
      .lte("date", currentDate.toISOString().split('T')[0]); // Filter by the current date

    if (error) {
      console.error("Error fetching car sales data:", error);
      return;
    }

    // Calculate the total cars sold for the current month
    let total = 0;
    for (const sale of data) {
      const countValue = parseFloat(sale.count); // Remove commas, then parse to float
      if (!isNaN(countValue)) {
        total += countValue;
      }
    }

    setTotalCarsSold(total);
  };

  useEffect(() => {
    getCount();
  }, [userId]);

  return (
    <MiniStatisticsCard
      title={{ text: "Monthly Cars Sold" }}
      count={totalCarsSold}
      icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
    />
  );
};

export default MonthlyCarsSold;

