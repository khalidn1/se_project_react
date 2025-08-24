import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { getItems, addItem, deleteItem } from "../../utils/api";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setItemToDelete(null);
  };

  const openConfirmationModal = (item) => {
    setItemToDelete(item);
    setActiveModal("delete-confirmation");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddItemSubmit = (item, resetForm) => {
    setIsLoading(true);
    addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
        resetForm();
      })
      .catch((error) => {
        console.error("Failed to add item:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteItem = (item) => {
    setIsLoading(true);
    deleteItem(item._id)
      .then(() => {
        const updatedItems = clothingItems.filter((clothingItem) => clothingItem._id !== item._id);
        setClothingItems(updatedItems);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
      });

    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((error) => {
        console.error("Failed to fetch clothing items:", error);
      });
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <BrowserRouter>
          <div className="page_content">
            <Header 
              handleAddClick={handleAddClick} 
              weatherData={weatherData} 
            />
            <Routes>
              <Route 
                path="/" 
                element={
                  <Main 
                    weatherData={weatherData} 
                    handleCardClick={handleCardClick} 
                    clothingItems={clothingItems} 
                  />
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <Profile 
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                  />
                } 
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
            onCloseModal={closeActiveModal}
            isLoading={isLoading}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteItem={openConfirmationModal}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirmation"}
            onClose={closeActiveModal}
            onConfirm={handleDeleteItem}
            item={itemToDelete}
          />
        </BrowserRouter>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}
export default App;
