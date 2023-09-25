//C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\vision-ui-dashboard-react-main\src\layouts\ia\index.js

import React from "react";
import { Grid, Container, Typography } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ImperialAI from "./components/imperialai";
import Footer from "examples/Footer";

function IAApp() {
  return (
    <DashboardLayout>
      <DashboardNavbar /> {/* Use the DashboardNavbar component here */}
      <Container>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h1" align="center">
              
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ImperialAI />
          </Grid>
        </Grid>
      </Container>
      <Footer /> {/* Use the Footer component here */}
    </DashboardLayout>
  );
}

export default IAApp;