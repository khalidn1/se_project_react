import React from "react";
import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/closebtn.svg";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, item }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_confirmation">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <h2 className="modal__title modal__title_type_confirmation">
          Are you sure you want to delete this item?
        </h2>
        <p className="modal__text">This action is irreversible.</p>
        <div className="modal__buttons">
          <button
            type="button"
            className="modal__confirm-btn"
            onClick={() => onConfirm(item)}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="modal__cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
