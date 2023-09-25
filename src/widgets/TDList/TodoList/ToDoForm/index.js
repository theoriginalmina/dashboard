import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
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
import { supabase } from "supabaseClient";
import { useAuth } from "hooks/Auth";

import { blue } from "@mui/material/colors";

function TodoForm(props) {
  const { open, handleClose, setDataUpdated, edit, data, setOpenMenu } = props;

  const { user } = useAuth();

  const { id: userId } = user;

  const todoId = data?.id;

  const initialValues = {
    title: "",
    date: "",
    description: "",
    notes: "",
  };

  const [formValues, setFormValues] = useState(edit ? data : initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [disabled, setDisabled] = useState(edit);

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
    if (!values.notes) {
      errors.notes = "Notes are required";
    }

    return errors;
  };

  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
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

  const addTodo = useCallback(async () => {
    const { error } = await supabase
      .from("todos")
      .insert({ ...formValues, status: false, user_id: userId });
    if (error) {
      console.log(error);
    } else {
      handleClose();
      setDataUpdated(true);
    }
  }, [formValues, handleClose, setDataUpdated, userId]);

  const editTodo = useCallback(async () => {
    delete formValues.id;
    const { error } = await supabase
      .from("todos")
      .update({ ...formValues })
      .eq("id", todoId);

    if (error) {
      console.log(error);
    } else {
      handleClose();
      setDataUpdated(true);
      setOpenMenu();
    }
  }, [formValues, handleClose, setDataUpdated, setOpenMenu, todoId]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (edit) {
        editTodo(formValues);
      } else {
        addTodo(formValues);
      }
    }
  }, [addTodo, edit, editTodo, formErrors, formValues, isSubmit]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <Grid container className="tables_dialog">
        <VuiBox p={2}>
          <VuiTypography variant="h5" color="white">
            Add New To do
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
                  type="text"
                  label="To Do Title"
                  placeholder="Your To do"
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
              <Grid item xs={12}>
                <VuiTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                  color="white"
                >
                  Date Picker
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
              <Grid item xs={12}>
                <FormField
                  type="text"
                  label="Description"
                  placeholder="Get Auth Code"
                  value={formValues.description}
                  name="description"
                  onChange={handleChange}
                  error={formErrors.description && true}
                />
                {formErrors.description && (
                  <Alert severity="error" className="error_alert">
                    {formErrors.description}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormField
                  type="text"
                  label="Notes"
                  placeholder="Call after 5"
                  value={formValues.notes}
                  name="notes"
                  onChange={handleChange}
                  error={formErrors.notes && true}
                />
                {formErrors.notes && (
                  <Alert severity="error" className="error_alert">
                    {formErrors.notes}
                  </Alert>
                )}
              </Grid>
              <VuiBox mt={3} width="100%" display="flex" justifyContent="flex-end">
                {edit ? (
                  <VuiButton variant="contained" color="success" type="submit" disabled={disabled}>
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

TodoForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default TodoForm;
