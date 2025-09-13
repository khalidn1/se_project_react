import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const RegisterModal = ({ isOpen, onRegister, onCloseModal, isLoading, onSignInClick }) => {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!values.name || values.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (!values.email || !isValidEmail(values.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!values.password || values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (values.avatar && !isValidUrl(values.avatar)) {
      newErrors.avatar = "Please enter a valid avatar URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
      onRegister(values, () => {
        resetForm();
        setErrors({});
      });
    }
  };

  const isFormValid = values.name.trim().length >= 2 && 
                      values.email && 
                      isValidEmail(values.email) && 
                      values.password.length >= 6 &&
                      (!values.avatar || isValidUrl(values.avatar)) &&
                      !isLoading;

  return (
    <ModalWithForm
      buttonText={isLoading ? "Signing up..." : "Sign up"}
      title="Sign up"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="register-name" className="modal__label">
        Name*{" "}
        <input
          type="text"
          className={`modal__input ${errors.name ? 'modal__input_type_error' : ''}`}
          id="register-name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
          minLength="2"
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className={`modal__input ${errors.avatar ? 'modal__input_type_error' : ''}`}
          id="register-avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
      
      <label htmlFor="register-email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className={`modal__input ${errors.email ? 'modal__input_type_error' : ''}`}
          id="register-email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      
      <label htmlFor="register-password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          className={`modal__input ${errors.password ? 'modal__input_type_error' : ''}`}
          id="register-password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
          minLength="6"
        />
        {errors.password && <span className="modal__error">{errors.password}</span>}
      </label>
      
      <div className="modal__auth-link">
        <span>or </span>
        <button 
          type="button" 
          className="modal__auth-button"
          onClick={onSignInClick}
        >
          Sign in
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
