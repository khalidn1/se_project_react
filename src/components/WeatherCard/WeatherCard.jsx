import React, { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

export default function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperature = weatherData.temp?.[currentTemperatureUnit] || 999;
  const condition = weatherData.condition || "sunny";
  const isDay = weatherData.isDay !== undefined ? weatherData.isDay : true;
  
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === isDay &&
      option.condition === condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{temperature} &deg; {currentTemperatureUnit}</p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"}time ${weatherOption?.condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}
