import React, { useCallback, memo } from "react";

function Preference({ profile, onPreferenceAction }) {
  // Мемоизированный рендер тегов (tags)
  const renderTags = useCallback(
    (category) => {
      const tags = profile[category] || {};
      return Object.keys(tags).map((key) => (
        <div key={key} className="form__tag-item">
          <input
            className="form__tag"
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
              }
            }}
            onClick={(e) => {
              if (tags[key].trim() !== "") {
                onPreferenceAction("remove", category, key);
              }
            }}
          />
        </div>
      ));
    },
    [profile, onPreferenceAction]
  );

  // Мемоизированный рендер ссылок (links)
  const renderLinks = useCallback(
    (category) => {
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
            <input
              className="form__link-url"
              placeholder="Link"
              type="url"
              pattern="https?://.*"
              title="URL must start with http:// or https:// and be valid."
              maxLength="200"
              value={link || ""}
              onChange={(e) => {
                const newValue = `${siteName || ""}|${e.target.value}`;
                onPreferenceAction("edit", category, key, newValue);
              }}
              onBlur={(e) => {
                const validity = e.target.validity || { valid: true };
                if (!validity.valid) {
                  alert("URL must start with http:// or https:// and be valid.");
                }
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
    },
    [profile, onPreferenceAction]
  );

  // Мемоизированный рендер категории (tags или links)
  const renderCategory = useCallback(
    (label, category) => (
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
    ),
    [profile, renderLinks, renderTags, onPreferenceAction]
  );

  return (
    <>
      {renderCategory("The scopes of your interest:", "interests")}
      {renderCategory("Potential interests:", "potentialInterests")}
      {renderCategory("Your links:", "links")}
    </>
  );
}

export default memo(Preference);
