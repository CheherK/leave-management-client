import { Box, useTheme, Button, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../Header.compoent";
import StatBox from "../stat-box.component";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useState } from "react";
import LeaveRequestForm from "../new-leave.component";
import useUser from "../../hooks/useUser";
import AcceptedRequests from "../accepted-requests.component";


const Acceuil = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [open, setOpen] = useState(false);
   const { userInfo: { leaveBalance } } = useUser();

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };



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
            <Button
               color='success'
               sx={{ p: "10px", alignSelf: "flex-start", fontSize: '14px', borderRadius: '12px' }}
               variant="contained"
               startIcon={<AddCircleOutlineOutlinedIcon />}
               onClick={handleClickOpen}
            >
               Nouveau demande de congé
            </Button>
         </Box>
         <Box
            height="70vh"
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
            }
            }
         >
            <Typography
               variant="h5"
               color={colors.greenAccent[500]}
               mt="30px"
            >
               Les demandes de congés acceptées
            </Typography>
            <AcceptedRequests />
         </Box>
         <LeaveRequestForm open={open} handleClose={handleClose} />
      </Box >
   );
};

export default Acceuil;