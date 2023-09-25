import React, { useCallback, useState } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Switch from "@mui/material/Switch";
import { supabase } from "supabaseClient.js";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";

function Note({ id, text, notes, setNotes }) {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const [openDelete, setOpenDelete] = React.useState(false);

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleEditToggle = () => {
    setEditing((prevState) => !prevState);
  };

  const handleTextChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleSave = useCallback(async () => {
    if (editedText.trim() !== "") {
      setEditing(false);
      // Update the note's text with the edited text
      setEditedText(editedText);
    }
    const { error } = await supabase.from("notes").update({ title: editedText }).eq("id", id);
    if (error) {
      console.error(error);
    }
  }, [editedText, id]);

  const YesButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  }));

  const deleteNote = useCallback(async () => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) {
      console.error(error);
    } else {
      const filteredNotes = notes.filter((note) => note.id !== id);
      setNotes(filteredNotes);
    }
  }, [id, notes, setNotes]);

  return (
    <div className="note">
      <div className="note__body">
        {editing ? (
          <textarea value={editedText} onChange={handleTextChange} autoFocus></textarea>
        ) : (
          editedText
        )}
      </div>
      <div className="note__footer" style={{ justifyContent: "flex-end" }}>
        <Switch
          checked={editing}
          onChange={handleEditToggle}
          color="primary"
          inputProps={{ "aria-label": "Edit Switch" }}
        />
        {editing ? (
          <button className="note__save" onClick={handleSave}>
            Save
          </button>
        ) : (
          <DeleteForeverOutlinedIcon
            className="note__delete"
            onClick={handleDeleteOpen}
            aria-hidden="true"
          />
        )}
      </div>
      <Dialog
        open={openDelete}
        keepMounted
        onClose={handleDeleteClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent style={{ backgroundColor: "#0f1535" }}>
          <DialogContentText style={{ color: "#fff" }}>
            Are you sure you want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#0f1535", color: "#fff" }}>
          <Button onClick={handleDeleteClose}>No</Button>
          <YesButton variant="contained" onClick={deleteNote}>
            Yes
          </YesButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Note;
