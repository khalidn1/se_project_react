import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({ title, name, buttonText, onClose, children }) {
  return (
    <div className={`modal modal_type_${name}`}>
      <button className="modal__close" onClick={onClose}>×</button>
      <form className="modal__form" name={name}>
        <h2 className="modal__title">{title}</h2>
        {children}
        <button className="modal__submit" type="submit">{buttonText}</button>
      </form>
    </div>
  );
}

export default ModalWithForm;