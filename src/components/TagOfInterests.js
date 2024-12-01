
import React, { useState, useEffect, useRef } from "react";

const TagOfInterests = ({ p, selectedTag, onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [customTag, setCustomTag] = useState("");
  const [siteName, setSiteName] = useState(selectedTag?.siteName || "");
  const [url, setUrl] = useState(selectedTag?.url || "");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleAddCustomTag = (e) => {
    e.preventDefault();
    if (customTag.trim()) {
      onChange(customTag.trim());
      setCustomTag("");
      closeDropdown();
    }
  };

  const handleSaveLink = () => {
    if (siteName.trim() || url.trim()) {
      onChange({ siteName: siteName.trim(), url: url.trim() });
      setSiteName("");
      setUrl("");
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="form__user-preference" ref={dropdownRef}>
      <div className="form__interest-block">
        <p className="form__label-preference">{p}</p>

        {/* Рендер выбранного тега */}
        {selectedTag ? (
          typeof selectedTag === "object" ? (
            <span className="form__tag">
              {selectedTag.siteName} -{" "}
              <a href={selectedTag.url} target="_blank" rel="noopener noreferrer">
                {selectedTag.url}
              </a>
            </span>
          ) : (
            <span className="form__tag">{selectedTag}</span>
          )
        ) : null}

        {/* Форма для добавления */}
        {isDropdownOpen && (
          <div className="form__dropdown-tagform">
            {p === "Your links:" ? (
              <>
                <input
                  type="text"
                  placeholder="Site name"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="form__tag-input"
                />
                <input
                  type="url"
                  placeholder="Link"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="form__tag-input"
                />
                <button
                  type="button"
                  className="form__savetag-button"
                  onClick={handleSaveLink}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  className="form__tag-input"
                  placeholder="Add custom tag"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                />
                <button
                  className="form__savetag-button"
                  onClick={handleAddCustomTag}
                >
                  Add
                </button>
              </>
            )}
          </div>
        )}

        {/* Кнопка добавления */}
        <button
          type="button"
          className="form__addtag-button"
          onClick={toggleDropdown}
        >
          &#43;
        </button>
      </div>
    </div>
  );
};

export default TagOfInterests;

