import React, { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);
  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__checkbox"
        onChange={handleToggleSwitchChange}
        checked={currentTemperatureUnit === "C"}
      />
      <span className="switch__slider">
        <span className="switch__temp-f">F</span>
        <span className="switch__temp-c">C</span>
      </span>
    </label>
  );
}

export default ToggleSwitch;
