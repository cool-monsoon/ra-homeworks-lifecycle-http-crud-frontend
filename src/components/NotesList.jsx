import PropTypes from "prop-types";
import Note from "./Note";

export default function NotesList(props) {
  const {notesArray, onDelete} = props;
  return (
    <div className="notes-list-container">
     {notesArray.map(o => <Note {...o} content={o.text} key={o.id} onDelete={onDelete} />)}
    </div>
  );
}

NotesList.propTypes = {
    onDelete: PropTypes.func,
    notesArray: PropTypes.array
}