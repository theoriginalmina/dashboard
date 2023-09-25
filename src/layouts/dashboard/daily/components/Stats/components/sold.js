import React, { useEffect, useState } from "react";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { IoGlobe } from "react-icons/io5";
import { supabase } from "supabaseClient.js"; // Import your Supabase client
import { useAuth } from "hooks/Auth";

const DailyCarsSold = () => {
  const [totalCarsSold, setTotalCarsSold] = useState(0);
  const { user } = useAuth();
  const userId = user?.id;

  const getCount = async () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based, so add 1
    const currentDay = currentDate.getDate(); // Get the day of the month

    // Create a formatted date string in "YYYY-MM-DD" format
    const formattedDate = `${currentYear}-${currentMonth.toString().padStart(2, "0")}-${currentDay.toString().padStart(2, "0")}`;

    // Fetch car sales data for the current user from your Supabase table for the current day
    const { data, error } = await supabase
      .from("sales")
      .select("count, date")
      .eq("user_id", userId)
      .eq("date", formattedDate);

    if (error) {
      console.error("Error fetching car sales data:", error);
      return;
    }

    // Calculate the total cars sold for the current day
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
      title={{ text: "Daily Cars Sold" }}
      count={totalCarsSold}
      icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
    />
  );
};

export default DailyCarsSold;
