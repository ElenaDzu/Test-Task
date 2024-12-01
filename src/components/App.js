import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";

const initialProfile = {
  avatar: "",
  name: "",
  surname: "",
  jobTitle: "",
  phone: "",
  address: "",
  email: "",
  pitch: "",
  interest: "",
  potentialInterest: "",
  siteName: "",
  url: "",
  visibility: "Private",
};

const App = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [tempProfile, setTempProfile] = useState(initialProfile);
  const [previousProfile, setPreviousProfile] = useState(initialProfile);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile")) || initialProfile;
    const savedAvatar = localStorage.getItem("avatar") || "";

    setProfile(savedProfile);
    setTempProfile({ ...savedProfile, avatar: savedAvatar });
    setPreviousProfile(savedProfile);
    setAvatarPreview(savedAvatar);
  }, []);

  const saveProfile = () => {
    if (Object.keys(errorMessages).length > 0) {
      console.error("Cannot save profile due to errors:", errorMessages);
      return;
    }

    try {
      const profileToSave = { ...tempProfile };

      // Удаляем siteName и url, если они пустые
      if (!profileToSave.siteName && !profileToSave.url) {
        profileToSave.siteName = "";
        profileToSave.url = "";
      }

      localStorage.setItem("profile", JSON.stringify(profileToSave));
      localStorage.setItem("avatar", profileToSave.avatar);

      setProfile(profileToSave);
      setPreviousProfile(profileToSave);
      console.log("Profile saved:", profileToSave);
    } catch (error) {
      console.error("Error saving profile:", error.message);
    }
  };

  const cancelChanges = () => {
    if (JSON.stringify(profile) === JSON.stringify(previousProfile)) {
      console.log("No changes to cancel.");
      return;
    }

    const restoredAvatar = localStorage.getItem("avatar") || "";
    setProfile(previousProfile);
    setTempProfile({ ...previousProfile, avatar: restoredAvatar });
    setAvatarPreview(restoredAvatar);
    setErrorMessages({});
    console.log("Changes canceled. Profile restored:", previousProfile);
  };

  const handleChange = (field, value, element = null) => {
    console.log(`Field "${field}" updated to:`, value);

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

    setTempProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setAvatarPreview(base64Image);
        handleChange("avatar", base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page">
      <div className="profile">
        <Header />
        <Main
          profile={tempProfile}
          avatarPreview={avatarPreview}
          onChange={(field, value, element) => handleChange(field, value, element)}
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
