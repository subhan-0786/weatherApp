import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import SearchComponent from './components/SearchComponent';
import LocationsList from './components/LocationsList';
import WeatherDisplay from './components/WeatherDisplay';
import ErrorDisplay from './components/ErrorDisplay';

function App() {
  return (
    <WeatherProvider>
      <div className="app-container">
        {/* Header */}
        <div className="app-header">
          <h1>🌤️ Weather App</h1>
          <p>Powered by React Context API & Open-Meteo Weather Service</p>
          <p className="debug-info">
            Showcasing Context API, Custom Hooks & Modern React Patterns
          </p>
        </div>

        {/* Main Content */}
        <div>
          <ErrorDisplay />
          <SearchComponent />
          <LocationsList />
          <WeatherDisplay />
        </div>

        {/* Footer */}
        <div className="weather-footer">
          <div className="flex justify-center gap-4">
            <span>Context API | </span>
            <span>Custom Hooks | </span>
            <span>useReducer | </span>
            <span>Error Handling</span>
          </div>
          <p>Built with React • Styled with Custom CSS • API by Open-Meteo</p>
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App;