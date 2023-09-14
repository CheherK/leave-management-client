//Selectors like selectUser can be used to efficiently access specific parts of your Redux store's state. In this case, selectUser provides direct access to the user slice of the Redux state, making it easier to retrieve user-related data in your application.
import { createSelector } from "reselect"; // Import the createSelector function from Reselect

// Define a selector to get the user slice of the Redux state
const selectUserReducer = (state) => state.user;

// Create a selector using createSelector
export const selectUser = createSelector(
   [selectUserReducer], // Define the input selectors as an array (in this case, only one input selector)
   (userSlice) => userSlice // Define the output selector function that derives the final result
);
