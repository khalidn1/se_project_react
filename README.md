# WTWR (What to Wear?)

A React-based weather app that helps users choose appropriate clothing based on current weather conditions.

## Backend Repository

The backend API for this project can be found at: [WTWR Backend Repository](https://github.com/khalidn1/se_project_express)

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

## Features

### Authentication & User Management
- User registration and login system
- JWT token-based authentication
- Protected routes for authenticated users
- Profile editing capabilities
- User avatar support with initials fallback

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
- Delete items with confirmation modal (owner only)
- Categorize items by weather type (hot, warm, cold)
- Like/unlike functionality for clothing items
- Owner-specific item visibility on profile page

### Routing & Navigation
- Home page with weather-filtered items
- Profile page with user-specific items
- React Router for seamless navigation
- Protected routes for authenticated features

### Form Validation
- Real-time form validation for all forms
- URL validation for images
- Email validation for authentication
- Password confirmation matching
- Error messages and visual feedback
- Disabled submit button for invalid forms

### API Integration
- Full authentication API with registration, login, and profile updates
- Complete CRUD operations for clothing items
- Like/unlike API endpoints
- Loading states and error handling
- Automatic token validation on app load