import ChangePass from "../components/change-pass.component";
import useUser from "../hooks/useUser";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Box, Typography, useMediaQuery, Button } from '@mui/material';
import { useDispatch } from "react-redux";
import { logout } from "../store/user/user.reducer";


const RequireAuth = () => {
   const { userInfo } = useUser();
   const location = useLocation();
   return (
      userInfo
         ?
         userInfo.isFirstLogin ?
            <ChangePass userId={userInfo.id} />
            : userInfo.isActive ? <Outlet /> : <AccountBlocked />
         : <Navigate to="/" state={{ from: location }} replace />
   );
};

const AccountBlocked = () => {
   const isNonMobile = useMediaQuery("(min-width:600px)");
   const dispatch = useDispatch();
   const logoutHandler = () => {
      dispatch(logout());
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