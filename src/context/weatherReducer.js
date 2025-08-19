// Weather Reducer Actions
export const WEATHER_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_LOCATIONS: 'SET_LOCATIONS',
  SET_SELECTED_LOCATION: 'SET_SELECTED_LOCATION',
  SET_WEATHER_DATA: 'SET_WEATHER_DATA',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  RESET_STATE: 'RESET_STATE'
};

// Initial State
export const initialWeatherState = {
  locations: [],
  selectedLocation: null,
  weatherData: null,
  loading: false,
  error: null
};

// Weather Reducer Function
export const weatherReducer = (state, action) => {
  switch (action.type) {
    case WEATHER_ACTIONS.SET_LOADING:
      return { 
        ...state, 
        loading: action.payload,
        error: action.payload ? null : state.error
      };
      
    case WEATHER_ACTIONS.SET_LOCATIONS:
      return { 
        ...state, 
        locations: action.payload, 
        loading: false 
      };
      
    case WEATHER_ACTIONS.SET_SELECTED_LOCATION:
      return { 
        ...state, 
        selectedLocation: action.payload 
      };
      
    case WEATHER_ACTIONS.SET_WEATHER_DATA:
      return { 
        ...state, 
        weatherData: action.payload, 
        loading: false 
      };
      
    case WEATHER_ACTIONS.SET_ERROR:
      return { 
        ...state, 
        error: action.payload, 
        loading: false 
      };
      
    case WEATHER_ACTIONS.CLEAR_ERROR:
      return { 
        ...state, 
        error: null 
      };
      
    case WEATHER_ACTIONS.RESET_STATE:
      return initialWeatherState;
      
    default:
      return state;
  }
};