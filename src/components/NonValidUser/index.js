import bgSignIn from "assets/images/signInImage.png";
import VuiBox from "components/VuiBox";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import VuiTypography from "components/VuiTypography";
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import { useNavigate } from "react-router-dom";

import { useAuth } from "hooks/Auth";

function NonValidUser() {
  const { signOut } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/authentication/sign-in");
  };

  return (
    <CoverLayout
      title="WELCOME, ENTREPRENEUR!"
      color="white"
      description="You must be a member of Imperial Alpha to access the dashboard. Login via Discord to sign in! "
      premotto=""
      motto=""
      image={bgSignIn}
    >
      <VuiBox>
        <h1>You are not in our Discord server or you don't have the right role</h1>
        <IconButton onClick={handleLogout} sx={navbarIconButton} size="small">
          <Icon
            sx={({ palette: { dark, white } }) => ({
              color: white.main,
            })}
          >
            logout
          </Icon>
          <VuiTypography variant="button" fontWeight="medium" color={"white"}>
            Logout
          </VuiTypography>
        </IconButton>
      </VuiBox>
    </CoverLayout>
  );
}

export default NonValidUser;
