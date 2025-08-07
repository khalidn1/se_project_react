import React from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";

function Main({ weather, items, handleCardClick }) {
  const filteredItems = items.filter(item => item.weather === weather.type);

  return (
    <main className="main">
      <WeatherCard temperature={weather.temperature} />
      <ul className="main__items">
        {filteredItems.map(item => (
          <ItemCard key={item.id} item={item} onCardClick={handleCardClick} />
        ))}
      </ul>
    </main>
  );
}

export default Main;