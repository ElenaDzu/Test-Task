import React, { useState, useEffect, useRef } from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";

const App = () => {
  const initialProfile = {
    avatar: "",
    name: "",
    surname: "",
    jobTitle: "",
    phone: "",
    address: "",
    email: "",
    pitch: "",
    interests: {},
    potentialInterests: {},
    links: {},
    visibility: "Private",
  };

  const [profile, setProfile] = useState(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile")) || initialProfile;
    return savedProfile;
  });

  const [tempProfile, setTempProfile] = useState(profile);
  const [errorMessages, setErrorMessages] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
  const preferenceRef = useRef(null); // Реф для отслеживания кликов вне блока предпочтений

  // Сохранение профиля в localStorage при обновлении состояния
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  // Удаление пустых тегов при клике вне блока предпочтений
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (preferenceRef.current && !preferenceRef.current.contains(event.target)) {
        const categories = ["interests", "potentialInterests", "links"];
        setTempProfile((prev) => {
          const updatedProfile = { ...prev };
          let isUpdated = false;
  
          categories.forEach((category) => {
            const categoryData = updatedProfile[category] || {};
            Object.keys(categoryData).forEach((key) => {
              // Удаляем теги, если они пустые или только что созданы
              if (categoryData[key].trim() === "") {
                console.log(`Removing empty or newly created tag: ${key} from ${category}`);
                delete updatedProfile[category][key];
                isUpdated = true;
              }
            });
          });
  
          return isUpdated ? updatedProfile : prev; // Обновляем только при изменении
        });
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  const handleChange = (field, value, element = null) => {
    if (element) {
      const validity = element.validity || { valid: true };

      let customMessage = "";
      if (validity.valueMissing) {
        customMessage = "This field is required.";
      } else if (validity.tooShort) {
        customMessage = `Please enter at least ${element.minLength} characters.`;
      } else if (validity.tooLong) {
        customMessage = `Please enter no more than ${element.maxLength} characters.`;
      } else if (validity.patternMismatch) {
        customMessage = element.title;
      } else if (validity.typeMismatch) {
        customMessage = "Please enter a valid value.";
      }

      if (!validity.valid) {
        setErrorMessages((prev) => ({
          ...prev,
          [field]: customMessage,
        }));
      } else {
        setErrorMessages((prev) => {
          const { [field]: _, ...rest } = prev;
          return rest;
        });
      }
    }

    setTempProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePreferenceAction = (action, category, key, value) => {
    console.log("Preference Action:", { action, category, key, value });
    setTempProfile((prev) => {
      const categoryData = prev[category] || {};
      switch (action) {
        case "add":
          const keys = Object.keys(categoryData);
          if (keys.length < 13) {
            const newKey = `${category}-${keys.length + 1}`;
            return {
              ...prev,
              [category]: {
                ...categoryData,
                [newKey]: "",
              },
            };
          }
          console.warn(`Cannot add more tags to ${category}`);
          return prev;
        case "edit":
          return {
            ...prev,
            [category]: {
              ...categoryData,
              [key]: value,
            },
          };
        case "remove":
          const { [key]: _, ...remainingTags } = categoryData;
          return {
            ...prev,
            [category]: remainingTags,
          };
        default:
          console.error(`Unknown action: ${action}`);
          return prev;
      }
    });
  };

  const handleSave = () => {
    if (Object.keys(errorMessages).length > 0) {
      console.error("Cannot save due to validation errors:", errorMessages);
      return;
    }
    setProfile(tempProfile);
    setAvatarPreview(tempProfile.avatar);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setAvatarPreview(profile.avatar);
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setTempProfile((prev) => ({
          ...prev,
          avatar: base64Image,
        }));
        setAvatarPreview(base64Image);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file format.");
    }
  };

  return (
    <div className="page">
      <div className="profile">
        <Header />
        <div ref={preferenceRef}>
          <Main
            profile={tempProfile}
            avatarPreview={avatarPreview}
            onChange={handleChange}
            onSave={handleSave}
            onCancel={handleCancel}
            onAvatarUpload={handleAvatarUpload}
            onPreferenceAction={handlePreferenceAction}
            errorMessages={errorMessages}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
