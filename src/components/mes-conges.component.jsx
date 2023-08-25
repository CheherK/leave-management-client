import { Box, Button, Chip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "./Header.compoent";
import { useTheme } from "@mui/material";
import useSidebar from "../hooks/useSidebar";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LeaveRequestForm from "./new-leave.component";
import { useState } from "react";
import { useEffect } from "react";
import { getUserLeaveRequets } from "../../api/leaveRequest-crud";
import useUser from "../hooks/useUser";
import { getDifferenceInDays } from "../utils/getDifferenceInDays";

const MesConges = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const { userInfo } = useUser();
   const { isCollapsed } = useSidebar();
   const [open, setOpen] = useState(false);
   const [leaveReqs, setLeaveReqs] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         const res = await getUserLeaveRequets(userInfo.id);
         setLeaveReqs(res);
      };
      fetchData();
   }, []);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const columns = [
      { field: "startDate", headerName: "Début de congé", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      { field: "endDate", headerName: "Fin de congé", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      {
         field: "nbrJour",
         headerName: "Durée de congé",
         type: "number",
         flex: 1, minWidth: 200,
         headerAlign: "center",
         align: "center",
         renderCell: ({ row: { startDate, endDate } }) => {
            return getDifferenceInDays(endDate, startDate);
         }
      },
      { field: "reason", headerName: "Motif de congé", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      { field: "createdAt", headerName: "Date de soumission", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      {
         field: "status",
         headerName: "statut de demande",
         flex: 1,
         minWidth: 150,
         headerAlign: "center",
         align: "center",
         renderCell: ({ row: { status } }) => {
            let label, color;
            switch(status) {
               case "pending": label = "En Attente"; color="warning"; break;
               case "accepted": label = "Acceptée"; color="success"; break;
               case "rejected": label = "Réfusée"; color="error"; break;
            }
            return <Chip label={label} color={color} />;
         }
      },
   ];

   return (
      <Box m="15px">
         <Header
            title="Mes demandes de congé"
            subtitle="Liste des mes demandes de congé"
         />
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
                  height: '50px !important'
               },
            }
            }
         >
            <Button
               color='success'
               mb="10px"
               variant="contained"
               startIcon={<AddCircleOutlineOutlinedIcon />}
               onClick={handleClickOpen}
            >
               Nouveau demande
            </Button>
            <DataGrid
               rows={leaveReqs}
               columns={columns}
               slots={{
                  toolbar: GridToolbar,
               }}
               getRowId={(row) => row.id}
               sx={
                  isCollapsed ?
                     { maxWidth: 'calc(100vw - 80px)' }
                     :
                     { maxWidth: 'calc(100vw - 300px)' }
               }
            />
         </Box>
         <LeaveRequestForm open={open} handleClose={handleClose} />
      </Box >
   );
};

export default MesConges;