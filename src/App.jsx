import { useEffect } from "react";
import Login from "./routes/Login"; // Import the Login component
import './App.css'; // Import CSS styles
import { Route, Routes } from 'react-router'; // Import routing components from React Router
import { CssBaseline, ThemeProvider } from "@mui/material"; // Import components from MUI
import { ColorModeContext, useMode } from "./theme"; // Import theme-related components
import DashboardDirecteur from "./routes/dashboard-directeur"; // Import DashboardDirecteur component
import DashboardDeveloppeur from "./routes/dashboard-developpeur"; // Import DashboardDeveloppeur component
import RequireAuth from "./utils/require-auth"; // Import RequireAuth component for protected routes
import DashboardRH from "./routes/dashboard-rh"; // Import DashboardRH component
import useUser from "./hooks/useUser"; // Import custom hook useUser
import { GET_USER_BY_ID } from "../api/user-crud"; // Import API URL for getting user by ID
import axios from "../api/axios"; // Import axios for making API requests
import { setUserInfo } from "./store/user/user.reducer"; // Import Redux action for setting user info
import { useDispatch } from "react-redux"; // Import useDispatch hook
import { useRef } from "react"; // Import useRef hook

function App() {
  const [theme, colorMode] = useMode(); // Get theme and color mode
  const { userInfo } = useUser(); // Get user info from custom hook
  const dispatch = useDispatch(); // Get Redux dispatch function
  const apiCallMade = useRef(false); // To track whether the API call has been made

  // Use useEffect to make an API call to get user info by ID
  useEffect(() => {
    if (!apiCallMade.current && userInfo?.id) {
      apiCallMade.current = true; // Mark the API call as made
      const fetchData = async () => {
        try {
          const response = await axios.get(GET_USER_BY_ID(userInfo.id)); // Make GET request to retrieve user info
          response.data !== userInfo && dispatch(setUserInfo(response.data)); // Dispatch action to update user info if it has changed
        } catch (error) {
          console.log(error);
        }
      };
      fetchData(); // Call the fetchData function
    }
  }, [userInfo, dispatch]); // Dependencies for useEffect

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Public routes */}
          <Route path='/' element={<Login />} />
          {/* Protected routes */}
          <Route element={<RequireAuth />}>
            <Route path='dashboard-rh/*' element={<DashboardRH />} />
            <Route path='dashboard-dr/*' element={<DashboardDirecteur />} />
            <Route path='dashboard-dev/*' element={<DashboardDeveloppeur />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

/*
This is the main component of your React application. It handles routing and authentication logic.

useEffect is used to make an API call to retrieve user information by ID when the component mounts. It checks if the API call has been made using a useRef to avoid making multiple redundant API calls.

The <Routes> component from React Router is used to define routes for your application. Public routes (accessible without authentication) are defined first, followed by protected routes that require authentication.

Protected routes are wrapped in a <Route element={<RequireAuth />}> component, indicating that they require authentication. The RequireAuth component likely handles authentication logic.

MUI components like ThemeProvider and CssBaseline are used for theming and styling.

Custom hooks like useMode and useUser are used to access theme-related information and user data.

Redux is used for state management, and the dispatch function is used to update user information in the Redux store when it is fetched from the API.

Overall, this App.js file serves as the entry point of your React application, defining routes and handling the initialization of user data. It also sets up the theme and applies basic styling.
*/