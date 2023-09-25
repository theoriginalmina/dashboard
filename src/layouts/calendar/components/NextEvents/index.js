/** 

=========================================================
* Vision UI PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Visionware.

*/

// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard PRO React example components
import DefaultItem from "examples/Items/DefaultItem";

// React icons
import { FaWallet } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";

import dayjs from "dayjs";
import { useState, useEffect } from "react";

function NextEvents({ events }) {
  const [nextEvent, setNextEvents] = useState([]);
  const today = dayjs(new Date()).format();

  useEffect(() => {
    const filtered = events.filter((event) => event.date > today);

    setNextEvents(filtered);
  }, [events, today]);

  return (
    <Card sx={{ height: "100%" }}>
      <VuiBox pt={2} px={2}>
        <VuiTypography variant="h6" fontWeight="medium" color="white">
          Next events
        </VuiTypography>
      </VuiBox>
      <VuiBox p={2}>
        {nextEvent.map((event) => (
          <VuiBox mt={1.8} key={event.id}>
            <DefaultItem
              icon={<IoNotifications size="18px" color="white" />}
              color="primary"
              title={event.title}
              description={dayjs(event.date).format("MMMM D, YYYY h:mm A")}
            />
          </VuiBox>
        ))}
      </VuiBox>
    </Card>
  );
}

export default NextEvents;
