import { configureStore } from "@reduxjs/toolkit"; // Import the configureStore function from Redux Toolkit
import rootReducers from "./root-reducer"; // Import the root reducer for your Redux store
import logger from 'redux-logger'; // Import the Redux logger middleware

// Define an array of middlewares for Redux
// eslint-disable-next-line no-undef
const middlewares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);

// Create the Redux store using configureStore
const store = configureStore({
   reducer: rootReducers, // Set the root reducer for the store
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middlewares), // Apply middlewares to the store
});

export default store; // Export the Redux store
