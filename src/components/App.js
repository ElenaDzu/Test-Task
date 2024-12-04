import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import { initialProfile } from "../constans.js";

const App = () => {

    const [profile, setProfile] = useState(() => {
      const savedProfile = JSON.parse(localStorage.getItem("profile")) || initialProfile;
      return savedProfile;
    });
    const [prevProfile, setPrevProfile] = useState(profile);
    const [tempProfile, setTempProfile] = useState(profile);
    const [errorMessages, setErrorMessages] = useState({});
    const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
    const preferenceRef = useRef(null);
  
    // Сохранение профиля в localStorage
    useEffect(() => {
      localStorage.setItem("profile", JSON.stringify(profile));
    }, [profile]);
  
    // Удаление пустых тегов при клике вне области предпочтений
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
                if (categoryData[key].trim() === "") {
                  delete updatedProfile[category][key];
                  isUpdated = true;
                }
              });
            });
  
            return isUpdated ? updatedProfile : prev;
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
    }, []);
  
    // Управление действиями для предпочтений
    const handlePreferenceAction = useCallback((action, category, key, value) => {
      setTempProfile((prev) => {
        const categoryData = prev[category] || {};
    
        switch (action) {
          case "add": {
            const hasEmptyTag = Object.values(categoryData).some((val) => val.trim() === "");
            if (hasEmptyTag) {
              alert("Please fill in the empty tag before adding a new one.");
              return prev;
            }
    
            const keys = Object.keys(categoryData);
            const newKey = `${category}-${keys.length + 1}`;
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
      // Проверяем наличие ошибок валидации в инпутах
      if (Object.keys(errorMessages).length > 0) {
        alert("Please fix the validation errors before saving.");
        return;
      }
    
      // Проверяем наличие невалидных тегов (пустые или некорректные)
      const invalidTags = Object.keys(tempProfile).some((category) => {
        if (["interests", "potentialInterests", "links"].includes(category)) {
          const tags = tempProfile[category];
          if (tags) {
            return Object.values(tags).some((tag) => !tag || tag.trim() === "");
          }
        }
        return false;
      });
    
      if (invalidTags) {
        alert("Please ensure all tags are valid before saving.");
        return;
      }
    
      // Очистка профиля от пустых данных
      const cleanedProfile = { ...tempProfile };
      Object.keys(cleanedProfile).forEach((category) => {
        if (typeof cleanedProfile[category] === "object") {
          const cleanedCategory = {};
          Object.keys(cleanedProfile[category]).forEach((key) => {
            if (cleanedProfile[category][key].trim() !== "") {
              cleanedCategory[key] = cleanedProfile[category][key];
            }
          });
          cleanedProfile[category] = cleanedCategory;
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
  
