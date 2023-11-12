import { useState} from "react";
import PropTypes from "prop-types";

export default function NotesInput(props) {

  const { onAdd } = props;

  const [form, setForm] = useState({
    text: ''
  });

  const handleChange = event => {
    const {value} = event.target;
    setForm(prevForm => ({...prevForm, text: value}));
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      onAdd(form.text);
      setForm({text: ''});
  }

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <label htmlFor="input">New Note</label>
      <textarea id="input" className="input" value={form.text} onChange={handleChange}/>
      <button className="input-btn" type="submit">&#10148;</button>
    </form>
  );
}

NotesInput.propTypes = {
    onAdd: PropTypes.func,
}