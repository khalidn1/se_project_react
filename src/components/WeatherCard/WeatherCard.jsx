import React from "react";

function WeatherCard({ temperature }) {
  return (
    <div className="weather-card">
      <span className="weather-card__temp">{temperature}°F</span>
    </div>
  );
}

export default WeatherCard;