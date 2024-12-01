import React from "react";

function OutcomeButton({
    onSave,
    onCancel
}) {
  return (
    <>
    <div className="form__outcome-buttons">
    <button className="form__outcome-button" type="button" onClick={onSave}>Submit</button>
    <button className="form__outcome-button" type="button" onClick={onCancel}>Cancel</button>
    </div>
    </>
  );
}

export default OutcomeButton;