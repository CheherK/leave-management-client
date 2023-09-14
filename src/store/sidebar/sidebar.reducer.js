import { createSlice } from "@reduxjs/toolkit"; // Import createSlice from Redux Toolkit

// Define the initial state for the sidebar slice of the Redux store
const INITIAL_STATE = {
   isCollapsed: false, // Flag indicating whether the sidebar is collapsed or expanded
};

// Create a sidebarSlice using createSlice
const sidebarSlice = createSlice({
   name: 'sidebar', // Name of the slice
   initialState: INITIAL_STATE, // Initial state
   reducers: {
      // Set the isCollapsed state based on the provided payload
      setIsCollapsed(state, action) {
         state.isCollapsed = action.payload;
      }
   }
});

// Export the setIsCollapsed action from sidebarSlice
export const { setIsCollapsed } = sidebarSlice.actions;

// Export the sidebar reducer
export default sidebarSlice.reducer;


//Your sidebar.reducer.js file is responsible for managing the state of the sidebar in your Redux store. It provides an action, setIsCollapsed, to control whether the sidebar is collapsed or expanded.