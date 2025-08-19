import React, { useState } from 'react';
import { useWeather } from '../hooks/useWeather';

const SearchComponent = () => {
  const { searchLocations, loading } = useWeather();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      searchLocations(searchTerm);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-container">
      <h2 className="search-title">
        🌍 Search Cities Worldwide
      </h2>
      
      <div className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter city name (e.g., London, Tokyo, New York)"
            className="search-input"
            disabled={loading}
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              className="clear-button"
              disabled={loading}
            >
              <svg className="icon-small" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        
        <button
          onClick={handleSearch}
          disabled={loading || !searchTerm.trim()}
          className="search-button"
        >
          {loading ? (
            <>
              <div className="loading-spinner"></div>
              Searching...
            </>
          ) : (
            <>
              <svg className="icon-small" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              Search
            </>
          )}
        </button>
      </div>
      
      <div className="search-hint">
        💡 Try searching for major cities like London, New York, Tokyo, Paris, or Sydney
      </div>
    </div>
  );
};

export default SearchComponent;