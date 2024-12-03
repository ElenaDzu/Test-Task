import React from "react";

function Preference({ profile, onPreferenceAction,  errorMessages = {} }) {
  const renderLinks = (category) => {
    const tags = profile[category] || {};
    return Object.keys(tags).map((key) => {
      const [siteName, link] = tags[key].split("|");

      return (
        <div key={key} className="form__link-item">
          <input
            className="form__link-name"
            placeholder="Site name"
            maxLength="200"
            value={siteName || ""}
            onChange={(e) => {
              const newValue = `${e.target.value}|${link || ""}`;
              onPreferenceAction("edit", category, key, newValue);
            }}
          />
          <span className="form__error">{errorMessages.surname}</span>
          <input
            className="form__link-url"
            placeholder="Link"
            type="url"
            value={link || ""}
            onChange={(e) => {
              const newValue = `${siteName || ""}|${e.target.value}`;
              onPreferenceAction("edit", category, key, newValue);
            }}
            onBlur={(e) => {
              if (siteName.trim() === "" && e.target.value.trim() === "") {
                onPreferenceAction("remove", category, key);
              }
            }}
          />
          <button
            type="button"
            className="form__link-delete"
            onClick={() => onPreferenceAction("remove", category, key)}
          >
          </button>
        </div>
      );
    });
  };

  const renderCategory = (label, category) => (
    <div className="form__user-preference">
      <div className="form__interest-block">
        <p className="form__label-preference">{label}</p>
        {category === "links" ? renderLinks(category) : renderTags(category)}
        {Object.keys(profile[category] || {}).length < 10 && (
          <button
            type="button"
            className="form__addtag-button"
            onClick={() => onPreferenceAction("add", category)}
          >
            &#43;
          </button>
        )}
        {Object.keys(profile[category] || {}).length >= 10 && (
          <p style={{ color: "red", fontSize: "12px" }}>
            Maximum of 10 tags added.
          </p>
        )}
      </div>
    </div>
  );

  const renderTags = (category) => {
    const tags = profile[category] || {};
    return Object.keys(tags).map((key) => (
      <input
        key={key}
        className={`form__tag ${tags[key].trim() === "" ? "unsaved" : "saved"}`}
        placeholder="Enter tags"
        maxLength="8"
        pattern="^[\w\s,.]+$"
        title="Tags must be letters, numbers, spaces, commas, or dots. Max length: 8."
        value={tags[key]}
        onChange={(e) => onPreferenceAction("edit", category, key, e.target.value)}
        onBlur={(e) => {
          if (e.target.value.trim() === "") {
            onPreferenceAction("remove", category, key);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (e.target.value.trim() !== "") {
              e.target.classList.remove("unsaved");
              e.target.classList.add("saved");
            }
          }
        }}
        onClick={(e) => {
          if (tags[key].trim() !== "" && e.target.classList.contains("saved")) {
            onPreferenceAction("remove", category, key);
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
