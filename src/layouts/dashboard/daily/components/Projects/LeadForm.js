import { useState, useEffect, useCallback } from "react";
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

function LeadForm(props) {
  const { onClose, open, edit, setDataUpdated } = props;

  const { user } = useAuth();
  const { id: userId } = user;

  const handleClose = () => {
    onClose();
  };

  const initialValues = {
    vehicle: "",
    price: "",
    heat_index: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [customersList, setCustomersList] = useState([""]);

  const handleCustomerChange = (e, index) => {
    const { value } = e.target;
    const list = [...customersList];
    list[index] = value;
    setCustomersList(list);
  };

  const handleCustomerRemove = (index) => {
    const list = [...customersList];
    list.splice(index, 1);
    setCustomersList(list);
  };

  const handleCustomerAdd = () => {
    setCustomersList([...customersList, ""]);
  };

  const validate = (values, list) => {
    const errors = {};
    if (!values.vehicle) {
      errors.vehicle = "Vehicle is required";
    }
    if (!values.price) {
      errors.price = "Price is required";
    }
    if (!values.heat_index) {
      errors.heat_index = "Heat Index is required";
    }
    if (list[0].length === 0) {
      errors.customers = "Customers is required";
    }

    if (list.length > 1) {
      let notValid = false;
      let listLen = list.length;
      let idx = 0;
      while (idx < listLen && !notValid) {
        if (list[idx].length === 0) {
          notValid = true;
        }

        idx++;
      }
      console.log(notValid);
      if (notValid) {
        errors.customers = "Customers is required";
      }
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
    setFormErrors(validate(formValues, customersList));
    setIsSubmit(true);
  };

  const addLead = useCallback(async () => {
    const { error } = await supabase.from("leads").insert({
      ...formValues,
      customers: customersList,
      user_id: userId,
    });

    if (error) {
      console.log(error);
    } else {
      handleClose();
      setDataUpdated(true);
    }
  }, [customersList, formValues, handleClose, setDataUpdated, userId]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      addLead();
    }
  }, [addLead, formErrors, isSubmit]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <Grid container className="tables_dialog">
        <VuiBox p={5}>
          <VuiTypography variant="h5" color="white">
            Add New Lead
          </VuiTypography>
          <Grid item xs={12}>
            <div
              style={{
                position: "absolute",
                top: "10px", // Adjust as needed
                right: "10px", // Adjust as needed
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
                {customersList.map((singleCustomer, idx) => (
                  <div key={idx}>
                    <Box style={{ position: "relative" }}>
                      <FormField
                        label={idx === 0 ? "Customers" : ""}
                        placeholder="Customers Name"
                        name="customer"
                        type="text"
                        id="customer"
                        value={singleCustomer.customer}
                        onChange={(e) => handleCustomerChange(e, idx)}
                        error={formErrors.customers && true}
                      />
                      {customersList.length - 1 === idx && customersList.length < 200 && (
                        <IconButton
                          color="primary"
                          aria-label="add"
                          style={{ position: "absolute", right: "-17%", top: "46%" }}
                          onClick={handleCustomerAdd}
                        >
                          <AddIcon />
                        </IconButton>
                      )}
                      {customersList.length !== 1 && (
                        <IconButton
                          color="primary"
                          aria-label="add"
                          style={{ position: "absolute", left: "-17%", bottom: "0" }}
                          onClick={() => handleCustomerRemove(idx)}
                        >
                          <RemoveIcon />
                        </IconButton>
                      )}
                    </Box>
                  </div>
                ))}
                {formErrors.customers && (
                  <Alert severity="error" className="error_alert">
                    {formErrors.customers}
                  </Alert>
                )}
              </Grid>

              <Grid item xs={12}>
                <FormField
                  type="number"
                  label="Price"
                  placeholder="Your Price"
                  name="price"
                  value={formValues.price}
                  onChange={handleChange}
                  error={formErrors.price && true}
                />
                {formErrors.price && (
                  <Alert severity="error" className="error_alert">
                    {formErrors.price}
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
                  Heat Index
                </VuiTypography>
                <VuiSelect
                  defaultValue={
                    edit
                      ? {
                          name: "heat_index",
                          value: formValues.heat_index,
                          label: formValues.heat_index,
                        }
                      : null
                  }
                  options={[
                    { name: "heat_index", value: 1, label: 1 },
                    { name: "heat_index", value: 2, label: 2 },
                    { name: "heat_index", value: 3, label: 3 },
                  ]}
                  onChange={handleChange}
                  error={formErrors.heat_index && true}
                />
                {formErrors.heat_index && (
                  <Alert severity="error" className="error_alert">
                    {formErrors.heat_index}
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

export default LeadForm;
