import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiSelect from "components/VuiSelect";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormField from "layouts/calendar/components/Event/FormField";
import VuiButton from "components/VuiButton";
import CloseIcon from "@mui/icons-material/Close";
import Icon from "@mui/material/Icon";
import dayjs from "dayjs";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import { supabase } from "supabaseClient";
import { useAuth } from "hooks/Auth";

function PresaleForm(props) {
  const { onClose, open, edit, setDataUpdated } = props;

  const { user } = useAuth();
  const { id: userId } = user;

  const handleClose = () => {
    onClose();
  };

  const initialValues = {
    vehicle: "",
    customer: "", // Changed customers to customer for a single customer
    notes: "",
    date: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.vehicle) {
      errors.vehicle = "Vehicle is required";
    }
    if (!values.notes) {
      errors.notes = "Notes is required";
    }
    if (!values.date) {
      errors.date = "Date is required";
    }
    if (!values.customer) {
      errors.customer = "Customer is required";
    }
    return errors;
  };

  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    } else if (e.name) {
      setFormValues({ ...formValues, [e.name]: e.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const addPresale = async () => {
    const { error } = await supabase.from("presales").insert({
      ...formValues,
      user_id: userId,
    });

    if (error) {
      console.log(error);
    } else {
      handleClose();
      setDataUpdated(true);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      addPresale();
    }
  }, [addPresale, formErrors, isSubmit]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <Grid container className="tables_dialog">
        <VuiBox p={5}>
          <VuiTypography variant="h5" color="white">
            Add New Presale
          </VuiTypography>
          <Grid item xs={12}>
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                zIndex: 1,
              }}
              onClick={handleClose}
            >
              <CloseIcon color="white" />
            </div>
            <form onSubmit={handleSubmit}>
              <Grid item xs={12}>
                <FormField
                  label="Vehicle"
                  type="text"
                  placeholder="Your Vehicle"
                  name="vehicle"
                  value={formValues.vehicle}
                  onChange={handleChange}
                  error={formErrors.vehicle && true}
                />
                {formErrors.vehicle && (
                  <Alert severity="error" className="error_alert">
                    {formErrors.vehicle}
                  </Alert>
                )}
              </Grid>

              <Grid item xs={12}>
                <FormField
                  type="text"
                  label="Customer"
                  placeholder="Customer Name" // Changed placeholder
                  name="customer" // Changed from customers to customer
                  value={formValues.customer} // Changed from customers to customer
                  onChange={handleChange} // Changed from handleCustomerChange to handleChange
                  error={formErrors.customer && true} // Changed from formErrors.customers to formErrors.customer
                />
                {formErrors.customer && (
                  <Alert severity="error" className="error_alert">
                    {formErrors.customer}
                  </Alert>
                )}
              </Grid>

              <Grid item xs={12}>
                <FormField
                  type="text"
                  label="Notes"
                  placeholder="Notes"
                  name="notes"
                  value={formValues.notes}
                  onChange={handleChange}
                  error={formErrors.notes && true}
                />
                {formErrors.notes && (
                  <Alert severity="error" className="error_alert">
                    {formErrors.notes}
                  </Alert>
                )}
              </Grid>

              <Grid item xs={12}>
                <VuiTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                  color="white"
                >
                  Date
                </VuiTypography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="date_picker"
                    onChange={handleChange}
                    value={formValues.date}
                    renderInput={(props) => <TextField {...props} />}
                    error={formErrors.date && true}
                  />
                </LocalizationProvider>
                {formErrors.date && (
                  <Alert severity="error" className="error_alert">
                    {formErrors.date}
                  </Alert>
                )}
              </Grid>

              <VuiBox mt={3} width="100%" display="flex" justifyContent="flex-end">
                {edit ? (
                  <VuiButton variant="contained" color="success" type="submit">
                    <Icon sx={{ fontWeight: "bold" }}>edit</Icon>
                  </VuiButton>
                ) : (
                  <VuiButton variant="contained" color="info" type="submit">
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  </VuiButton>
                )}
              </VuiBox>
            </form>
          </Grid>
        </VuiBox>
      </Grid>
    </Dialog>
  );
}

export default PresaleForm;
