import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Footer from "layouts/authentication/components/Footer";



function BasicLayout({ title, description, image, children, motto, premotto }) {
  return (
    <PageLayout>
      <DefaultNavbar
        action={{
          type: "external",
          route: "https://whop.com/imperial-alpha/?accessPassId=pass_q4A6ZPa2DfsbU",
          label: "JOIN NOW",
        }}
        transparent
        light
      />
      <VuiBox
        width="100vw"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <VuiBox py={6} textAlign="center">
          <VuiTypography variant="h1" color="white" fontWeight="bold">
            {title}
          </VuiTypography>
          <VuiTypography variant="body2" color="white" fontWeight="regular">
            {description}
          </VuiTypography>
        </VuiBox>
        <VuiBox px={2} pb={4}>
          <VuiTypography variant="h2" color="white" fontWeight="bold">
            {motto}
          </VuiTypography>
          <VuiTypography variant="subtitle1" color="white" fontWeight="medium">
            {premotto}
          </VuiTypography>
          <VuiTypography
            variant="h2"
            color="logo"
            fontWeight="bold"
            mb="10px"
            textGradient
            sx={{ letterSpacing: "8px" }}
          >
            
          </VuiTypography>
          <VuiTypography variant="body2" color="white" fontWeight="regular">
            
          </VuiTypography>
        </VuiBox>
      </VuiBox>
      <VuiBox mt={-8} px={1} width="100%" mx="auto">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </PageLayout>
  );
}




BasicLayout.defaultProps = {
  title: "",
  description: "",
};

BasicLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  motto: PropTypes.string.isRequired, // Added PropTypes for motto
  premotto: PropTypes.string.isRequired, // Added PropTypes for premotto
};

export default BasicLayout;
