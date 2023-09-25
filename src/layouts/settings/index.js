import React from "react";
import Grid from "@mui/material/Grid";

// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";

// Settings page components
import Header from "layouts/settings/components/Header";
import BasicInfo from "layouts/settings/components/BasicInfo";
import Accounts from "layouts/settings/components/Accounts";

// Vision UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function ProfileSettings() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox mt={4} display="flex" justifyContent="center">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <VuiBox mb={3}>
              <Header />
            </VuiBox>
          </Grid>
          <Grid item xs={12}>
            <VuiBox mb={3}>
              <BasicInfo />
            </VuiBox>
          </Grid>
          <Grid item xs={12}>
            <VuiBox mb={3}>
              <Accounts />
            </VuiBox>
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProfileSettings;

