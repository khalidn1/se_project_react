import React from "react";
import "./WeatherCard.css";

function WeatherCard({ temperature }) {
  return (
    <div className="weather-card">
      <span className="weather-card__temp">{temperature}°F</span>
    </div>
  );
}

export default WeatherCard;
