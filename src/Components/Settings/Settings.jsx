import React from "react";
import SettingLeft from "./SettingLeft";
import SettingsRight from "./SettingsRight";

const Settings = () => {
  return (
    <>
      <div className="flex gap-x-10">
        <SettingLeft />
        <SettingsRight />
      </div>
    </>
  );
};

export default Settings;
