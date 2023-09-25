import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import EventForm from "layouts/calendar/components/Event/EventForm"; // Import your EventForm component
import CloseIcon from "@mui/icons-material/Close"; // Import the CloseIcon from MUI
import Dialog from "@mui/material/Dialog";

function NewEvent(props) {
  const { open, handleClose, edit, data, setDataUpdated } = props;

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
      <Grid container className="tables_dialog">
        <Grid item xs={12}>
          <Card
            sx={{
              position: "relative", // Needed for absolute positioning
              overflow: "visible",
            }}
          >
            {/* Close button */}
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
              <CloseIcon />
            </div>
            <VuiBox p={2}>
              <VuiBox>
                {/* Render only the EventForm */}
                <EventForm
                  handleClose={handleClose}
                  edit={edit}
                  data={data}
                  setDataUpdated={setDataUpdated}
                />
              </VuiBox>
            </VuiBox>
          </Card>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default NewEvent;
