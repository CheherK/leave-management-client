import { createSelector } from "reselect"; // Import the createSelector function from Reselect

// Define a selector to get the sidebar slice of the Redux state
const selectSiderbarReducer = (state) => state.sidebar;

// Create a selector using createSelector
export const selectSidebar = createSelector(
   [selectSiderbarReducer], // Define the input selectors as an array (in this case, only one input selector)
   (sidebarSlice) => sidebarSlice // Define the output selector function that derives the final result
);
