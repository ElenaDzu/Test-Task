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
        {/* Компонент для работы с аватаром */}
        <Avatar avatarPreview={avatarPreview} onAvatarUpload={onAvatarUpload} />

        <fieldset className="form__inputs">
          {/* Поля ввода */}
          <Input profile={profile} onChange={onChange} errorMessages={errorMessages} />

          {/* Управление видимостью профиля */}
          <Checkbox
          defaultValue={profile.visibility}
          onChange={(field, value, element) => {
          onChange(field, value, element);
          }}
          />

          {/* Управление предпочтениями */}
          <Preference profile={profile} onPreferenceAction={onPreferenceAction} />
        </fieldset>

        {/* Кнопки управления */}
        <OutcomeButton onSave={onSave} onCancel={onCancel} />
      </form>
    </main>
  );
};

export default Main;
