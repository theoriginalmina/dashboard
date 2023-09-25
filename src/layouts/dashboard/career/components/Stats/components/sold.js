import React, { useEffect, useState } from "react";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { IoGlobe } from "react-icons/io5";
import { supabase } from "supabaseClient.js"; // Import your Supabase client
import { useAuth } from "hooks/Auth";

const CareerCarsSold = () => {
  const [totalCarsSold, setTotalCarsSold] = useState(0);
  const { user } = useAuth();
  const userId = user?.id;

  const getCount = async () => {
    // Fetch car sales data for the current user from your Supabase table
    const { data, error } = await supabase
      .from("sales")
      .select("count")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching car sales data:", error);
      return;
    }

    // Calculate the total cars sold by manually adding up 'count' values
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
      title={{ text: "Career Cars Sold" }}
      count={totalCarsSold}
      
      icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
    />
  );
};

export default CareerCarsSold;
