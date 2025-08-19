// src/context/WeatherContext.jsx
import React, { createContext, useReducer } from 'react';
import { weatherReducer, initialWeatherState, WEATHER_ACTIONS } from './weatherReducer';

// Create Weather Context
export const WeatherContext = createContext();

// Weather Provider Component
export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialWeatherState);

  // STEP-BY-STEP CORS PROXY IMPLEMENTATION

// Method 1: Using cors-anywhere.herokuapp.com
const searchLocationsWithCorsAnywhere = async (cityName) => {
  if (!cityName.trim()) return;
  
  dispatch({ type: WEATHER_ACTIONS.SET_LOADING, payload: true });
  dispatch({ type: WEATHER_ACTIONS.CLEAR_ERROR });
  
  try {
    // STEP 1: Define the proxy URL
    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    
    // STEP 2: Define your target API URL
    const TARGET_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=10&language=en&format=json`;
    
    // STEP 3: Combine them (proxy + target)
    const FINAL_URL = PROXY_URL + TARGET_URL;
    
    console.log('METHOD 1 >> Calling:', FINAL_URL); // Debug log
    
    // STEP 4: Make the request
    const response = await fetch(FINAL_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // IMPORTANT: Some proxies require this header
        'X-Requested-With': 'XMLHttpRequest'
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Success:', data); // Debug log
    
    if (data.results && data.results.length > 0) {
      dispatch({ type: WEATHER_ACTIONS.SET_LOCATIONS, payload: data.results });
    } else {
      dispatch({ type: WEATHER_ACTIONS.SET_LOCATIONS, payload: [] });
      dispatch({ type: WEATHER_ACTIONS.SET_ERROR, payload: 'No locations found. Try a different city name.' });
    }
    
  } catch (error) {
    console.error('❌ CORS Proxy failed:', error);
    
    // Try Method 2 as fallback
    await searchLocationsWithAllOrigins(cityName);
  }
};

// Method 2: Using allorigins.win (more reliable)
const searchLocationsWithAllOrigins = async (cityName) => {
  
    console.log('Method 1 FAILED');
  try {
    // STEP 1: AllOrigins proxy format
    const TARGET_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=10&language=en&format=json`;
    const PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(TARGET_URL)}`;
    
    console.log('🔄 Trying AllOrigins:', PROXY_URL);
    
    const response = await fetch(PROXY_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const proxyData = await response.json();
    
    // IMPORTANT: AllOrigins wraps the response in { contents: "..." }
    const data = JSON.parse(proxyData.contents);
    
    console.log('METHOD 2 >> AllOrigins Success:', data);
    
    if (data.results && data.results.length > 0) {
      dispatch({ type: WEATHER_ACTIONS.SET_LOCATIONS, payload: data.results });
    } else {
      throw new Error('No results found');
    }
    
  } catch (error) {
    console.error('❌ AllOrigins also failed:', error);
    
    
    // Try Method 3 as final fallback
    await searchLocationsWithCorsproxy(cityName);
  }
};

// Method 3: Using corsproxy.io
const searchLocationsWithCorsproxy = async (cityName) => {
  
    console.log('Method 2 FAILED');
  try {
    const TARGET_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=10&language=en&format=json`;
    const PROXY_URL = `https://corsproxy.io/?${TARGET_URL}`;
    
    console.log('METHOD 3 >> Trying Corsproxy:', PROXY_URL);
    
    const response = await fetch(PROXY_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Corsproxy Success:', data);
    
    if (data.results && data.results.length > 0) {
      dispatch({ type: WEATHER_ACTIONS.SET_LOCATIONS, payload: data.results });
    } else {
      throw new Error('No results found');
    }
    
  } catch (error) {
    console.error('❌ All proxies failed:', error);
    
    
    // Final fallback to your demo data
    handleFallbackData(cityName);
  }
};

// MAIN FUNCTION - This replaces your current searchLocations
const searchLocations = async (cityName) => {
  if (!cityName.trim()) return;
  
  dispatch({ type: WEATHER_ACTIONS.SET_LOADING, payload: true });
  dispatch({ type: WEATHER_ACTIONS.CLEAR_ERROR });
  
  console.log(`🔍 Searching for: "${cityName}"`);
  
  // Try all methods in sequence
  await searchLocationsWithAllOrigins(cityName); // Start with most reliable
};

// Enhanced fallback data function
const handleFallbackData = (cityName) => {
  
    console.log('Method 3 FAILED');
  const sampleLocations = [
    { name: "London", latitude: 51.5074, longitude: -0.1278, country: "United Kingdom", admin1: "England" },
    { name: "New York", latitude: 40.7128, longitude: -74.0060, country: "United States", admin1: "New York" },
    { name: "Tokyo", latitude: 35.6762, longitude: 139.6503, country: "Japan", admin1: "Tokyo" },
    { name: "Paris", latitude: 48.8566, longitude: 2.3522, country: "France", admin1: "Île-de-France" },
    { name: "Sydney", latitude: -33.8688, longitude: 151.2093, country: "Australia", admin1: "New South Wales" },
    { name: "Dubai", latitude: 25.2048, longitude: 55.2708, country: "United Arab Emirates", admin1: "Dubai" },
    { name: "Singapore", latitude: 1.3521, longitude: 103.8198, country: "Singapore", admin1: "Singapore" },
    { name: "Mumbai", latitude: 19.0760, longitude: 72.8777, country: "India", admin1: "Maharashtra" },
    { name: "Lahore", latitude: 31.5497, longitude: 74.3436, country: "Pakistan", admin1: "Punjab" },
    { name: "Karachi", latitude: 24.8607, longitude: 67.0011, country: "Pakistan", admin1: "Sindh" },
    { name: "Berlin", latitude: 52.5200, longitude: 13.4050, country: "Germany", admin1: "Berlin" },
    { name: "Rome", latitude: 41.9028, longitude: 12.4964, country: "Italy", admin1: "Lazio" },
    { name: "Madrid", latitude: 40.4168, longitude: -3.7038, country: "Spain", admin1: "Madrid" },
    { name: "Moscow", latitude: 55.7558, longitude: 37.6176, country: "Russia", admin1: "Moscow" },
    { name: "Cairo", latitude: 30.0444, longitude: 31.2357, country: "Egypt", admin1: "Cairo" }
  ].filter(city => 
    city.name.toLowerCase().includes(cityName.toLowerCase()) ||
    city.country.toLowerCase().includes(cityName.toLowerCase())
  );
  
  if (sampleLocations.length > 0) {
    dispatch({ type: WEATHER_ACTIONS.SET_LOCATIONS, payload: sampleLocations });
    dispatch({ type: WEATHER_ACTIONS.SET_ERROR, payload: '⚠️ Using demo data - CORS proxies failed, but weather data will be real!' });
  } else {
    dispatch({ type: WEATHER_ACTIONS.SET_ERROR, payload: '🚫 No matches found. Try: London, Paris, Tokyo, Dubai, Lahore, etc.' });
  }
};

  // Get weather data for selected location
// 🔧 FIXED getWeatherData function for WeatherContext.jsx

const getWeatherData = async (location) => {
  dispatch({ type: WEATHER_ACTIONS.SET_LOADING, payload: true });
  dispatch({ type: WEATHER_ACTIONS.CLEAR_ERROR });
  
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto&forecast_days=2`, // 🔥 2 days for more data
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    
    const now = new Date();
    let startIndex = 0;
    
    console.log('🕐 Current time (user):', now.toLocaleString());
    console.log('📊 API first time:', data.hourly.time[0]);
    console.log('📊 API last time:', data.hourly.time[data.hourly.time.length - 1]);
    
    // Method 1: Find the next upcoming hour
    for (let i = 0; i < data.hourly.time.length; i++) {
      const apiTime = new Date(data.hourly.time[i]);
      
      // If this API hour is in the future (or current hour), use it
      if (apiTime >= now) {
        startIndex = i;
        console.log('✅ Found start hour:', data.hourly.time[i], 'at index:', i);
        break;
      }
    }
    
    // Method 2: If no future hours found, use current hour
    if (startIndex === 0) {
      const currentTime = new Date(data.hourly.time[0]);
      if (currentTime < now) {
        // All hours are in the past - find closest to current time
        let closestIndex = 0;
        let smallestDiff = Infinity;
        
        for (let i = 0; i < data.hourly.time.length; i++) {
          const apiTime = new Date(data.hourly.time[i]);
          const timeDiff = Math.abs(now - apiTime);
          
          if (timeDiff < smallestDiff) {
            smallestDiff = timeDiff;
            closestIndex = i;
          }
        }
        
        startIndex = closestIndex;
        console.log('⚠️ Using closest hour:', data.hourly.time[startIndex], 'at index:', startIndex);
      }
    }
    
    // Ensure we have exactly 8 hours
    const endIndex = Math.min(startIndex + 8, data.hourly.time.length);
    
    // 🔥 FILTER THE HOURLY DATA
    const filteredHourly = {
      time: data.hourly.time.slice(startIndex, endIndex),
      temperature_2m: data.hourly.temperature_2m.slice(startIndex, endIndex),
      relative_humidity_2m: data.hourly.relative_humidity_2m.slice(startIndex, endIndex),
      wind_speed_10m: data.hourly.wind_speed_10m.slice(startIndex, endIndex),
    };

    // 🔥 CREATE PROPERLY FILTERED DATA
    const filteredData = {
      ...data,
      hourly: filteredHourly,
    };
    
    console.log('✅ Filtered hours:');
    filteredHourly.time.forEach((time, i) => {
      console.log(`  ${i + 1}. ${new Date(time).toLocaleString()} - ${filteredHourly.temperature_2m[i]}°C`);
    });
    
    dispatch({ type: WEATHER_ACTIONS.SET_SELECTED_LOCATION, payload: location });
    // 🔥 CRITICAL FIX: Dispatch the FILTERED data, not original!
    dispatch({ type: WEATHER_ACTIONS.SET_WEATHER_DATA, payload: filteredData });
    
  } catch (error) {
    console.error('Weather fetch error:', error);
    dispatch({ type: WEATHER_ACTIONS.SET_ERROR, payload: `Failed to fetch weather: ${error.message}` });
  }
};

  // Clear all data
  const resetWeatherData = () => {
    dispatch({ type: WEATHER_ACTIONS.RESET_STATE });
  };

  // Context value
  const value = {
    ...state,
    searchLocations,
    getWeatherData,
    resetWeatherData,
    clearError: () => dispatch({ type: WEATHER_ACTIONS.CLEAR_ERROR })
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};