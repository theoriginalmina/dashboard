import PropTypes from "prop-types";
import React, { useState, useRef } from "react";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Footer from "layouts/authentication/components/Footer";
import colors from "assets/theme/base/colors";
import tripleLinearGradient from "assets/theme/functions/tripleLinearGradient";

function CoverLayout({
  color,
  header,
  title,
  description,
  motto,
  premotto,
  video,
  top,
  cardContent,
  children,
}) {
  const { gradients } = colors;

  // Array of video sources
  const videos = [
    'https://cdn.discordapp.com/attachments/1126046737870622750/1127805153421041764/funny-commercial-copy.mp4',
    'https://cdn.discordapp.com/attachments/1126046737870622750/1127812610125987840/gym-ad-copy.mp4',
    'https://cdn.discordapp.com/attachments/1126046737870622750/1127807686155698236/you-do-you-copy.mp4' ,
    'https://cdn.discordapp.com/attachments/1126046737870622750/1126436680770007060/fast-text-ad-copy.mp4'
  ];

  // State to keep track of the current video index
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Reference to the video element
  const videoRef = useRef(null);

  // Update the current video index when a video ends
  const handleVideoEnd = () => {
    setCurrentVideoIndex((currentVideoIndex + 1) % videos.length);
  };

  return (
    <PageLayout
      background={tripleLinearGradient(
        gradients.cover.main,
        gradients.cover.state,
        gradients.cover.stateSecondary,
        gradients.cover.angle
      )}
    >
      <DefaultNavbar
        action={{
          type: "external",
          route: "https://whop.com/imperial-alpha/?accessPassId=pass_q4A6ZPa2DfsbU",
          label: "JOIN NOW",
        }}
      />
      <VuiBox
        height="100%"
        width="50vw"
        display={{ xs: "none", md: "block" }}
        position="absolute"
        top={0}
        left={0}
        sx={({ breakpoints }) => ({
          overflow: "hidden",
          [breakpoints.down("xl")]: {
            mr: "100px",
          },
          [breakpoints.down("lg")]: {
            display: "none",
          },
        })}
        zIndex={0}
      >
        <VuiBox
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
          flexDirection="column"
          sx={{
            position: "relative",
            backgroundColor: "#000",
            overflow: "hidden",
          }}
        >
          <video
            ref={videoRef}
            src={videos[currentVideoIndex]}
            autoPlay
            muted
            onEnded={handleVideoEnd}
            style={{
              objectFit: 'fill',
              width: '100%',
              height: '100%',
            }}
          />
          <VuiBox
            position="absolute"
            bottom={0}
            left={0}
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center" // Updated to "center"
            alignItems="center" // Updated to "center"
            flexDirection="column"
            p={1}
          >
            <VuiTypography
              textAlign={cardContent ? "center" : "start"}
              variant="subtitle1"
              fontWeight="medium"
              color="white"
              mb="10px"
              sx={{ mb: 1, letterSpacing: "8px" }}
            >
              {premotto}
            </VuiTypography>
            <VuiTypography
              textAlign={cardContent ? "center" : "start"}
              variant="h2"
              fontWeight="bold"
              color="logo"
              mb="10px"
              textGradient
              sx={{ letterSpacing: "8px" }}
            >
              {motto}
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <VuiBox
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          alignItems: "center",
          maxWidth: "1500px",
          minHeight: "100vh",
          margin: "0 auto",
        }}
      >
        <VuiBox
          mt={top}
          ml="auto !important"
          sx={({ breakpoints }) => ({
            [breakpoints.down("xl")]: {
              mr: cardContent ? "50px" : "100px",
            },
            [breakpoints.down("lg")]: {
              mr: "auto",
              ml: "auto !important",
            },
            [breakpoints.down("md")]: {
              maxWidth: "90%",
              pr: "7px",
              pl: "10px !important",
            },
          })}
        >
          <VuiBox pt={3} px={3} mx="auto !important" maxWidth={cardContent ? "400px" : "350px"}>
            {!header ? (
              <>
                <VuiBox mb="35px">
                  <VuiTypography
                    textAlign={cardContent ? "center" : "start"}
                    variant="h3"
                    fontWeight="bold"
                    color={color}
                    mb="10px"
                  >
                    {title}
                  </VuiTypography>
                  <VuiTypography
                    textAlign={cardContent ? "center !important" : "start !important"}
                    mx="auto"
                    sx={({ typography: { size }, functions: { pxToRem } }) => ({
                      fontWeight: "regular",
                      fontSize: size.sm,
                    })}
                    color="white"
                  >
                    {description}
                  </VuiTypography>
                </VuiBox>
              </>
            ) : (
              header
            )}
          </VuiBox>
          <VuiBox
            px={3}
            mb="50px"
            mx="auto"
            ml="auto !important"
            sx={({ breakpoints }) => ({
              mt: cardContent ? "60px" : { top },
              maxWidth: cardContent ? "450px" : "350px",
              [breakpoints.down("xl")]: {
                mr: cardContent ? "0px" : "100px",
              },
              [breakpoints.only("lg")]: {
                mr: "auto",
                ml: "auto !important",
              },
              [breakpoints.down("lg")]: {
                mr: "auto",
                ml: "auto !important",
              },
              [breakpoints.down("md")]: {
                mr: cardContent ? "auto !important" : "unset",
                pr: "7px",
                pl: cardContent ? "0px !important" : "10px !important",
              },
            })}
          >
            {children}
          </VuiBox>
          <Footer />
        </VuiBox>
      </VuiBox>
    </PageLayout>
  );
}

CoverLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 20,
};

CoverLayout.propTypes = {
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
