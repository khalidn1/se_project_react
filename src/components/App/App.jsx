import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchWeather } from "../../utils/weatherApi.js";
import defaultClothingItems from "../../utils/defaultClothingItems";

function App() {
  const [weather, setWeather] = useState(null);
  const [count, setCount] = useState(0);
  const [clothingItems, setClothingItems] = useState([]);

  useEffect(() => {
    fetchWeather().then(setWeather).catch(console.error);

    setClothingItems(defaultClothingItems);
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>count is {count}</button>
      </div>
      {weather && (
        <div>
          <p>City: {weather.city}</p>
          <p>Temperature: {weather.temperature}°F</p>
          <p>Weather Type: {weather.weatherType}</p>
        </div>
      )}
      <ul>
        {clothingItems.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
