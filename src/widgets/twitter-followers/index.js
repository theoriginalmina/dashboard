//C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\vision-ui-dashboard-react-main\src\widgets\twitter-followers\index.js

import React, { useEffect, useState } from "react";
import axios from "axios"; // Add this line to import axios
import MiniStatisticsCard from "layouts/billing/components/MiniStatisticsCard";
import { FaTwitter } from "react-icons/fa";

function TwitterFollowersWidget() {
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    // Fetch Twitter followers count from the backend API
    axios.get("http://localhost:3000/followers").then((response) => {
      setFollowersCount(response.data.followers_count);
    }).catch((error) => {
      console.error("Error fetching Twitter followers:", error);
    });
  }, []);

  return (
    <MiniStatisticsCard
      bgColor="primary"
      title={{ fontWeight: "medium", text: "Twitter Followers" }}
      count={followersCount}
      percentage={{ color: "success", text: "Followers" }}
      icon={<FaTwitter />} // Use the FaTwitter icon component
      direction="right"
    />
  );
}

export default TwitterFollowersWidget;
