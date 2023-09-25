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
import { IoBuild } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

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
      case "/profile/all-projects":
        setTabValue(2);
        break;
      case "/profile/teams":
        setTabValue(1);
        break;
      default:
        setTabValue(0); // Set "OVERVIEW" as default
    }
  }, [location.pathname]);

  const handleSetTabValue = (event, newValue) => {
    setTabValue(newValue);

    // Add navigation logic for other tabs here if needed
    switch (newValue) {
      case 0: // "OVERVIEW" tab
        navigate.push("/profile/overview"); // Navigate to the "Dashboard" page when "OVERVIEW" tab is clicked
        break;
      case 1: // "TEAMS" tab
        navigate.push("/profile/teams"); // Navigate to the "Teams Page" when "TEAMS" tab is clicked
        break;
      case 2: // "PROJECTS" tab
        navigate.push("/profile/all-projects"); // Navigate to the "Projects Page" when "PROJECTS" tab is clicked
        break;
      default:
        break;
    }
  };

  return (
    <VuiBox position="relative">
      <DashboardNavbar light />
      <Card
        sx={{
          px: 3,
          mt: 2,
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
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
              [breakpoints.only("sm")]: {
                justifyContent: "center",
                alignItems: "center",
              },
            })}
          >
            <VuiAvatar
              src="https://cdn.discordapp.com/attachments/1116531444626497678/1134951698968887296/Imperial_Inspiration_Inverted_Logo.png"
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item xs={12} md={4.3} lg={4} xl={3.8} xxl={7}>
            <VuiBox
              height="100%"
              mt={0.5}
              lineHeight={1}
              display="flex"
              flexDirection="column"
              sx={({ breakpoints }) => ({
                [breakpoints.only("sm")]: {
                  justifyContent: "center",
                  alignItems: "center",
                },
              })}
            >
              <VuiTypography variant="lg" color="white" fontWeight="bold">
                Ethan Reynolds
              </VuiTypography>
              <VuiTypography variant="button" color="text" fontWeight="regular">
                e.reynolds363@gmail.com
              </VuiTypography>
            </VuiBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6.5} xl={6} xxl={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent", display: "flex", justifyContent: "flex-end" }}
              >
                <Tab label="OVERVIEW" icon={<IoCube color="white" size="16px" />} />
                <Tab label="TEAMS" icon={<IoDocument color="white" size="16px" />} />
                <Tab label="PROJECTS" icon={<IoBuild color="white" size="16px" />} />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </VuiBox>
  );
}

export default Header;
