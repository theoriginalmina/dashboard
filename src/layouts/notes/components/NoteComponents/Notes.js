import { useState, useEffect, useCallback } from "react";
import "../css/Note.css";
import CreateNote from "./CreateNote";
import Note from "./Note";
import { supabase } from "supabaseClient.js";
import { useAuth } from "hooks/Auth";

function Notes() {
  const { user } = useAuth();

  const userId = user?.id;

  //states
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [error, setError] = useState("");

  // get text and store in state
  const onNoteChange = (e) => {
    setNoteText(e.target.value);
    setError("");
  };

  const saveNote = async () => {
    if (noteText.length === 0) {
      setError("Can't be empty");
    } else {
      const { data, error } = await supabase
        .from("notes")
        .insert({
          user_id: user.id,
          title: noteText,
        })
        .select();
      if (error) {
        console.log(error);
      }
      setNoteText("");
      setNotes((prevState) => [...prevState, ...data]);
    }
  };

  const getNotes = useCallback(async () => {
    const { data, error } = await supabase.from("notes").select().eq("user_id", userId);
    if (error) {
      console.error("error", error);
    }
    setNotes(data);
  }, [userId]);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return (
    <div className="notes">
      {notes.map((note, idx) => (
        <Note key={note.id} id={note.id} text={note.title} notes={notes} setNotes={setNotes} />
      ))}
      <CreateNote
        onNoteChange={onNoteChange}
        saveNote={saveNote}
        noteText={noteText}
        error={error}
      />
    </div>
  );
}

export default Notes;
