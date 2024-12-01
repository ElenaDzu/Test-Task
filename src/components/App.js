import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";

const initialProfile = {
  avatar: "", // Аватар хранится отдельно
  name: "",
  surname: "",
  jobTitle: "",
  phone: "",
  address: "",
  email: "",
  pitch: "",
  interests: [],
  visibility: "Private", // Значение по умолчанию
};

const App = () => {
  const [profile, setProfile] = useState(initialProfile); // Текущий профиль
  const [tempProfile, setTempProfile] = useState(initialProfile); // Временный профиль
  const [previousProfile, setPreviousProfile] = useState(initialProfile); // Последний сохранённый профиль
  const [avatarPreview, setAvatarPreview] = useState(""); // Превью аватара
  const [errorMessages, setErrorMessages] = useState({});

  // Загружаем профиль и аватар из localStorage при монтировании
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile")) || initialProfile;
    const savedAvatar = localStorage.getItem("avatar") || "";

    setProfile(savedProfile);
    setTempProfile({ ...savedProfile, avatar: savedAvatar });
    setPreviousProfile(savedProfile);
    setAvatarPreview(savedAvatar); // Загружаем аватар
  }, []);

  // Сохранение профиля
  const saveProfile = () => {
    if (Object.keys(errorMessages).length > 0) {
      // console.error("Невозможно сохранить профиль из-за ошибок:", errorMessages);
      return;
    }

    try {
      // console.log("Сохраняем профиль:", tempProfile);

      // Сохраняем аватар отдельно
      localStorage.setItem("avatar", tempProfile.avatar);

      // Сохраняем профиль без аватара
      const profileToSave = { ...tempProfile };
      delete profileToSave.avatar;
      localStorage.setItem("profile", JSON.stringify(profileToSave));

      // Сохраняем текущее состояние профиля в previousProfile
      setPreviousProfile(profile);

      setProfile(tempProfile);
      // console.log("Профиль сохранён:", profileToSave);
    } catch (error) {
      // console.error("Ошибка сохранения профиля:", error.message);
    }
  };

  // Отмена последних сохранений
  const cancelChanges = () => {
    // console.log("Current profile:", profile);
    // console.log("Restoring to previous profile:", previousProfile);

    if (JSON.stringify(profile) === JSON.stringify(previousProfile)) {
      // console.log("No changes detected in saved profile. Nothing to cancel.");
      return;
    }

    // Восстанавливаем последнее сохранённое состояние
    const restoredAvatar = localStorage.getItem("avatar") || ""; // Восстанавливаем аватар
    setProfile(previousProfile);
    setTempProfile({ ...previousProfile, avatar: restoredAvatar });
    setAvatarPreview(restoredAvatar);
    setErrorMessages({});
    // console.log("Изменения отменены. Восстановлен профиль:", previousProfile);
  };

  // Обработка изменения полей
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
  
    // Обновляем tempProfile
    setTempProfile((prev) => ({ ...prev, [field]: value }));
    console.log("Updated tempProfile:", tempProfile);
    console.log("Updated errorMessages:", errorMessages);
  };
  
  
  

  // Обработка загрузки аватара
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; // Конвертируем изображение в Base64
        setAvatarPreview(base64Image); // Устанавливаем превью
        handleChange("avatar", base64Image);
      };
      reader.readAsDataURL(file); // Конвертация в Base64
    } else {
      // console.error("Файл не является изображением или отсутствует");
    }
  };

  return (
    <div className="page">
      <div className="profile">
        <Header />
        <Main
          profile={tempProfile}
          avatarPreview={avatarPreview}
          onChange={(field, value, element) => {
            console.log("onChange вызван в App:", { field, value, element });
            handleChange(field, value, element);
          }}
          onAvatarUpload={handleAvatarUpload}
          onSave={saveProfile}
          onCancel={cancelChanges}
          errorMessages={errorMessages}
        />
      </div>
    </div>
  );
};

export default App;