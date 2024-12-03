import React from "react";
function Avatar({ onAvatarUpload, avatarPreview }) {
  return (
    <>
      <label className="form__add-photo">
        <input
          className="form__photo-button"
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={onAvatarUpload}
        />
        <div className="form__upload-photo">
          {avatarPreview ? (
            <img
              className="form__photo-preview"
              src={avatarPreview}
              alt="Avatar Preview"
            />
          ) : (
            <img
              className="form__photo-icon"
              src="addphoto.png"
              alt="icon"
            />
          )}
        </div>
      </label>
    </>
  );
}

export default Avatar;
