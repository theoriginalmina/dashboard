import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

function Deletion({ open, handleClose, deletion }) {
  const YesButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  }));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent style={{ backgroundColor: "#0f1535" }}>
        <DialogContentText style={{ color: "#fff" }}>
          Are you sure you want to delete this?
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ backgroundColor: "#0f1535", color: "#fff" }}>
        <Button onClick={handleClose}>No</Button>
        <YesButton variant="contained" onClick={deletion}>
          Yes
        </YesButton>
      </DialogActions>
    </Dialog>
  );
}
export default Deletion;
