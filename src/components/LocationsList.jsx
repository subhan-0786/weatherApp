import React from 'react';
import { useWeather } from '../hooks/useWeather';

const LocationsList = () => {
  const { locations, getWeatherData, loading, selectedLocation } = useWeather();

  if (locations.length === 0) {
    return null;
  }

  return (
    <div className="locations-container">
      <h3 className="locations-title">
        📍 Select a Location ({locations.length} found)
      </h3>
      
      <div className="locations-grid">
        {locations.map((location, index) => (
          <button
            key={index}
            onClick={() => getWeatherData(location)}
            disabled={loading}
            className={`location-button ${
              selectedLocation?.name === location.name && selectedLocation?.country === location.country
                ? 'selected'
                : ''
            }`}
          >
            <div className="location-info">
              <div className="location-name">
                {location.name}
              </div>
              <div className="location-region">
                {location.admin1 && `${location.admin1}, `}
                {location.country}
              </div>
              <div className="location-coordinates">
                📍 {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}
              </div>
            </div>
            
            {loading && selectedLocation?.name === location.name ? (
              <div className="loading-spinner"></div>
            ) : (
              <svg className="location-arrow icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocationsList;