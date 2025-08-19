import React from 'react';
import { useWeather } from '../hooks/useWeather';

const ErrorDisplay = () => {
  const { error, clearError } = useWeather();

  if (!error) return null;

  return (
    <div className="error-container">
      <div className="error-content">
        <span className="error-message">{error}</span>
        <button
          onClick={clearError}
          className="error-close-button"
          aria-label="Close error"
        >
          <svg className="error-close-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;