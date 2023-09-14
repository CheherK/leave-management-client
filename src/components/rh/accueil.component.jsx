import { Box, Typography, useTheme } from "@mui/material"; // Import components from Material-UI
import { tokens } from "../../theme"; // Import theme tokens
import Header from "../Header.compoent"; // Import Header component
import StatBox from "../stat-box.component"; // Import StatBox component
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'; // Import AccountBalanceWalletOutlinedIcon
import GroupRemoveOutlinedIcon from '@mui/icons-material/GroupRemoveOutlined'; // Import GroupRemoveOutlinedIcon
import useUser from "../../hooks/useUser"; // Import useUser hook
import AcceptedRequests from "../accepted-requests.component"; // Import AcceptedRequests component
import UsersOnLeave from "../users-on-leave.component"; // Import UsersOnLeave component
import { useEffect } from "react"; // Import useEffect from React
import { useDispatch } from "react-redux"; // Import useDispatch from React Redux
import axios from "../../../api/axios"; // Import axios for making API requests
import { GET_ALL_USERS_URL } from "../../../api/user-crud"; // Import URL for getting all users
import { setUsersNumber } from "../../store/user/user.reducer"; // Import action for setting users number in Redux store

const Acceuil = () => {
   // Initialize Material-UI theme and colors
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   // Custom hook to access user information
   const { userInfo: { leaveBalance }, usersNumber, usersOnLeaveNumber } = useUser();
   const dispatch = useDispatch();

   // Fetch the total number of users
   useEffect(() => {
      const fetchData = async () => {
         try {
            const usersEmptyRes = await axios.get(GET_ALL_USERS_URL);
            dispatch(setUsersNumber(usersEmptyRes?.data?.length));
         } catch (error) {
            console.error("Error fetching user data:", error);
         }
      };
      fetchData();
   }, []);

   return (
      <Box m="15px">
         <Header title="Accueil" subtitle="Bienvenue dans votre dashboard" />
         <Box
            display="flex"
            flexWrap='wrap'
            gap="20px"
         >
            {/* StatBox for Leave Balance */}
            <StatBox
               title={leaveBalance}
               subtitle="Solde de congé restant"
               progress={leaveBalance / 20}
               icon={
                  <AccountBalanceWalletOutlinedIcon
                     sx={{ color: colors.greenAccent[600], fontSize: "46px" }}
                  />
               }
            />
            {/* StatBox for Users on Leave */}
            <StatBox
               title={usersOnLeaveNumber ? usersOnLeaveNumber : 0}
               subtitle="Utilisateurs en congé"
               progress={usersOnLeaveNumber / usersNumber}
               progessColor={colors.redAccent[600]}
               icon={
                  <GroupRemoveOutlinedIcon
                     sx={{ color: colors.greenAccent[600], fontSize: "46px" }}
                  />
               }
            />
         </Box>
         <Box
            maxHeight="100vh"
            sx={{
               // Styling for the DataGrid and other components
               "& .MuiDataGrid-root": {
                  border: "none",
               },
               "& .MuiDataGrid-cell": {
                  borderBottom: "none",
               },
               "& .name-column--cell": {
                  color: colors.greenAccent[300],
               },
               "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                  height: '100px'
               },
               "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
               },
               "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
               },
               "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`
               },
               "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.grey[100]} !important`,
                  height: '80px !important'
               },
            }}
         >
            {/* Section: Accepted Leave Requests */}
            <Typography
               variant="h5"
               color={colors.greenAccent[500]}
               mt="30px"
            >
               Les demandes de congés acceptées
            </Typography>
            <AcceptedRequests />

            {/* Section: Users on Leave */}
            <Typography
               variant="h5"
               color={colors.greenAccent[500]}
               mt="30px"
            >
               Les utilisateurs en congé
            </Typography>
            <UsersOnLeave />
         </Box>
      </Box >
   );
};

export default Acceuil;
