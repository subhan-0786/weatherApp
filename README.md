# 🌤️ Weather App - React Context API Showcase

Welcome to the **Weather App**, a sleek and modern single-page application built with React to provide real-time weather information for cities worldwide. Powered by the **Open-Meteo API**, this app lets users search for locations, select a city, and view current weather conditions along with an 8-hour forecast. Designed with a dark-mode theme and responsive layout, it offers a delightful user experience across devices. The project demonstrates modern React patterns, including the **Context API**, **useReducer**, custom hooks, and robust error handling with CORS proxy fallbacks.

## ✨ Features

- **Global City Search**: Look up any city worldwide using the Open-Meteo geocoding API.
- **Real-Time Weather**: Get current weather details (temperature, wind speed, direction, and conditions) and an 8-hour hourly forecast.
- **Responsive Design**: Enjoy a seamless experience on desktops, tablets, and mobile devices with a dark-mode, gradient-based UI.
- **State Management**: Leverages React Context API and useReducer for efficient, centralized state handling.
- **Error Handling**: Graceful handling of API failures with multiple CORS proxy fallbacks and a demo data mode.
- **Loading States**: Smooth user experience with loading spinners and disabled inputs during API calls.
- **Modern Styling**: Custom CSS with gradients, glassmorphism, and animations for a polished look.
- **Debug-Friendly**: Console logs for API calls and time filtering to aid development and troubleshooting.

## 🛠️ Tech Stack

- **React**: Frontend library for building the UI.
- **React Context API**: Manages global state without prop drilling.
- **useReducer**: Handles complex state logic predictably.
- **Custom Hooks**: Simplifies context access with `useWeather`.
- **Open-Meteo API**: Free geocoding and weather data source.
- **CSS**: Custom styles with dark-mode theme, gradients, and responsive design.
- **Vite**: Fast build tool for development and production.

## 🚀 Getting Started

Follow these steps to set up and run the Weather App locally.

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- A modern web browser

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:3000` (or the port shown in your terminal) to view the app.

### Usage

1. **Search for a City**: Type a city name (e.g., "London", "Tokyo") in the search bar and press Enter or click the Search button.
2. **Select a Location**: Choose a city from the list of results to fetch weather data.
3. **View Weather**: See current weather conditions, including temperature, wind, and a description, plus an 8-hour forecast.
4. **Handle Errors**: If something goes wrong, an error message appears with a close button for dismissal.
5. **Responsive Experience**: Try resizing the browser or accessing it on a mobile device to see the adaptive layout.

## 📂 Project Structure

```plaintext
weather-app/
├── public/
│   └── vite.svg             # Favicon
├── src/
│   ├── components/
│   │   ├── ErrorDisplay.jsx  # Displays error messages
│   │   ├── LocationsList.jsx # Lists searchable locations
│   │   ├── SearchComponent.jsx # Search input and buttons
│   │   └── WeatherDisplay.jsx # Shows weather data and forecast
│   ├── context/
│   │   └── WeatherContext.jsx # Context and provider for state
│   ├── hooks/
│   │   └── useWeather.js     # Custom hook for context access
│   ├── styles/
│   │   └── index.css         # Global styles with dark theme
│   ├── utils/
│   │   └── weatherCodes.js   # Weather code mappings and utilities
│   ├── App.jsx               # Root component
│   ├── main.jsx              # Entry point for React
│   └── weatherReducer.js     # Reducer and actions for state management
├── index.html                # Base HTML template
├── package.json              # Project metadata and dependencies
└── README.md                 # This file
```

## 🌐 API Integration

The app uses the **Open-Meteo API** for:
- **Geocoding**: `https://geocoding-api.open-meteo.com/v1/search` to find city coordinates.
- **Weather Data**: `https://api.open-meteo.com/v1/forecast` for current and hourly forecasts.

To handle CORS restrictions for geocoding, the app employs a fallback chain:
1. **cors-anywhere.herokuapp.com**
2. **api.allorigins.win**
3. **corsproxy.io**
4. **Demo Data**: Hardcoded locations if all proxies fail.

Weather forecasts are fetched directly, as the API allows CORS.


## 🐛 Debugging and Limitations

- **CORS Issues**: The app relies on external proxy services, which may have uptime or rate-limiting issues. The demo data fallback ensures functionality but may not cover all cities.
- **Time Filtering**: The app dynamically selects the next 8 hours for the forecast, which depends on accurate timezone handling in the API response.
- **API Limits**: Open-Meteo is free but may have request limits; heavy usage could require additional error handling.

Check the console for debug logs related to API calls and time filtering.

## 🔧 Future Improvements

- Add a favorites feature to save frequently searched cities.
- Include daily forecasts alongside hourly data.
- Implement client-side caching for recent searches.
- Add unit toggles (Celsius/Fahrenheit).
- Enhance error messages with specific retry suggestions.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

Please ensure your code follows the existing style and includes relevant tests.


## 🙏 Acknowledgments

- **Open-Meteo**: For providing free and reliable weather APIs.
- **React Team**: For the amazing library and ecosystem.
- **Vite**: For a lightning-fast development experience.
<<<<<<< HEAD
- **Tailwind CSS**: Inspiration for the dark-mode design (though implemented with custom CSS).

