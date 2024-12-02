import React from "react";

function Preference({ profile, onPreferenceAction }) {
  // Рендер тегов для категорий
  const renderLinks = (category) => {
    const tags = profile[category] || {};
    return Object.keys(tags).map((key) => {
      const [siteName, link] = tags[key].split("|"); // Разделяем значения на `Site name` и `Link`

      return (
        <div key={key} className="form__link-item">
          <input
            className="form__link-name"
            placeholder="Site name"
            value={siteName || ""}
            onChange={(e) => {
              const newValue = `${e.target.value}|${link || ""}`;
              onPreferenceAction("edit", category, key, newValue);
            }}
            onBlur={(e) => {
              if (e.target.value.trim() === "" && !link) {
                onPreferenceAction("remove", category, key); // Удаляем, если оба поля пустые
              }
            }}
          />
          <input
            className="form__link-url"
            placeholder="Link"
            value={link || ""}
            onChange={(e) => {
              const newValue = `${siteName || ""}|${e.target.value}`;
              onPreferenceAction("edit", category, key, newValue);
            }}
            onBlur={(e) => {
              if (siteName.trim() === "" && e.target.value.trim() === "") {
                onPreferenceAction("remove", category, key); // Удаляем, если оба поля пустые
              }
            }}
          />
          <button
            type="button"
            className="form__link-delete"
            onClick={() => onPreferenceAction("remove", category, key)} // Удаление секции
          >
          </button>
        </div>
      );
    });
  };

  // Универсальный рендер категорий
  const renderCategory = (label, category) => (
    <div className="form__user-preference">
      <div className="form__interest-block">
        <p className="form__label-preference">{label}</p>
        {category === "links" ? renderLinks(category) : renderTags(category)}
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

  // Рендер тегов (для категорий `interests` и `potentialInterests`)
  const renderTags = (category) => {
    const tags = profile[category] || {};
    return Object.keys(tags).map((key) => (
      <input
        key={key}
        className={`form__tag ${tags[key].trim() === "" ? "unsaved" : "saved"}`} // Класс для сохранённого или несохранённого тега
        value={tags[key]}
        onChange={(e) => onPreferenceAction("edit", category, key, e.target.value)} // Позволяем редактировать значение
        onBlur={(e) => {
          if (e.target.value.trim() === "") {
            onPreferenceAction("remove", category, key); // Удаляем, если поле пустое и потеряло фокус
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // Останавливаем стандартное поведение Enter
            if (e.target.value.trim() !== "") {
              e.target.classList.remove("unsaved"); // Снимаем метку несохранённого тега
              e.target.classList.add("saved"); // Добавляем метку сохранённого тега
            }
          }
        }}
        onClick={(e) => {
          if (tags[key].trim() !== "" && e.target.classList.contains("saved")) {
            onPreferenceAction("remove", category, key); // Удаляем, если тег сохранён и на него кликнули
          }
        }}
      />
    ));
  };
  
  

  return (
    <>
      {renderCategory("The scopes of your interest:", "interests")}
      {renderCategory("Potential interests:", "potentialInterests")}
      {renderCategory("Your links:", "links")}
    </>
  );
}

export default Preference;
