import "./Main.css";
import WeatherCard from "../weatherCard/WeatherCard";
import ItemCard from "../itemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

export default function Main({ weatherData, handleCardClick }) {
  return (
    <div className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F} &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </div>
  );
}
