import React, { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import { IoHappy } from 'react-icons/io5';
import colors from 'assets/theme/base/colors';
import linearGradient from 'assets/theme/functions/linearGradient';
import CircularProgress from '@mui/material/CircularProgress';
import { supabase } from "supabaseClient.js"; // Import your Supabase client
import { useAuth } from "hooks/Auth";

const SatisfactionRate = () => {
	const { info, gradients } = colors;
	const { cardContent } = gradients;
	const goal = 20; // Define your sales goal here
  
	const { user } = useAuth();
	const userId = user?.id;
  
	const getMonthlyCarsSold = async () => {
	  const currentDate = new Date();
	  const currentYear = currentDate.getFullYear();
	  const currentMonth = currentDate.getMonth() + 1; // Months are 0-based, so add 1
  
	  // Create a formatted date string for the first day of the current month in "YYYY-MM-DD" format
	  const firstDayOfMonth = `${currentYear}-${currentMonth.toString().padStart(2, "0")}-01`;
  
	  // Fetch car sales data for the current user from your Supabase table for the current month
	  const { data, error } = await supabase
		.from("sales")
		.select("count, date")
		.eq("user_id", userId)
		.gte("date", firstDayOfMonth) // Filter by the first day of the current month and onwards
		.lte("date", currentDate.toISOString().split('T')[0]); // Filter by the current date
  
	  if (error) {
		console.error("Error fetching car sales data:", error);
		return 0; // Return 0 if there's an error
	  }
  
	  // Calculate the total cars sold for the current month
	  let total = 0;
	  for (const sale of data) {
		const countValue = parseFloat(sale.count); // Remove commas, then parse to float
		if (!isNaN(countValue)) {
		  total += countValue;
		}
	  }
  
	  return total;
	};
  
	// Use the getMonthlyCarsSold function to fetch the total cars sold for the current month
	const [totalCarsSold, setTotalCarsSold] = useState(0);
  
	useEffect(() => {
	  getMonthlyCarsSold().then((count) => {
		setTotalCarsSold(count);
	  });
	}, [userId]);
  
	// Ensure that 'totalCarsSold' is a valid number before calculating the completion percentage
	const at = !isNaN(totalCarsSold) ? (totalCarsSold / goal) * 100 : 0;
  
	return (
	  <Card sx={{ height: '340px' }}>
		<VuiBox display='flex' flexDirection='column'>
		  <VuiTypography variant='lg' color='white' fontWeight='bold' mb='4px'>
			Monthly Sales Goal
		  </VuiTypography>
		  <VuiBox sx={{ alignSelf: 'center', justifySelf: 'center', zIndex: '-1' }}>
			<VuiBox sx={{ position: 'relative', display: 'inline-flex' }}>
			  <CircularProgress variant='determinate' value={at} size={170} color='info' />
			  <VuiBox
				sx={{
				  top: 0,
				  left: 0,
				  bottom: 0,
				  right: 0,
				  position: 'absolute',
				  display: 'flex',
				  alignItems: 'center',
				  justifyContent: 'center',
				}}>
				<VuiBox
				  sx={{
					background: info.main,
					transform: 'translateY(-50%)',
					width: '50px',
					height: '50px',
					borderRadius: '50%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				  }}>
				  <IoHappy size='30px' color='#fff' />
				</VuiBox>
			  </VuiBox>
			</VuiBox>
		  </VuiBox>
		  <VuiBox
			sx={({ breakpoints }) => ({
			  width: '90%',
			  padding: '18px 22px',
			  display: 'flex',
			  justifyContent: 'space-between',
			  flexDirection: 'row',
			  height: '82px',
			  mx: 'auto',
			  borderRadius: '20px',
			  background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
			  transform: 'translateY(-90%)',
			  zIndex: '1000',
			})}>
			<VuiTypography color='text' variant='caption' display='inline-block' fontWeight='regular'>
			{totalCarsSold}
			</VuiTypography>
			<VuiBox flexDirection='column' display='flex' justifyContent='center' alignItems='center' sx={{ minWidth: '80px' }}>
			  <VuiTypography color='white' variant='h3'>
				{at.toFixed(0)}%
			  </VuiTypography>
			  <VuiTypography color='text' variant='caption' fontWeight='regular'>
				Completed
			  </VuiTypography>
			</VuiBox>
			<VuiTypography color='text' variant='caption' display='inline-block' fontWeight='regular'>
			  {goal}
			</VuiTypography>
		  </VuiBox>
		</VuiBox>
	  </Card>
	);
  };
  
  export default SatisfactionRate;