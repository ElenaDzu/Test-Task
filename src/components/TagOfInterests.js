 
import React, { useState, useEffect, useRef } from "react";

const TagOfInterests = ({ p, selectedTags, onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [customTag, setCustomTag] = useState("");
  const dropdownRef = useRef(null);

  // const handleTagClick = (tag) => {
  //   if (selectedTags.includes(tag)) {
  //     onChange(selectedTags.filter((t) => t !== tag)); // Удаляем тег
  //   } else if (selectedTags.length < 13) {
  //     onChange([...selectedTags, tag]); // Добавляем тег
  //   }
  // };

  // const handleAddCustomTag = (e) => {
  //   e.preventDefault();
  //   if (
  //     customTag.trim() &&
  //     !selectedTags.includes(customTag) &&
  //     selectedTags.length < 13
  //   ) {
  //     onChange([...selectedTags, customTag.trim()]);
  //     setCustomTag(""); // Сбрасываем поле ввода
  //   }
  // };

  // const toggleDropdown = () => {
  //   setIsDropdownOpen((prev) => !prev);
  // };

  // const closeDropdown = () => {
  //   setIsDropdownOpen(false);
  // };

  // // Закрытие выпадающего списка при клике вне его
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       closeDropdown();
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="form__user-preference" ref={dropdownRef}>
      {/* <div className="form__interest-block">
        <p className="form__label-preference">{p}</p>
        {selectedTags.map((tag, index) => (
          <span
            key={index}
            className="form__tag"
            // onClick={() => handleTagClick(tag)}
          >
            {tag}
          </span>
        ))}
      <button
        type="button"
        className="form__addtag-button"
        onClick={toggleDropdown}
      >
        &#43;
      </button>
      </div>
      {isDropdownOpen && (
          <div className="form__dropdown-tagform">
            <input
              type="text"
              className="form__tag-input "
              placeholder="Add custom tag"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              maxLength={20}
            />
            <button
              className="form__savetag-button"
              // onClick={handleAddCustomTag}
            >
              Add
            </button>
          </div>
      )}
      {selectedTags.length === 13 && (
        <p className="form__error-message">You can select up to 13 tags only.</p>
      )} */}
    </div>
  );
};

export default TagOfInterests; 