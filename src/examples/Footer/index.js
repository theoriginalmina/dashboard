import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

function Footer() {
  return (
    <VuiBox
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      direction="row"
      component="footer"
      py={2}
      pb={62}
    >
      <VuiBox item="true" xs={12} sx={{ textAlign: "center" }}>
        <VuiTypography
          variant="button"
          sx={{ textAlign: "center", fontWeight: "400 !important" }}
          color="white"
        >
          @ 2023, Made for Imperial Alpha by{" "}
          <VuiTypography
            component="a"
            variant="button"
            href="https://discord.gg/xxTCXbJ6RU"
            sx={{ textAlign: "center", fontWeight: "500 !important" }}
            color="Imperialgold"
            mr="2px"
          >
            Imperial Innovations
          </VuiTypography>
          <VuiTypography
            ml="2px"
            mr="2px"
            component="a"
            variant="button"
            href="https://discord.gg/xxTCXbJ6RU"
            sx={{ textAlign: "center", fontWeight: "500 !important" }}
            color="black"
          ></VuiTypography>
        </VuiTypography>
      </VuiBox>
      <VuiBox item="true" xs={10}>
        <VuiBox display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
          <VuiBox mr={{ xs: "20px", lg: "46px" }}>
            <VuiTypography
              component="a"
              href="https://discord.gg/xxTCXbJ6RU"
              variant="body2"
              color="white"
            >
              Discord
            </VuiTypography>
          </VuiBox>
          <VuiBox mr={{ xs: "20px", lg: "46px" }}>
            <VuiTypography
              component="a"
              href="https://whop.com/imperial-alpha/?accessPassId=pass_q4A6ZPa2DfsbU"
              variant="body2"
              color="white"
            >
              Whop
            </VuiTypography>
          </VuiBox>
          <VuiBox>
            <VuiTypography
              component="a"
              href="https://www.imperial-alpha.com/shop"
              variant="body2"
              color="white"
            >
              Shop
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </VuiBox>
  );
}

export default Footer;
