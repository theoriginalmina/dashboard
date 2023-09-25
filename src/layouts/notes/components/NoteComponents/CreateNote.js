import LinearProgress from "@mui/material/LinearProgress";
function CreateNote({ onNoteChange, saveNote, noteText, error }) {
  //character limit
  const charLimit = 500;
  const charLeft = charLimit - noteText.length;

  return (
    <div className="note" style={{ background: "rgba(255, 255, 255, 0)" }}>
      <textarea
        cols="10"
        rows="5"
        value={noteText}
        placeholder="Type...."
        onChange={onNoteChange}
        maxLength="500"
      ></textarea>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="note__footer">
        <span className="label">{charLeft} left</span>
        <button className="note__save" onClick={saveNote}>
          Save
        </button>
      </div>
      <LinearProgress className="char__progress" variant="determinate" value={charLeft} />
    </div>
  );
}

export default CreateNote;
