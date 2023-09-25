import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import VuiAvatar from "components/VuiAvatar";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import { IoCube } from "react-icons/io5";
import { IoDocument } from "react-icons/io5";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < 1280
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  useEffect(() => {
    // Update the tabValue based on the current URL path
    switch (location.pathname) {
      case "/dashboard/daily":
        setTabValue(0);
        break;
      case "/dashboard/monthly":
        setTabValue(1);
        break;
      case "/dashboard/yearly":
        setTabValue(2);
        break;
      case "/dashboard/career":
        setTabValue(3);
        break;
      default:
        setTabValue(0); // Set "OVERVIEW" as default
    }
  }, [location.pathname]);

  const handleSetTabValue = (event, newValue) => {
    setTabValue(newValue);

    // Add navigation logic for other tabs here if needed
    switch (newValue) {
      case 0: // "DAILY" tab
        navigate("/dashboard/daily"); // Navigate to the "DAILY" page when "DAILY" tab is clicked
        break;
      case 1: // "MONTHLY" tab
        navigate("/dashboard/monthly"); // Navigate to the "MONTHLY Page" when "MONTHLY" tab is clicked
        break;
      case 2: // "YEARLY" tab
        navigate("/dashboard/yearly"); // Navigate to the "YEARLY Page" when "YEARLY" tab is clicked
        break;
      case 3: // "CAREER" tab
        navigate("/dashboard/career"); // Navigate to the "CAREER Page" when "CAREER" tab is clicked
        break;
      default:
        break;
    }
  };

  return (
    <VuiBox position="flex">
      <Card
        sx={{
          px: 3,
          mt: 2,
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="flex-start"
          sx={({ breakpoints }) => ({
            [breakpoints.up("xs")]: {
              gap: "16px",
            },
            [breakpoints.up("xs")]: {
              gap: "0px",
            },
            [breakpoints.up("xl")]: {
              gap: "0px",
            },
            [breakpoints.up("xs")]: {
              gap: "0px",
            },
          })}
          >
            <Grid
              item
              xs={12}
              md={1.7}
              lg={1.5}
              xl={1.2}
              xxl={0.8}
              display="flex"
              sx={({ breakpoints }) => ({
                [breakpoints.only('sm')]: {
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              })}
            ></Grid>
            <Grid item xs={12} md={6} lg={6.5} xl={6} xxl={4} sx={{ ml: 'auto' }}>
              <AppBar position="absolute">
                <Tabs
                  orientation={tabsOrientation}
                  value={tabValue}
                  onChange={handleSetTabValue}
                  sx={{ background: 'transparent', display: 'flex', justifyContent: 'center' }} // Center the Tabs
                >
                  <Tab label="DAILY" icon={<IoCube color="white" size="16px" />} />
                  <Tab label="MONTHLY" icon={<IoDocument color="white" size="16px" />} />
                  <Tab label="YEARLY" icon={<IoBuild color="white" size="16px" />} />
                  <Tab label="CAREER" icon={<IoGlobe color="white" size="16px" />} />
                </Tabs>
              </AppBar>
            </Grid>
          </Grid>
        </Card>
      </VuiBox>
    );
  }
  
  export default Header;
