import React from "react";
import Card from "./Card.js";
import Input from "./Input.js";
import Avatar from "./Avatar.js";
import Preference from "./Preference";
import OutcomeButton from "./OutcomeButton.js";
import Checkbox from "./Checkbox.js";

const Main = ({
  profile,
  avatarPreview,
  onChange,
  onAvatarUpload,
  onSave,
  onCancel,
  errorMessages,
  onPreferenceAction,
}) => {
  return (
    <main className="content">
      <section className="cards">
        <Card />
      </section>
      <form className="form">
        <Avatar avatarPreview={avatarPreview} onAvatarUpload={onAvatarUpload} />
        <fieldset className="form__inputs">
          <Input profile={profile} onChange={onChange} errorMessages={errorMessages} />
          <Checkbox
              defaultValue={profile.visibility}
              onChange={(field, value, element) => {
              onChange(field, value, element);
              }}
          />
          <Preference profile={profile} onPreferenceAction={onPreferenceAction} />
        </fieldset>
        <OutcomeButton onSave={onSave} onCancel={onCancel} />
      </form>
    </main>
  );
};

export default Main;
