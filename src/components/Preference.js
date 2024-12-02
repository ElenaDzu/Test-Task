import React from "react";

function Preference({ profile, onPreferenceAction }) {
  // Рендер тегов для категорий
  const renderLinks = (category) => {
    const tags = profile[category] || {};
    const hasTags = Object.keys(tags).length > 0; // Проверяем, есть ли добавленные теги
  
    return (
      <div className="form__links-container">
        {hasTags &&
          Object.keys(tags).map((key) => {
            const [siteName, link] = tags[key].split("|"); // Разделяем `Site name` и `Link`
  
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
                      onPreferenceAction("remove", category, key); // Удаляем пустой тег
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
                      onPreferenceAction("remove", category, key); // Удаляем пустой тег
                    }
                  }}
                />
                <button
                  type="button"
                  className="form__link-delete"
                  onClick={() => onPreferenceAction("remove", category, key)} // Удаляем секцию
                >
                  🗑️
                </button>
              </div>
            );
          })}
        <button
          type="button"
          className="form__addtag-button"
          onClick={() => onPreferenceAction("add", category)}
        >
          &#43;
        </button>
      </div>
    );
  };
  
  

  // Универсальный рендер категорий
  const renderCategory = (label, category) => (
    <div className="form__user-preference">
      <div className="form__interest-header">
        <p className="form__label-preference">{label}</p>
        {category !== "links" && (
          <button
            type="button"
            className="form__addtag-button"
            onClick={() => onPreferenceAction("add", category)}
          >
            &#43;
          </button>
        )}
      </div>
      {category === "links" ? renderLinks(category) : renderTags(category)}
    </div>
  );
  

  // Рендер тегов (для категорий `interests` и `potentialInterests`)
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
