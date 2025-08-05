import { API_KEY, LATITUDE, LONGITUDE } from "./constants";

export async function fetchWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=imperial&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Weather API error");
  const data = await response.json();
  return extractWeatherData(data);
}

export function extractWeatherData(data) {
  const temperature = Math.round(data.main.temp);
  const city = data.name;
  const weatherType = getWeatherType(temperature);
  return { temperature, city, weatherType };
}

export function getWeatherType(temperature) {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}