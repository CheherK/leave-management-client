import { Box, IconButton, Tooltip, useTheme } from "@mui/material"; // Import MUI components
import { useContext } from "react"; // Import useContext hook from React
import { ColorModeContext, tokens } from "../theme"; // Import theme tokens and ColorModeContext
import InputBase from "@mui/material/InputBase"; // Import InputBase component from MUI
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"; // Import LightModeOutlinedIcon from MUI
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"; // Import DarkModeOutlinedIcon from MUI
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"; // Import NotificationsOutlinedIcon from MUI
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"; // Import SettingsOutlinedIcon from MUI
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'; // Import LogoutOutlinedIcon from MUI
import SearchIcon from "@mui/icons-material/Search"; // Import SearchIcon from MUI
import { useDispatch } from "react-redux"; // Import useDispatch from Redux
import { logout } from "../store/user/user.reducer"; // Import logout action from Redux

const Topbar = () => {
   const theme = useTheme(); // Get the current theme
   const colors = tokens(theme.palette.mode); // Get color tokens based on theme mode
   const colorMode = useContext(ColorModeContext); // Get color mode from context
   const dispatch = useDispatch(); // Get dispatch function from Redux

   // Logout handler
   const logoutHandler = () => {
      dispatch(logout()); // Dispatch the logout action
   };

   return (
      <Box display="flex" justifyContent="space-between" p={2}>
         {/* SEARCH BAR */}
         <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
         >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
               <SearchIcon />
            </IconButton>
         </Box>

         {/* ICONS */}
         <Box display="flex">
            {/* Color Mode Toggle */}
            <IconButton onClick={colorMode.toggleColorMode}>
               {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon />
               ) : (
                  <LightModeOutlinedIcon />
               )}
            </IconButton>
            <IconButton>
               <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
               <SettingsOutlinedIcon />
            </IconButton>
            {/* Logout Button */}
            <Tooltip title='Logout' placement="bottom" arrow>
               <IconButton onClick={logoutHandler} >
                  <LogoutOutlinedIcon />
               </IconButton>
            </Tooltip>
         </Box>
      </Box>
   );
};

export default Topbar;

/*
The Topbar component represents the top navigation bar in your application's dashboard.

It uses various MUI components, such as Box, IconButton, Tooltip, and icons like LightModeOutlinedIcon, DarkModeOutlinedIcon, NotificationsOutlinedIcon, SettingsOutlinedIcon, LogoutOutlinedIcon, and SearchIcon, to create the topbar layout and functionality.

The color mode toggle button (LightModeOutlinedIcon or DarkModeOutlinedIcon) allows users to switch between light and dark modes. It utilizes the colorMode.toggleColorMode function provided by the ColorModeContext.

The logoutHandler function dispatches the logout action when the logout button is clicked. This action is responsible for logging the user out of the application.

The search bar is a simple input field (InputBase) with a search icon (SearchIcon) button.

Overall, the Topbar component provides essential functionality for user interaction in the top navigation area of your application's dashboard.
 */