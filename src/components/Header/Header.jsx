import React from "react";
import "./Header.css";
import logo from "../../assets/logo.png";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({ location, onAddClothes }) {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <span className="header__date">{currentDate}</span>
      <span className="header__location">{location}</span>
      <button className="header__add-btn" onClick={onAddClothes}>
        Add Clothes
      </button>
      <div className="header__user">
        <img
          src="/assets/avatar.png"
          alt="User Avatar"
          className="header__avatar"
        />
        <span className="header__username">John Doe</span>
      </div>
    </header>
  );
}

export default Header;
