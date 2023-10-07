import ChangePass from "../components/change-pass.component"; // Import the ChangePass component
import useUser from "../hooks/useUser"; // Import the useUser custom hook
import { Outlet, Navigate, useLocation } from "react-router-dom"; // Import components from React Router
import { Box, Typography, useMediaQuery, Button } from '@mui/material'; // Import MUI components
import { useDispatch } from "react-redux"; // Import useDispatch hook from Redux
import { logout } from "../store/user/user.reducer"; // Import the logout action from Redux

const RequireAuth = () => {
   const { userInfo } = useUser(); // Get user info from the custom hook
   const location = useLocation(); // Get the current location from React Router
   return (
      userInfo
         ? userInfo.isFirstLogin
            ? <ChangePass userId={userInfo.id} /> // If it's the user's first login, show the ChangePass component
            : userInfo.isActive
               ? <Outlet /> // If the user is active, render the child routes
               : <AccountBlocked /> // If the user is not active, show the AccountBlocked component
         : <Navigate to="/" state={{ from: location }} replace /> // If there's no user info, navigate to the login page
   );
};

const AccountBlocked = () => {
   const isNonMobile = useMediaQuery("(min-width:600px)"); // Check for non-mobile screen size
   const dispatch = useDispatch(); // Get the Redux dispatch function

   const logoutHandler = () => {
      dispatch(logout()); // Dispatch the logout action to log the user out
   };

   return (
      <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
         <Box height="40%" width={isNonMobile ? "40%" : "90%"} m="20px" borderRadius="12px" textAlign="center">
            <Typography variant="h2">Votre compte a été désactivé. Veuillez prendre contact avec l&apos;administration pour obtenir davantage d&apos;informations.</Typography>
            <Button
               sx={{ mt: "20px" }}
               variant="contained"
               color="info"
               onClick={logoutHandler}
            >
               Déconnecter
            </Button>
         </Box>
      </Box>
   );
};

export default RequireAuth;