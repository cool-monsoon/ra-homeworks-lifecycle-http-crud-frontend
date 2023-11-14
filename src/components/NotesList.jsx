import PropTypes from "prop-types";
import Note from "./Note";

export default function NotesList(props) {
  const {notes, onDelete} = props;
  console.log('Array:', notes);
  return (
    <div className="notes-list-container">
      {notes && Array.isArray(notes) ? notes.map(o => <Note {...o} key={o.id} onDelete={onDelete} />): "Nothing to display"}
    </div>
  );
}

NotesList.propTypes = {
    onDelete: PropTypes.func,
    notes: PropTypes.arrayOf( PropTypes.shape({ id: PropTypes.number, text: PropTypes.string, }) )
}