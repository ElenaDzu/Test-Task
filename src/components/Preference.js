import React from "react";
import TagOfInterests from "./TagOfInterests";

function Preference({ profile, onChange }) {
  return (
    <>
      <TagOfInterests
        p="The scopes of your interest:"
        selectedTags={profile}
        onChange={onChange}
      />
      <TagOfInterests
        p="Potential interests:"
        selectedTags={profile} // Добавляем новое состояние
        onChange={onChange}
      />
      <TagOfInterests
        p="Your links:"
        selectedTags={profile} // Добавляем новое состояние
        onChange={onChange}
      />
    </>
  );
}

export default Preference; 