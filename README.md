# WTWR (What to Wear?)

A React-based weather app that helps users choose appropriate clothing based on current weather conditions.

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

## Features

### ✅ Weather Integration
- Real-time weather data from OpenWeatherAPI
- Temperature display in both Fahrenheit and Celsius
- Smart clothing recommendations based on weather type

### ✅ Temperature Unit Toggle
- Modern toggle switch for F/C conversion
- Context API for global state management
- Consistent temperature display across all components

### ✅ Clothing Item Management
- Add new clothing items with image URLs
- Delete items with confirmation modal
- Categorize items by weather type (hot, warm, cold)

### ✅ Routing & Navigation
- Home page with weather-filtered items
- Profile page with all user items
- React Router for seamless navigation

### ✅ Form Validation
- Real-time form validation
- URL validation for images
- Error messages and visual feedback
- Disabled submit button for invalid forms

### ✅ Mock API Integration
- JSON Server for backend simulation
- Full CRUD operations (Create, Read, Delete)
- Loading states and error handling

## Technologies Used

- **React 18** - Component-based UI library
- **React Router 6** - Client-side routing
- **React Context** - Global state management
- **CSS3** - Custom styling with BEM methodology
- **Vite** - Fast build tool and dev server
- **JSON Server** - Mock REST API
- **OpenWeatherAPI** - Weather data integration

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd se_project_react
```

2. Install dependencies:
```bash
npm install
```

3. Start the JSON server (in one terminal):
```bash
npm run server
```

4. Start the React app (in another terminal):
```bash
npm run dev
```

5. Open your browser to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run server` - Start JSON server on port 3001
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## API Endpoints

The JSON server provides the following endpoints:

- `GET /items` - Fetch all clothing items
- `POST /items` - Add a new item
- `DELETE /items/:id` - Delete an item

## Project Structure

```
src/
├── components/          # React components
│   ├── App/            # Main app component
│   ├── Header/         # Navigation header
│   ├── Main/           # Home page content
│   ├── Profile/        # Profile page
│   ├── ToggleSwitch/   # Temperature toggle
│   ├── AddItemModal/   # Add item form
│   └── ...
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── utils/              # Utility functions
└── assets/             # Images and icons
```

## Links

Figma Design
