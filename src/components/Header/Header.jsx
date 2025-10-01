import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ 
  handleAddClick, 
  weatherData, 
  isLoggedIn, 
  handleSignInClick, 
  handleSignUpClick,
  handleLogout 
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    return names.length > 1 
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : `${names[0][0]}`.toUpperCase();
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      
      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <div className="header__user-section">
            <Link to="/profile" className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              {currentUser?.avatar ? (
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="header__avatar" 
                />
              ) : (
                <div className="header__avatar header__avatar_placeholder">
                  {getInitials(currentUser?.name)}
                </div>
              )}
            </Link>
            <button 
              onClick={handleLogout}
              type="button" 
              className="header__logout-btn"
            >
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <div className="header__auth-section">
          <button
            onClick={handleSignUpClick}
            type="button"
            className="header__auth-btn"
          >
            Sign Up
          </button>
          <button
            onClick={handleSignInClick}
            type="button"
            className="header__auth-btn"
          >
            Sign In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
