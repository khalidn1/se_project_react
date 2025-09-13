import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const LoginModal = ({ isOpen, onLogin, onCloseModal, isLoading, onSignUpClick }) => {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!values.email || !isValidEmail(values.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!values.password || values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      onLogin(values, () => {
        resetForm();
        setErrors({});
      });
    }
  };

  const isFormValid = values.email && 
                      isValidEmail(values.email) && 
                      values.password.length >= 6 &&
                      !isLoading;

  return (
    <ModalWithForm
      buttonText={isLoading ? "Signing in..." : "Sign in"}
      title="Sign in"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className={`modal__input ${errors.email ? 'modal__input_type_error' : ''}`}
          id="login-email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      
      <label htmlFor="login-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className={`modal__input ${errors.password ? 'modal__input_type_error' : ''}`}
          id="login-password"
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
          onClick={onSignUpClick}
        >
          Sign up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
