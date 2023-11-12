import PropTypes from "prop-types";

export default function GetButton(props) {
  const { onGet } = props;

  return (
    <div className="button-container">
      <span className="notes-header">Notes</span>
      <button className="refresh" onClick={onGet}><span className="refresh-text">⟲</span></button>
    </div>
  );
}

GetButton.propTypes = {
    onGet: PropTypes.func,
}