import "./ModalWithForm.css";
import closeIcon from "../../assets/closebtn.svg";

function ModalWithForm({ children, buttonText, title, isOpen, onClose, onSubmit, isFormValid = true }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button 
            type="submit" 
            className={`modal__submit ${!isFormValid ? 'modal__submit_disabled' : ''}`}
            disabled={!isFormValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
