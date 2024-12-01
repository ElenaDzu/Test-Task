import React from "react";
import TagOfInterests from "./TagOfInterests";

function Preference({ profile, onChange }) {
  return (
    <>
<Preference
  profile={profile}
  onChange={(field, value) => onChange(field, value)}
/>
<TagOfInterests
  p="Your interests"
  profile={profile}
  onChange={(field, value) => onChange(field, value)}
/>
<TagOfInterests
  p="Your links:"
  profile={profile}
  onChange={(field, value) => onChange(field, value)}
/>
    </>
  );
}

export default Preference;
