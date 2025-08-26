import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal, isLoading }) => {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!values.name || values.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (!values.imageUrl || !isValidUrl(values.imageUrl)) {
      newErrors.imageUrl = "Please enter a valid image URL";
    }

    if (!values.weather) {
      newErrors.weather = "Please select a weather type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      onAddItem(values, () => {
        resetForm();
        setErrors({});
      });
    }
  };

  const isFormValid = values.name.trim().length >= 2 && 
                      values.imageUrl && 
                      isValidUrl(values.imageUrl) && 
                      values.weather &&
                      !isLoading;

  return (
    <ModalWithForm
      buttonText={isLoading ? "Adding..." : "Add garment"}
      title="New garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className={`modal__input ${errors.name ? 'modal__input_type_error' : ''}`}
          id="name"
          name="name"
          placeholder="name"
          value={values.name}
          onChange={handleChange}
          required
          minLength="2"
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className={`modal__input ${errors.imageUrl ? 'modal__input_type_error' : ''}`}
          id="imageUrl"
          name="imageUrl"
          placeholder="image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
        {errors.imageUrl && <span className="modal__error">{errors.imageUrl}</span>}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        {errors.weather && <span className="modal__error modal__error_type_radio">{errors.weather}</span>}
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />{" "}
          Hot
        </label>
        <label
          htmlFor="warm"
          className="modal__label modal__label_type_radio"
        >
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />{" "}
          Warm
        </label>
        <label
          htmlFor="cold"
          className="modal__label modal__label_type_radio"
        >
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
