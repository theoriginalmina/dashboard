import { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiEditor from "components/VuiEditor";
import VuiSelect from "components/VuiSelect";
import FormField from "layouts/calendar/components/Event/FormField";
import Deletion from "components/Deletion";

import Alert from "@mui/material/Alert";
import Icon from "@mui/material/Icon";
import VuiButton from "components/VuiButton";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { supabase } from "supabaseClient.js";
import { useAuth } from "hooks/Auth";

function EventForm(props) {
  const { handleClose, edit, data, setDataUpdated } = props;

  const [formDisabled, setFormDisabled] = useState(edit ? true : false);

  const { user } = useAuth();
  const userId = user.id;

  const eventId = data?.id;

  const initialValues = {
    title: "",
    date: "",
    description: "",
    event_duration: "",
    category: "",
  };

  const [formValues, setFormValues] = useState(edit ? data : initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [deletionFormOpen, setDeletionFormOpen] = useState(false);

  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    } else if (typeof e === "string" && e.includes("<p>")) {
      setFormValues({ ...formValues, description: e });
    } else if (e.name) {
      setFormValues({ ...formValues, [e.name]: e.value });
    } else {
      const date = dayjs(e).format();
      setFormValues({ ...formValues, date: date });
    }
    setFormDisabled(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Title is required";
    }
    if (!values.date) {
      errors.date = "Date is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    if (!values.event_duration) {
      errors.event_duration = "Duration is required";
    }
    if (!values.category) {
      errors.category = "Category is required";
    }

    return errors;
  };

  const addEvent = useCallback(async () => {
    const { error } = await supabase.from("events").insert({ ...formValues, user_id: userId });
    if (error) {
      console.log(error);
    } else {
      handleClose();
      setDataUpdated(true);
    }
  }, [formValues, handleClose, setDataUpdated, userId]);

  const editEvent = useCallback(async () => {
    delete formValues.id;
    if (eventId) {
      const { error } = await supabase
        .from("events")
        .update({ ...formValues })
        .eq("id", eventId);

      if (error) {
        console.error(error);
      } else {
        handleClose();
        setDataUpdated(true);
      }
    }
  }, [eventId, formValues, handleClose, setDataUpdated]);

  const deleteEvent = useCallback(async () => {
    const { error } = await supabase.from("events").delete().eq("id", eventId);
    if (error) {
      console.error(error);
    } else {
      handleClose();
      setDataUpdated(true);
    }
  }, [eventId, handleClose, setDataUpdated]);

  const openDeletionForm = () => {
    setDeletionFormOpen(true);
  };
  const closeDeletionForm = () => {
    setDeletionFormOpen(false);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (edit) {
        editEvent(formValues);
      } else {
        addEvent(formValues);
      }
    }
  }, [addEvent, edit, editEvent, formErrors, formValues, isSubmit]);

  return (
    <VuiBox>
      <VuiTypography variant="h5" color="white">
        {edit ? <>Edit </> : <>Add </>}
        Event
      </VuiTypography>
      <form onSubmit={handleSubmit}>
        <VuiBox mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField
                type="text"
                label="Event Title"
                placeholder="eg. Meeting with John"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                error={formErrors.title && true}
              />
              {formErrors.title && (
                <Alert severity="error" className="error_alert">
                  {formErrors.title}
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
                Date Time Picker
              </VuiTypography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  className="date_picker"
                  value={formValues.date}
                  onChange={handleChange}
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
          </Grid>
        </VuiBox>
        <VuiBox mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <VuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <VuiTypography component="label" variant="caption" fontWeight="bold" color="white">
                  Description&nbsp;&nbsp;
                  <VuiTypography variant="caption" fontWeight="regular" color="text">
                    (optional)
                  </VuiTypography>
                </VuiTypography>
              </VuiBox>
              <VuiEditor
                name="description"
                value={formValues.description}
                onChange={handleChange}
                error={formErrors.description && true}
              />
              {formErrors.description && (
                <Alert severity="error" className="error_alert">
                  {formErrors.description}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <VuiBox mb={3}>
                <VuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                  <VuiTypography
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                    textTransform="capitalize"
                    color="white"
                  >
                    Duration
                  </VuiTypography>
                </VuiBox>
                <VuiSelect
                  defaultValue={{
                    name: "event_duration",
                    value: formValues.event_duration,
                    label: formValues.event_duration,
                  }}
                  options={[
                    { name: "event_duration", value: "15 minutes", label: "15 Minutes" },
                    { name: "event_duration", value: "30 minutes", label: "30 Minutes" },
                    { name: "event_duration", value: "45 minutes", label: "45 Minutes" },
                    { name: "event_duration", value: "1 hour", label: "1 Hour" },
                    { name: "event_duration", value: "2 hours", label: "2 Hours" },
                    { name: "event_duration", value: "all day", label: "All Day" },
                  ]}
                  onChange={handleChange}
                  error={formErrors.event_duration && true}
                />
                {formErrors.event_duration && (
                  <Alert severity="error" className="error_alert">
                    {formErrors.event_duration}
                  </Alert>
                )}
              </VuiBox>
              <VuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <VuiTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                  color="white"
                >
                  Category
                </VuiTypography>
              </VuiBox>
              <VuiSelect
                defaultValue={{
                  name: "category",
                  value: formValues.category,
                  label: formValues.category,
                }}
                options={[
                  {
                    name: "category",
                    value: "customer appointment",
                    label: "Customer Appointment",
                  },
                  { name: "category", value: "cold calls", label: "Cold Calls" },
                  { name: "category", value: "follow-up calls", label: "Follow-up Calls" },
                  { name: "category", value: "prospecting", label: "Prospecting" },
                  { name: "category", value: "other", label: "Other" },
                ]}
                onChange={handleChange}
                error={formErrors.category && true}
              />
              {formErrors.category && (
                <Alert severity="error" className="error_alert">
                  {formErrors.category}
                </Alert>
              )}
            </Grid>
          </Grid>
          <VuiBox mt={3} width="100%" display="flex" justifyContent="flex-end">
            {edit ? (
              <>
                <VuiButton
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={formDisabled}
                >
                  <Icon sx={{ fontWeight: "bold" }}>edit</Icon>
                </VuiButton>
                <VuiButton variant="contained" color="error" onClick={openDeletionForm}>
                  <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
                </VuiButton>
              </>
            ) : (
              <VuiButton type="submit" variant="contained" color="info">
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              </VuiButton>
            )}
          </VuiBox>
        </VuiBox>
        <Deletion open={deletionFormOpen} handleClose={closeDeletionForm} deletion={deleteEvent} />
      </form>
    </VuiBox>
  );
}

export default EventForm;
