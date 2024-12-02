import React, { useState, useEffect } from "react";

function Preference({ profile, onChange }) {
  // Инициализация состояния из localStorage или пустого объекта
  const [state, setState] = useState(() => {
    const savedState = localStorage.getItem("preferences");
    return savedState ? JSON.parse(savedState) : { interests: {}, potentialInterests: {}, links: {} };
  });

  console.log("Rendering component with state:", JSON.stringify(state));

  // Сохранение состояния в localStorage при каждом обновлении
  useEffect(() => {
    localStorage.setItem("preferences", JSON.stringify(state));
    console.log("State saved to localStorage");
  }, [state]);

  const addTag = (category) => {
    setState((prevState) => {
      const keys = Object.keys(prevState[category]);
      if (keys.length < 13) {
        const newKey = `${category}-${keys.length + 1}`;
        const newState = {
          ...prevState,
          [category]: {
            ...prevState[category],
            [newKey]: "", // Тег создается пустым
          },
        };
        console.log(`State after addTag to ${category}:`, JSON.stringify(newState));
        return newState;
      }
      console.warn(`Cannot add more tags to ${category}, limit reached.`);
      return prevState;
    });
  };

  const removeTag = (category, key) => {
    setState((prevState) => {
      const { [key]: _, ...remainingTags } = prevState[category];
      const newState = {
        ...prevState,
        [category]: remainingTags,
      };
      console.log(`State after removeTag from ${category}:`, JSON.stringify(newState));
      return newState;
    });
  };

  const renderTags = (category) => {
    console.log(`Rendering tags for ${category}:`, state[category]);
    return Object.keys(state[category]).map((key) => (
      <span
        key={key}
        className="form__tag" // Класс указывается напрямую
        onClick={() => removeTag(category, key)} // Тег удаляется при нажатии
      />
    ));
  };

  return (
    <>
      <div className="form__user-preference">
        <div className="form__interest-block">
          <p className="form__label-preference">The scopes of your interest:</p>
          {renderTags("interests")}
          <button
            className="form__addtag-button" // Класс указывается напрямую
            onClick={() => addTag("interests")}
          >
            &#43;
          </button>
        </div>
      </div>
      <div className="form__user-preference">
        <div className="form__interest-block">
          <p className="form__label-preference">Potential interests:</p>
          {renderTags("potentialInterests")}
          <button
            className="form__addtag-button" // Класс указывается напрямую
            onClick={() => addTag("potentialInterests")}
          >
            &#43;
          </button>
        </div>
      </div>
      <div className="form__user-preference">
        <div className="form__interest-block">
          <p className="form__label-preference">Your links:</p>
          {renderTags("links")}
          <button
            className="form__addtag-button" // Класс указывается напрямую
            onClick={() => addTag("links")}
          >
            &#43;
          </button>
        </div>
      </div>
    </>
  );
}

export default Preference;
