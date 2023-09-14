// Your root-reducer.js file is an essential part of your Redux store setup, as it combines multiple reducers to manage different parts of your application's state within a single store.
import { combineReducers } from "@reduxjs/toolkit"; // Import the combineReducers function from Redux Toolkit
import userReducer from "./user/user.reducer"; // Import the user reducer
import sidebarReducer from "./sidebar/sidebar.reducer"; // Import the sidebar reducer

// Combine multiple reducers into a single root reducer
const rootReducers = combineReducers({
   user: userReducer, // Combine the userReducer under the 'user' key in the store
   sidebar: sidebarReducer, // Combine the sidebarReducer under the 'sidebar' key in the store
});

export default rootReducers; // Export the root reducer
