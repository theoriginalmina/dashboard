import PropTypes from "prop-types";

// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";

function FormField({ label, ...rest }) {
  return (
    <>
      <VuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <VuiTypography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"
          color="white"
        >
          {label}
        </VuiTypography>
      </VuiBox>
      <VuiInput
        sx={({ borders: { borderWidth }, palette: { borderCol } }) => ({
          border: `${borderWidth[1]} solid ${borderCol.main}`,
        })}
        {...rest}
      />
    </>
  );
}

// typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FormField;
