import React, { useContext } from "react";
import "./SideBar.css";
import avatar from "../../assets/avatar.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfile }) {
  const { currentUser } = useContext(CurrentUserContext);

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    return names.length > 1 
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : `${names[0][0]}`.toUpperCase();
  };

  return (
    <div className="sidebar">
      {currentUser?.avatar ? (
        <img 
          src={currentUser.avatar} 
          alt={currentUser.name} 
          className="sidebar__avatar" 
        />
      ) : (
        <div className="sidebar__avatar sidebar__avatar_placeholder">
          {getInitials(currentUser?.name)}
        </div>
      )}
      <p className="sidebar__username">{currentUser?.name}</p>
      <button 
        onClick={onEditProfile}
        className="sidebar__edit-btn"
        type="button"
      >
        Change profile data
      </button>
    </div>
  );
}

export default SideBar;
