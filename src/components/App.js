import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import { initialProfile } from "../constans.js";

const App = () => {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("profile");
    return savedProfile ? JSON.parse(savedProfile) : initialProfile;
  });

  const [prevProfile, setPrevProfile] = useState(profile);
  const [tempProfile, setTempProfile] = useState(profile);
  const [errorMessages, setErrorMessages] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
  const preferenceRef = useRef(null);

  // Сохранение профиля в localStorage
  useEffect(() => {
    try {
      localStorage.setItem("profile", JSON.stringify(profile));
    } catch (e) {
      console.error("Failed to save profile to localStorage:", e);
    }
  }, [profile]);

  // Удаление пустых тегов при клике вне области предпочтений
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (preferenceRef.current && !preferenceRef.current.contains(event.target)) {
        setTempProfile((prev) => {
          const updatedProfile = { ...prev };
          ["interests", "potentialInterests", "links"].forEach((category) => {
            const categoryData = updatedProfile[category] || {};
            Object.keys(categoryData).forEach((key) => {
              if (categoryData[key].trim() === "") {
                delete categoryData[key];
              }
            });
          });
          return updatedProfile;
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Обработка изменений в полях ввода
  const handleChange = useCallback((field, value, element = null) => {
    if (element) {
      const validity = element.validity || { valid: true };
      const customMessage = 
        validity.valueMissing ? "This field is required." :
        validity.tooShort ? `Please enter at least ${element.minLength} characters.` :
        validity.tooLong ? `Please enter no more than ${element.maxLength} characters.` :
        validity.patternMismatch ? element.title :
        validity.typeMismatch ? "Please enter a valid value." : "";

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
  }, []);

  // Управление действиями для предпочтений
  const handlePreferenceAction = useCallback((action, category, key, value) => {
    setTempProfile((prev) => {
      const categoryData = prev[category] || {};

      switch (action) {
        case "add": {
          if (Object.values(categoryData).some((val) => val.trim() === "")) {
            alert("Please fill in the empty tag before adding a new one.");
            return prev;
          }
          const newKey = `${category}-${Object.keys(categoryData).length + 1}`;
          return {
            ...prev,
            [category]: { ...categoryData, [newKey]: "" },
          };
        }
        case "edit":
          return {
            ...prev,
            [category]: { ...categoryData, [key]: value },
          };
        case "remove": {
          const { [key]: _, ...remainingTags } = categoryData;
          return {
            ...prev,
            [category]: remainingTags,
          };
        }
        default:
          return prev;
      }
    });
  }, []);

  // Сохранение профиля
  const handleSave = useCallback(() => {
    if (Object.keys(errorMessages).length > 0) {
      alert("Please fix the validation errors before saving.");
      return;
    }

    const cleanedProfile = { ...tempProfile };
    ["interests", "potentialInterests", "links"].forEach((category) => {
      if (typeof cleanedProfile[category] === "object") {
        cleanedProfile[category] = Object.fromEntries(
          Object.entries(cleanedProfile[category]).filter(([_, value]) => value.trim() !== "")
        );
      }
    });

    setPrevProfile(profile);
    setProfile(cleanedProfile);
    setAvatarPreview(cleanedProfile.avatar);
  }, [tempProfile, profile, errorMessages]);

  // Отмена изменений
  const handleCancel = useCallback(() => {
    setTempProfile(prevProfile);
    setAvatarPreview(prevProfile.avatar);
  }, [prevProfile]);

  // Обработка загрузки аватара
  const handleAvatarUpload = useCallback((event) => {
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
    }
  }, []);

  // Меморизация пропсов для компонента Main
  const memoizedMainProps = useMemo(
    () => ({
      profile: tempProfile,
      avatarPreview,
      onChange: handleChange,
      onSave: handleSave,
      onCancel: handleCancel,
      onAvatarUpload: handleAvatarUpload,
      onPreferenceAction: handlePreferenceAction,
      errorMessages,
    }),
    [
      tempProfile,
      avatarPreview,
      handleChange,
      handleSave,
      handleCancel,
      handleAvatarUpload,
      handlePreferenceAction,
      errorMessages,
    ]
  );

  return (
    <div className="page">
      <div className="profile">
        <Header />
        <div ref={preferenceRef}>
          <Main {...memoizedMainProps} />
        </div>
      </div>
    </div>
  );
};

export default App;
