import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import YearlyCarsSold from "./components/sold";
import YearlyCommission from "./components/commission";
import YearlyGrossProfit from "./components/grossprofit";
import YearlyTotalSales from "./components/sales";
import Header from "layouts/dashboard/Header/index";

function YearlyStats() {
  // Place your existing code here or replace this comment with your code

  // Center the CareerStats component using CSS styles
  const centerStyles = {
    
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={centerStyles}>
      
        <VuiBox py={3}>
          <VuiBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={3}>
                <YearlyCarsSold />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <YearlyCommission />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <YearlyGrossProfit />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <YearlyTotalSales />
              </Grid>
            </Grid>
          </VuiBox>
        </VuiBox>
      
    </div>
  );
}

export default YearlyStats;

