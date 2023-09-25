import React from 'react';
import {
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import VuiBox from 'components/VuiBox';
import EmailBuilder from './EmailBuilder';

const EmailLayout = () => {
  return (
    <DashboardLayout>
      <CssBaseline />
      <AppBar position="fixed">
        <DashboardNavbar />
      </AppBar>
      <Container maxWidth="md" sx={{ mt: '70px' }}>
        <VuiBox>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Email Builder
          </Typography>
          <EmailBuilder />
        </VuiBox>
      </Container>
      <Box sx={{ flexGrow: 1 }} />
      <Footer />
    </DashboardLayout>
  );
};

export default EmailLayout;
