import { Box, Chip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import { tokens } from "../../theme";
import Header from "../Header.compoent"; // Header component
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTheme } from "@mui/material";
import useSidebar from "../../hooks/useSidebar";
import { useEffect, useState } from "react";
import LeaveRequestForm from "../new-leave.component"; //new-leave component
import { fetchLeaveRequestsToTreatByHR, updateLeaveRequestStatus } from "../../../api/leaveRequest-crud"; //API functions for leave requests
import { getDifferenceInDays } from "../../utils/getDifferenceInDays"; //utility function for date calculation
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from "notistack"; // use of a snackbar for notifications

const Demandes = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const { isCollapsed } = useSidebar();
   const [open, setOpen] = useState(false); // State for handling dialog visibility
   const [loading, setLoading] = useState(true); // State to track loading status
   const [refetch, setRefetch] = useState(0); // State to trigger data refetch
   const [leaveRequests, setLeaveRequests] = useState([]); // State to store leave requests
   const { enqueueSnackbar } = useSnackbar(); // Snackbar for notifications

   useEffect(() => {
      const fetchData = async () => {
         const response = await fetchLeaveRequestsToTreatByHR(); // Fetch leave requests from an API
         setLeaveRequests(response); // Update leave requests state
         setLoading(false); // Update loading state to indicate data has been loaded
      };
      fetchData(); // Fetch data when the component mounts and when refetch state changes
   }, [refetch]); // Dependency array ensures the effect runs when refetch changes

   const handleAcceptance = (id) => {
      const data = {
         status: "accepted" // Define data for updating leave request status
      };
      const acceptRequest = async () => {
         await updateLeaveRequestStatus(id, data); // Update leave request status through an API
         enqueueSnackbar('Demande de congé acceptée!', { variant: 'success' }); // Show a success notification
         setRefetch(refetch+1); // Trigger data refetch to reflect the updated status
      };
      acceptRequest(); // Execute the function to accept the request
   };

   const handleRejection = (id) => {
      const data = {
         status: "rejected" // Define data for updating leave request status
      };
      const rejectRequest = async () => {
         await updateLeaveRequestStatus(id, data); // Update leave request status through an API
         enqueueSnackbar('Demande de congé réfusée!', { variant: 'error' }); // Show an error notification
         setRefetch(refetch+1); // Trigger data refetch to reflect the updated status
      };
      rejectRequest(); // Execute the function to reject the request
   };

   const handleClickOpen = () => {
      setOpen(true); // Open the leave request form dialog
   };

   const handleClose = () => {
      setOpen(false); // Close the leave request form dialog
   };

   // Define columns for the DataGrid component
   const columns = [
      {
         field: "firstName",
         headerName: "Nom",
         flex: 1,
         minWidth: 200,
         headerAlign: "center",
         align: "center",
         renderCell: ({ row: { empolyee } }) => {
            return empolyee.firstName;
         }
      },
      {
         field: "lastName",
         headerName: "Prénom",
         flex: 1,
         minWidth: 200,
         headerAlign: "center",
         align: "center",
         renderCell: ({ row: { empolyee } }) => {
            return empolyee.lastName;
         }
      },
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
            return getDifferenceInDays(endDate, startDate); // Calculate the difference in days between start and end dates
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
            return <Chip label={label} color={color} />; // Render status as a colored chip
         }
      },
      {
         field: "action",
         headerName: "Action",
         flex: 1, minWidth: 250,
         align: "center",
         headerAlign: "center",
         renderCell: ({ row: { id } }) => {
            return (
               <Box display='flex' gap='10px'>
                  <Button
                     color='success'
                     variant="outlined"
                     startIcon={<CheckCircleOutlineOutlinedIcon />}
                     onClick={() => handleAcceptance(id)} // Handle accepting the request
                  >
                     Accepter
                  </Button>
                  <Button
                     color='error'
                     variant="outlined"
                     startIcon={<HighlightOffOutlinedIcon />}
                     onClick={() => handleRejection(id)} // Handle rejecting the request
                  >
                     Réfuser
                  </Button>
               </Box>
            );
         }
      }
   ];

   return (
      <Box m="15px">
         <Header
            title="DEMANDES DE CONGÉ"
            subtitle="Liste des demandes de congé"
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
               onClick={handleClickOpen} // Handle opening the leave request form dialog
            >
               Nouveau demande
            </Button>
            <DataGrid
               rows={leaveRequests}
               columns={columns}
               slots={{
                  toolbar: GridToolbar,
                  NoRowsOverlay: () =>
                     loading &&
                     <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress color='success' size={100} /> {/* Show a loading spinner */}
                     </Box>
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
         <LeaveRequestForm open={open} handleClose={handleClose} /> {/* Render the leave request form */}
      </Box >
   );
};

export default Demandes;
