import React, { useState, useEffect } from 'react';
import { Card, Grid, Stack } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import { IoWallet } from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';
import colors from 'assets/theme/base/colors';
import VuiProgress from 'components/VuiProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { supabase } from "supabaseClient.js"; // Import your Supabase client
import { useAuth } from "hooks/Auth";

const ActiveAnalytics = () => {
  const { info, gradients } = colors;
  const { cardContent } = gradients;

  const { user } = useAuth();
  const userId = user?.id;

  const [totalCarsSold, setTotalCarsSold] = useState(0);
  const [AverageMonthlyCount, setAverageMonthlyCount] = useState(0);
  const [ProfitPerCar, setProfitPerCar] = useState(0);
  const [AverageCommission, setAverageCommission] = useState(0);

  useEffect(() => {
    const getCareerStatistics = async () => {
      try {
        const { data, error } = await supabase
          .from("sales")
          .select("count, profit, commission, date")
          .eq("user_id", userId);

        if (error) {
          console.error("Error fetching career statistics:", error);
          return;
        }

        let totalCarsSold = 0;
        let totalProfit = 0;
        let totalCommission = 0;
        let totalMonths = 0;
        let totalSoldPerMonth = 0;

        for (const sale of data) {
          const countValue = parseFloat(sale.count);
          const profitValue = parseFloat(sale.profit);
          const commissionValue = parseFloat(sale.commission);

          if (!isNaN(countValue)) {
            totalCarsSold += countValue;
          }

          if (!isNaN(profitValue)) {
            totalProfit += profitValue;
          }

          if (!isNaN(commissionValue)) {
            totalCommission += commissionValue;
          }

          if (sale.date) {
            totalMonths++;
            totalSoldPerMonth += countValue;
          }
        }

        setTotalCarsSold(totalCarsSold);
        setAverageMonthlyCount(totalMonths > 0 ? totalSoldPerMonth / totalMonths : 0);
        setProfitPerCar(totalCarsSold > 0 ? totalProfit / totalCarsSold : 0);
        setAverageCommission(totalCarsSold > 0 ? totalCommission / totalCarsSold : 0);
      } catch (error) {
        console.error("Error fetching career statistics:", error);
      }
    };

    getCareerStatistics();
  }, [userId]);

  return (
    <div>
      <Card sx={{ height: '340px' }}>
        {/* Your other components */}
        {/* Replace the comments below with your actual components */}
        <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
          Monthly Sold
        </VuiTypography>
        <VuiBox display="flex" alignItems="center" mb="40px">
          <VuiTypography variant="button" color="success" fontWeight="bold">
            (+23){" "}
            <VuiTypography variant="button" color="text" fontWeight="regular">
              than last month
            </VuiTypography>
          </VuiTypography>
        </VuiBox>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <Stack
              direction="row"
              spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
              mb="6px"
            >
              <VuiBox
                bgColor="info"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
              >
                <IoWallet color="#fff" size="12px" />
              </VuiBox>
              <VuiTypography color="text" variant="button" fontWeight="medium">
                Average Sold per Month
              </VuiTypography>
            </Stack>
            <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
              {AverageMonthlyCount}
            </VuiTypography>
            <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
          </Grid>
          <Grid item xs={6} md={3} lg={3}>
            <Stack
              direction="row"
              spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
              mb="6px"
            >
              <VuiBox
                bgColor="info"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
              >
                <IoWallet color="#fff" size="12px" />
              </VuiBox>
              <VuiTypography color="text" variant="button" fontWeight="medium">
                Average Profit per Car
              </VuiTypography>
            </Stack>
            <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
              {ProfitPerCar}
            </VuiTypography>
            <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
          </Grid>
          <Grid item xs={6} md={3} lg={3}>
            <Stack
              direction="row"
              spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
              mb="6px"
            >
              <VuiBox
                bgColor="info"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
              >
                <FaShoppingCart color="#fff" size="12px" />
              </VuiBox>
              <VuiTypography color="text" variant="button" fontWeight="medium">
                Average Commission per Car
              </VuiTypography>
            </Stack>
            <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
              {AverageCommission}
            </VuiTypography>
            <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
          </Grid>
          <Grid item xs={6} md={3} lg={3}>
            <Stack
              direction="row"
              spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
              mb="6px"
            >
              {/* Add your JSX components here */}
            </Stack>
          </Grid>
          {/* Add more Grid items here as needed */}
        </Grid>
      </Card>
    </div>
  );
};

export default ActiveAnalytics;
