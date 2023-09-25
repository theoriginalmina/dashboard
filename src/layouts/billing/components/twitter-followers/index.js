//C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\frontend\src\layouts\billing\components\twitter-followers\index.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import MiniStatisticsCard from "layouts/billing/components/MiniStatisticsCard";

function TwitterFollowersWidget() {
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    // Fetch Twitter followers count from the backend API
    axios.get("http://localhost:3000/followers").then((response) => {
      setFollowersCount(response.data.followers_count); // Use the correct property name
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
      icon={<i className="fab fa-twitter"></i>}
      direction="right"
    />
  );
}

export default TwitterFollowersWidget;
