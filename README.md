# WTWR (What to Wear?)

A React-based weather app that helps users choose appropriate clothing based on current weather conditions.

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

## Features

### Weather Integration
- Real-time weather data from OpenWeatherAPI
- Temperature display in both Fahrenheit and Celsius
- Smart clothing recommendations based on weather type

### Temperature Unit Toggle
- Modern toggle switch for F/C conversion
- Context API for global state management
- Consistent temperature display across all components

### Clothing Item Management
- Add new clothing items with image URLs
- Delete items with confirmation modal
- Categorize items by weather type (hot, warm, cold)

### Routing & Navigation
- Home page with weather-filtered items
- Profile page with all user items
- React Router for seamless navigation

### Form Validation
- Real-time form validation
- URL validation for images
- Error messages and visual feedback
- Disabled submit button for invalid forms

### Mock API Integration
- JSON Server for backend simulation
- Full CRUD operations (Create, Read, Delete)
- Loading states and error handling