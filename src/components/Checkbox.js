import React, { useState, useEffect } from "react";

function Checkbox({ onChange, defaultValue = "Private" }) {
  const [visibility, setVisibility] = useState(defaultValue);

  useEffect(() => {
    setVisibility(defaultValue);
  }, [defaultValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    setVisibility(value);
    if (onChange) {
      onChange("visibility", value, e.target);
    }
  };

  return (
    <>
      <p className="form__checkbox-text">Show your profile in Launchpad?</p>
      <div className="form__checkbox-preference">
        <label className="form__checkbox">
          <input
            className="form__checkbox-input"
            type="radio"
            name="profile-visibility"
            value="Private"
            checked={visibility === "Private"}
            onChange={handleChange}
          />
          <div className="form__checkbox-state">
            <div className="form__checkbox-icon"></div>
          </div>
          <p className="form__checkbox-label">Private</p>
        </label>
        <label className="form__checkbox">
          <input
            className="form__checkbox-input"
            type="radio"
            name="profile-visibility"
            value="Public"
            checked={visibility === "Public"}
            onChange={handleChange}
          />
          <div className="form__checkbox-state">
            <div className="form__checkbox-icon"></div>
          </div>
          <p className="form__checkbox-label">Public</p>
        </label>
      </div>
    </>
  );
}

export default Checkbox;
