import { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiSelect from "components/VuiSelect";
import FormField from "layouts/data-tables/components/Sale/FormField";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import VuiButton from "components/VuiButton";
import Alert from "@mui/material/Alert";
import { supabase } from "supabaseClient.js";
import { useAuth } from "hooks/Auth";
import "./style.css";

function EventForm(props) {
  const { handleClose, edit, data } = props;

  const { user } = useAuth();
  const topCarMakes = [
    "Chevrolet",
    "GMC",
    "Buick",
    "Ford",
    "Ram",
    "Jeep",
    "BMW",
    "Audi",
    "Toyota",
    "Dodge",
    "Subaru",
    "Hyundai",
    "Kia",
    "Lexus",
    "Mazda",
    "Chrysler",
    "Honda",
    "Nissan",
    "Volkswagen",
    "Mercedes-Benz",
    "Volvo",
    "Cadillac",
    "Lincoln",
    "Acura",
    "Infiniti",
    "Land Rover",
    "Mitsubishi",
    "Jaguar",
    "Bentley",
    "Lotus",
    "Pontiac",
    "Hummer",
    "Mercury",
    "Other"
  ];
  const LeadSources = [
    "Lot",
    "Inbound Call",
    "Outbound Call",
    "Global Lead",
    "Service",
    "Facebook",
    "Friends & Family",
    "Referral",
    "Other",
  ];
  const PossibleCounts = [
    "0",
    "0.5",
    "1",
  ];

  const yearOptions = Array.from({ length: 26 }, (_, index) => {
    const year = 2025 - index;
    return { name: "year", value: year.toString(), label: year.toString() };
  });

  const initialValues = {
    customer_name: "",
    condition: "",
    year: "",
    make: "",
    model: "",
    trim: "",
    sale: "",
    profit: "",
    commission: "",
    lead_source: "",
    timetosell: "",
    date: "",
    count: "",
    chit: "",
  };

  const [formValues, setFormValues] = useState(edit ? data : initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [disabled, setDisabled] = useState(edit);

  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    } else if (e.name) {
      setFormValues({ ...formValues, [e.name]: e.value });
    } else {
      const date = dayjs(e).format("MM/DD/YYYY");
      setFormValues({ ...formValues, date: date });
    }
    setDisabled(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.customer_name) {
      errors.customer_name = "Customer name is required";
    }
    if (!values.condition) {
      errors.condition = "Condition is required";
    }
    if (!values.year) {
      errors.year = "Year is required";
    }
    if (!values.make) {
      errors.make = "Make is required";
    }
    if (!values.model) {
      errors.model = "Model is required";
    }
    
    if (!values.sale) {
      errors.sale = "Sale is required";
    }
    if (!values.profit) {
      errors.profit = "Profit is required";
    }
    if (!values.commission) {
      errors.commission = "Commission is required";
    }
    if (!values.lead_source) {
      errors.lead_source = "Lead source is required";
    }  
    if (!values.timetosell) {
      errors.timetosell = "Time to sell is required";
    }
    if (!values.date) {
      errors.date = "Date is required";
    }
    if (!values.count) {
      errors.count = "Count is required";
    }
    if (!values.chit) {
      errors.chit = "Chit is required";    
    }

    return errors;
  };

  const addSale = useCallback(async () => {
    const { error } = await supabase.from("sales").insert({ ...formValues, user_id: user.id });
    if (error) {
    } else {
      handleClose();
    }
  }, [formValues, user.id, handleClose]);

  const editSale = useCallback(async () => {
    delete formValues.id;
    const { error } = await supabase
      .from("sales")
      .update({ ...formValues })
      .eq("id", data?.id);
    if (error) {
      console.error(error);
    } else {
      handleClose();
    }
  }, [data?.id, formValues, handleClose]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (edit) {
        editSale(formValues);
      } else {
        addSale(formValues);
      }
    }
  }, [formErrors, addSale, formValues, isSubmit, edit, editSale]);

  return (
    <VuiBox>
      <VuiTypography variant="h5" color="white">
        Add New Sale
      </VuiTypography>
      <form onSubmit={handleSubmit}>
        <VuiBox mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField
                type="text"
                label="Customer Name"
                placeholder="eg. John Doe"
                name="customer_name"
                value={formValues.customer_name}
                onChange={handleChange}
                error={formErrors.customer_name && true}
              />
              {formErrors.customer_name && (
                <Alert severity="error" className="error_alert">
                  {formErrors.customer_name}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6} style={{ textTransform: "capitalize" }}>
              <VuiTypography variant="body1" color="white">
                Condition
              </VuiTypography>
              <VuiSelect
                defaultValue={
                  edit
                    ? {
                        name: "condition",
                        value: formValues.condition,
                        label: formValues.condition,
                      }
                    : null
                }
                options={[
                  { name: "condition", value: "new", label: "New" },
                  { name: "condition", value: "used", label: "Used" },
                  { name: "condition", value: "ctp", label: "CTP" },
                  { name: "condition", value: "cpo", label: "CPO" },
                  { name: "condition", value: "buy", label: "BUY" },
                ]}
                onChange={handleChange}
                error={formErrors.condition && true}
              />
              {formErrors.condition && (
                <Alert severity="error" className="error_alert">
                  {formErrors.condition}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <VuiTypography variant="body1" color="white">
                Year
              </VuiTypography>
              <VuiSelect
                defaultValue={
                  edit
                    ? {
                        name: "year",
                        value: formValues.year,
                        label: formValues.year,
                      }
                    : null
                }
                options={yearOptions}
                onChange={handleChange}
                error={formErrors.year && true}
              />
              {formErrors.year && (
                <Alert severity="error" className="error_alert">
                  {formErrors.year}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <VuiTypography variant="body1" color="white">
                Make
              </VuiTypography>
              <VuiSelect
                defaultValue={
                  edit
                    ? {
                        name: "make",
                        value: formValues.make,
                        label: formValues.make,
                      }
                    : null
                }
                options={topCarMakes.map((make) => ({ name: "make", value: make, label: make }))}
                onChange={handleChange}
                error={formErrors.make && true}
              />
              {formErrors.make && (
                <Alert severity="error" className="error_alert">
                  {formErrors.make}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                type="text"
                label="Model"
                placeholder="eg. Suburban"
                value={formValues.model}
                name="model"
                onChange={handleChange}
                error={formErrors.model && true}
              />
              {formErrors.model && (
                <Alert severity="error" className="error_alert">
                  {formErrors.model}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                type="text"
                label="Trim"
                placeholder="eg. High Country"
                name="trim"
                value={formValues.trim}
                onChange={handleChange}
                error={formErrors.trim && true}
              />
              {formErrors.trim && (
                <Alert severity="error" className="error_alert">
                  {formErrors.trim}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                type="money"
                label="Sale Price"
                placeholder="eg. $55,000"
                value={formValues.sale}
                name="sale"
                onChange={handleChange}
                error={formErrors.sale && true}
              />
              {formErrors.sale && (
                <Alert severity="error" className="error_alert">
                  {formErrors.sale}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                type="money"
                label="Profit"
                placeholder="eg. $4,500"
                value={formValues.profit}
                name="profit"
                onChange={handleChange}
                error={formErrors.profit && true}
              />
              {formErrors.profit && (
                <Alert severity="error" className="error_alert">
                  {formErrors.profit}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                type="money"
                label="Commission"
                placeholder="eg. $1,250"
                value={formValues.commission}
                name="commission"
                onChange={handleChange}
                error={formErrors.commission && true}
              />
              {formErrors.commission && (
                <Alert severity="error" className="error_alert">
                  {formErrors.commission}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <VuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
                color="white"
              >
                Lead Source
              </VuiTypography>
              <VuiSelect
                defaultValue={
                  edit
                    ? {
                        name: "lead_source",
                        value: formValues.lead_source,
                        label: formValues.lead_source,
                      }
                    : null
                }
                options={LeadSources.map((lead_source) => ({
                  name: "lead_source",
                  value: lead_source,
                  label: lead_source,
                }))}
                onChange={handleChange}
                error={formErrors.make && true}
              />
              {formErrors.make && (
                <Alert severity="error" className="error_alert">
                  {formErrors.lead_source}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                type="timetosell"
                label="Time to Sell"
                placeholder="eg. 60 Minutes"
                value={formValues.timetosell}
                name="timetosell"
                onChange={handleChange}
                error={formErrors.timetosell && true}
              />
              {formErrors.timetosell && (
                <Alert severity="error" className="error_alert">
                  {formErrors.timetosell}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <VuiTypography variant="body1" color="white">
                Date Picker
              </VuiTypography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="date_picker"
                  value={formValues.date}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                  error={formErrors.date && true}
                />
              </LocalizationProvider>
              {formErrors.date && (
                <Alert severity="error" className="error_alert">
                  {formErrors.date}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <VuiTypography variant="body1" color="white">
                Count
              </VuiTypography>
              <VuiSelect
                defaultValue={
                  edit
                    ? {
                        name: "count",
                        value: formValues.count,
                        label: formValues.count,
                      }
                    : null
                }
                options={PossibleCounts.map((count) => ({
                  name: "count",
                  value: count,
                  label: count,
                }))}
                onChange={handleChange}
                error={formErrors.count && true}
              />
              {formErrors.count && (
                <Alert severity="error" className="error_alert">
                  {formErrors.count}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6} style={{ textTransform: "capitalize" }}>
              <VuiTypography variant="body1" color="white">
                Chit
              </VuiTypography>
              <VuiSelect
                defaultValue={
                  edit
                    ? {
                        name: "chit",
                        value: formValues.chit,
                        label: formValues.chit,
                      }
                    : null
                }
                options={[
                  { name: "chit", value: "yes", label: "Yes" },
                  { name: "chit", value: "no", label: "No" },
                ]}
                onChange={handleChange}
                error={formErrors.chit && true}
              />
              {formErrors.chit && (
                <Alert severity="error" className="error_alert">
                  {formErrors.chit}
                </Alert>
              )}
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mt={3} width="100%" display="flex" justifyContent="flex-end">
          {edit ? (
            <VuiButton type="submit" variant="contained" color="success" disabled={disabled}>
              <Icon sx={{ fontWeight: "bold" }}>edit</Icon>
            </VuiButton>
          ) : (
            <VuiButton type="submit" variant="contained" color="info">
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            </VuiButton>
          )}
        </VuiBox>
      </form>
    </VuiBox>
  );
}

export default EventForm;
