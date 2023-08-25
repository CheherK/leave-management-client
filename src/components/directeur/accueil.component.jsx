import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../Header.compoent";
import StatBox from "../stat-box.component";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import GroupRemoveOutlinedIcon from '@mui/icons-material/GroupRemoveOutlined';
import useUser from "../../hooks/useUser";
import AcceptedRequests from "../accepted-requests.component";
import UsersOnLeave from "../users-on-leave.component";

const Acceuil = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const { userInfo: { leaveBalance } } = useUser();

   return (
      <Box m="15px">
         <Header title="Acceuil" subtitle="bienvenue dans votre dashboard" />
         <Box
            display="flex"
            flexWrap='wrap'
            gap="20px"
         >
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
            <StatBox
               title="10"
               subtitle="Utilisateurs en congé"
               progress={10 / 100}
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
            <Typography
               variant="h5"
               color={colors.greenAccent[500]}
               mt="30px"
            >
               Les demandes de congés acceptées
            </Typography>
            <AcceptedRequests />
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