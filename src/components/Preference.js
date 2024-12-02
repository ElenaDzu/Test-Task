import React from "react";

function Preference({ profile, onPreferenceAction }) {
  // Рендер тегов
  const renderTags = (category) => {
    const tags = profile[category] || {};
    return Object.keys(tags).map((key) => (
      <input
        key={key}
        className="form__tag"
        value={tags[key]}
        onChange={(e) => onPreferenceAction("edit", category, key, e.target.value)}
        onBlur={(e) => {
          if (e.target.value.trim() === "") {
            onPreferenceAction("remove", category, key); // Удаляем пустой тег
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onPreferenceAction("remove", category, key); // Удаляем тег по нажатию Enter
          }
        }}
        onClick={() => {
          if (tags[key].trim() !== "") {
            onPreferenceAction("remove", category, key); // Удаляем непустой тег при клике
          }
        }}
      />
    ));
  };

  // Универсальный рендер категорий
  const renderCategory = (label, category) => (
    <div className="form__user-preference">
      <div className="form__interest-block">
        <p className="form__label-preference">{label}</p>
        {renderTags(category)}
        <button
          type="button"
          className="form__addtag-button"
          onClick={() => onPreferenceAction("add", category)}
        >
          &#43;
        </button>
      </div>
    </div>
  );

  return (
    <>
      {renderCategory("The scopes of your interest:", "interests")}
      {renderCategory("Potential interests:", "potentialInterests")}
      {renderCategory("Your links:", "links")}
    </>
  );
}

export default Preference;
