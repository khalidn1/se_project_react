import React from "react";
import "./ItemModal.css";

function ItemModal({ item, onClose }) {
  return (
    <div className="modal modal_type_item">
      <button className="modal__close" onClick={onClose}>×</button>
      <img src={item.image} alt={item.title} className="modal__image" />
      <h2 className="modal__title">{item.title}</h2>
    </div>
  );
}

export default ItemModal;