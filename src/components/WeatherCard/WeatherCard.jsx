import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

export default function WeatherCard({ weatherData }) {
  const temperature = weatherData.temp?.F || weatherData.temperature;
  const condition = weatherData.condition || "sunny"; // fallback to sunny
  const isDay = weatherData.isDay !== undefined ? weatherData.isDay : true; // fallback to day
  
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
      <p className="weather-card__temp">{temperature} &deg; F</p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"}time ${weatherOption?.condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}
