import React from 'react';
import { useWeather } from '../hooks/useWeather';
import { formatTemperature, getWeatherDescription, getWindDirection } from '../utils/weatherCodes';

const WeatherDisplay = () => {
  const { weatherData, selectedLocation } = useWeather();

  if (!weatherData || !selectedLocation) return null;

  const currentWeather = weatherData.current_weather;
  const hourlyData = weatherData.hourly;
  const weatherInfo = getWeatherDescription(currentWeather.weathercode);

  return (
    <div className="search-container">
      {/* Header */}
      <div className="weather-header">
        <h2>{selectedLocation.name}, {selectedLocation.country}</h2>
        <p>
          {selectedLocation.admin1 && `${selectedLocation.admin1} • `}
          Current Weather
        </p>
      </div>

      {/* Main Weather Content */}
      <div className="weather-content">
        <div className="weather-grid">
          {/* Current Weather */}
          <div className="current-weather">
            <div className="weather-icon">
              {weatherInfo.icon}
            </div>
            <div className="current-temperature">
              {formatTemperature(currentWeather.temperature)}
            </div>
            <div className="weather-description">
              {weatherInfo.description}
            </div>
            
            {/* Weather Details Grid */}
            <div className="weather-details">
              <div className="weather-detail-item">
                <div className="detail-label">Wind Speed</div>
                <div className="detail-value">{currentWeather.windspeed} km/h</div>
              </div>
              <div className="weather-detail-item">
                <div className="detail-label">Wind Direction</div>
                <div className="detail-value">
                  {getWindDirection(currentWeather.winddirection)} ({currentWeather.winddirection}°)
                </div>
              </div>
              <div className="weather-detail-item">
                <div className="detail-label">Coordinates</div>
                <div className="detail-value">
                  {selectedLocation.latitude.toFixed(2)}, {selectedLocation.longitude.toFixed(2)}
                </div>
              </div>
              <div className="weather-detail-item">
                <div className="detail-label">Last Updated</div>
                <div className="detail-value">
                  {new Date(currentWeather.time).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>

          {/* Hourly Forecast */}
          <div className="hourly-forecast">
            <div className="hourly-title">
              ⏰ Next 8 Hours
            </div>
            
            <div className="hourly-list">
              {hourlyData.time.map((time, index) => (
                <div key={index} className="hourly-item">
                  <div className="hourly-time">
                    {new Date(time).toLocaleTimeString('en-US', { 
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true 
                    })}
                  </div>
                  <div className="hourly-weather">
                    <div className="hourly-temperature">
                      {formatTemperature(hourlyData.temperature_2m[index])}
                    </div>
                    <div className="hourly-details">
                      <div>💧 {hourlyData.relative_humidity_2m[index]}%</div>
                      <div>💨 {Math.round(hourlyData.wind_speed_10m[index])} km/h</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="weather-footer">
        <p>📡 Weather data provided by Open-Meteo API</p>
        <p className="debug-info">
          🐛 Showing {hourlyData.time.length} hours starting from {new Date(hourlyData.time[0]).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default WeatherDisplay;