import { useState, useCallback } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { red } from "@mui/material/colors";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { supabase } from "supabaseClient";

import NewSale from "layouts/data-tables/components/Sale";

function EditSection({ data, setDataUpdates }) {
  const { id } = data;
  const [openDelete, setOpenDelete] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const onDeleteClick = () => {
    setOpenDelete(true);
  };

  const deleteSale = async () => {
    const { error } = await supabase.from("sales").delete().eq("id", id);
    if (error) {
      console.log(error);
    }
    setOpenDelete(false);
    setDataUpdates(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const YesButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  }));

  const EditSale = () => {
    setEditOpen(true);
  };

  const handleEditClose = useCallback(async () => {
    setEditOpen(false);
    setDataUpdates(true);
  }, [setDataUpdates]);

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton aria-label="edit" size="small" color="success" onClick={EditSale}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete" size="small" color="error" onClick={onDeleteClick}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ backgroundColor: "#0f1535" }}>
          <DialogContentText style={{ color: "#fff" }}>
            Are you sure you want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#0f1535", color: "#fff" }}>
          <Button onClick={handleDeleteClose}>No</Button>
          <YesButton variant="contained" onClick={deleteSale}>
            Yes
          </YesButton>
        </DialogActions>
      </Dialog>

      <NewSale open={editOpen} handleClose={handleEditClose} edit={true} data={data} />
    </>
  );
}
export default EditSection;
