import { useContext } from "react";
import "./ItemModal.css";
import closeIcon from "../../assets/closebtn.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDeleteItem }) {
  const { currentUser } = useContext(CurrentUserContext);
  
  const isOwner = card.owner === currentUser?._id;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <img src={card.imageUrl || card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {isOwner && (
            <button 
              type="button" 
              className="modal__delete-btn"
              onClick={() => onDeleteItem(card)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
