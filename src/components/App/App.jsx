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
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { getItems, addItem, deleteItem, addCardLike, removeCardLike } from "../../utils/api";
import { register, signin, checkToken, updateProfile } from "../../utils/auth";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

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
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
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

  const handleRegister = (userData, resetForm) => {
    setIsLoading(true);
    register(userData)
      .then(() => {
        return signin({ email: userData.email, password: userData.password });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
        resetForm();
      })
      .catch((error) => {
        console.error("Failed to register:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = (userData, resetForm) => {
    setIsLoading(true);
    signin(userData)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
        resetForm();
      })
      .catch((error) => {
        console.error("Failed to login:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateUser = (userData, callback) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);
    updateProfile(userData, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
        if (callback) callback();
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleAddItemSubmit = (item, resetForm) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);
    addItem(item, token)
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

  const handleDeleteItem = () => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);
    deleteItem(itemToDelete._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemToDelete._id)
        );
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
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

    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Failed to validate token:", error);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={currentUser}>
          <BrowserRouter>
            <div className="page_content">
              <Header 
                handleAddClick={handleAddClick} 
                weatherData={weatherData}
                isLoggedIn={isLoggedIn}
                handleSignInClick={handleLoginClick}
                handleSignUpClick={handleRegisterClick}
                handleLogout={handleSignOut}
              />
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <Main 
                      weatherData={weatherData} 
                      handleCardClick={handleCardClick} 
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile 
                        clothingItems={clothingItems}
                        handleCardClick={handleCardClick}
                        handleAddClick={handleAddClick}
                        onCardLike={handleCardLike}
                        isLoggedIn={isLoggedIn}
                        onEditProfile={handleEditProfileClick}
                      />
                    </ProtectedRoute>
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
            <LoginModal
              isOpen={activeModal === "login"}
              onLogin={handleLogin}
              onCloseModal={closeActiveModal}
              isLoading={isLoading}
              onSignUpClick={handleRegisterClick}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onRegister={handleRegister}
              onCloseModal={closeActiveModal}
              isLoading={isLoading}
              onSignInClick={handleLoginClick}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onUpdateUser={handleUpdateUser}
              onCloseModal={closeActiveModal}
              isLoading={isLoading}
            />
            <DeleteConfirmationModal
              isOpen={activeModal === "delete-confirmation"}
              onClose={closeActiveModal}
              onConfirm={handleDeleteItem}
              item={itemToDelete}
            />
          </BrowserRouter>
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}
export default App;
