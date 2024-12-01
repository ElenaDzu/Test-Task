import React from "react";

function Input({ profile = {}, errorMessages = {}, onChange }) {
  return (
    <>
      <div>
        <input
          className="form__input"
          id="name"
          type="text"
          placeholder="Enter your name"
          value={profile.name || ""}
          minLength="2"
          maxLength="50"
          pattern="[A-Za-zА-Яа-яЁё\s]*"
          title="The name can only contain letters and spaces."
          required
          profile={profile}
          onInput={(e) => onChange("name", e.target.value, e.target)}
        />
        <span className="form__error">
          {errorMessages.name}</span>
      </div>

      <div>
        <input
          className="form__input"
          id="surname"
          type="text"
          placeholder="Enter your surname"
          value={profile.surname || ""}
          minLength="2"
          maxLength="50"
          pattern="[A-Za-zА-Яа-яЁё\s]*"
          title="The surname can only contain letters and spaces."
          required
          onInput={(e) => onChange("surname", e.target.value, e.target)}
        />
        <span className="form__error">{errorMessages.surname}</span>
      </div>

      <div>
        <input
          className="form__input"
          id="jobTitle"
          type="text"
          placeholder="Enter your job title"
          value={profile.jobTitle || ""}
          maxLength="100"
          pattern="[A-Za-zА-Яа-яЁё0-9\s]+"
          title="Only letters, numbers, and spaces are allowed."
          onInput={(e) => onChange("jobTitle", e.target.value, e.target)}
        />
        <span className="form__error">{errorMessages.jobTitle}</span>
      </div>

      <div>
        <input
          className="form__input"
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={profile.phone || ""}
          pattern="^\+\d{10,15}$"
          title="The phone number must be in the format +country-code number."
          required
          onInput={(e) => onChange("phone", e.target.value, e.target)}
        />
        <span className="form__error">{errorMessages.phone}</span>
      </div>

      <div>
        <input
          className="form__input"
          id="address"
          type="text"
          placeholder="Enter your address"
          value={profile.address || ""}
          pattern="^[A-Za-zА-Яа-яЁё0-9.,\-\s]+$"
          maxLength="200"
          title="Only letters, numbers, and spaces are allowed."
          onInput={(e) => onChange("address", e.target.value, e.target)}
        />
        <span className="form__error">{errorMessages.address}</span>
      </div>

      <div>
        <input
          className="form__input"
          id="email"
          type="email"
          placeholder="Email"
          value={profile.email || ""}
          maxLength="200"
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          title="Please enter a valid email."
          onInput={(e) => onChange("email", e.target.value, e.target)}
        />
        <span className="form__error">{errorMessages.email}</span>
      </div>

      <div>
        <input
          className="form__input"
          id="pitch"
          type="text"
          placeholder="Pitch"
          value={profile.pitch || ""}
          pattern="^[A-Za-zА-Яа-яЁё0-9.,\-\s]+$"
          maxLength="200"
          title="Only letters, numbers, and spaces are allowed."
          onInput={(e) => onChange("pitch", e.target.value, e.target)}
        />
        <span className="form__error">{errorMessages.pitch}</span>
      </div>
    </>
  );
}

export default Input;
