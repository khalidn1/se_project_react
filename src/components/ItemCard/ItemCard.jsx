import React from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="item-card">
      <img
        src={item.image}
        alt={item.title}
        className="item-card__image"
        onClick={() => onCardClick(item)}
      />
      <span className="item-card__title">{item.title}</span>
    </li>
  );
}

export default ItemCard;