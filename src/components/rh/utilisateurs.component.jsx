import { Box, Tooltip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from '@mui/material';
import { tokens } from "../../theme";
import Header from "../Header.compoent";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import DoDisturbOutlinedIcon from '@mui/icons-material/DoDisturbOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { useTheme } from "@mui/material";
import useSidebar from "../../hooks/useSidebar";
import { useState } from "react";
import RegistrationDialog from "../registration-dialog.component";
import { useDispatch } from "react-redux";
import { cleanUserCreated } from "../../store/user/user.reducer";
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import { useEffect } from "react";
import axios from "../../../api/axios";
import { GET_ALL_USERS_URL, UPDATE_USER_BY_ID } from "../../../api/user-crud";
import UpdateUser from "../update-user.component";
import { useSnackbar } from "notistack";

const Utilisateurs = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const { isCollapsed } = useSidebar();
   const [openRegistration, setOpenRegistration] = useState(false);
   const [openUpdate, setOpenUpdate] = useState(false);
   const [selectedUser, setSelectedUser] = useState(null);
   const [users, setUsers] = useState([]);
   const [refresh, setRefresh] = useState(false);
   const dispatch = useDispatch();
   const { enqueueSnackbar } = useSnackbar();

   //fetching users Data
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(GET_ALL_USERS_URL);
            setUsers(response.data);
         } catch (error) {
            console.log(error);
            return [];
         }
      };
      fetchData();
   }, [refresh]);

   //Block user handler
   const handleBlockUser = async (id, isActive) => {
      try {
         await axios.patch(UPDATE_USER_BY_ID(id), { isActive: !isActive });
         enqueueSnackbar('La modification a été réalisée avec succès.', { variant: 'success' });
         setRefresh(!refresh);
      } catch (error) {
         console.log(error);
      }
   };

   //place the setOpenUpdate inside the useEffect to ensure that the selectedUser is set before displaying the UserUpdate Dialog.
   useEffect(() => {
      selectedUser && setOpenUpdate(true);
   }, [selectedUser]);

   //Registration Dialog Handlers
   const handleClickOpenRegistration = () => {
      setOpenRegistration(true);
   };

   const handleCloseRegistration = () => {
      dispatch(cleanUserCreated());
      setOpenRegistration(false);
   };

   //UpdateUser Dialog handlers
   const handleClickOpenUpdate = (row) => {
      setSelectedUser(row);
   };

   const handleCloseUpdate = () => {
      dispatch(cleanUserCreated());
      setOpenUpdate(false);
      setSelectedUser(null);
   };

   const columns = [
      { field: "firstName", headerName: "Nom", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      { field: "lastName", headerName: "Prénom", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      { field: "phone", headerName: "Téléphone", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      { field: "email", headerName: "Email", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      { field: "adress", headerName: "Adresse", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      { field: "birthday", headerName: "Date de naissance", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      {
         field: "leaveBalance",
         headerName: "Solde de congé",
         type: "number",
         flex: 1, minWidth: 100,
         headerAlign: "center",
         align: "center"
      },
      { field: "salary", headerName: "Salary", flex: 1, minWidth: 50, headerAlign: "center", align: "center" },
      { field: "jobTitle", headerName: "Poste", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      { field: "type", headerName: "Type de contrat", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      { field: "contractStartDate", headerName: "Début de contrat", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      { field: "contractEndDate", headerName: "Fin de contrat", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      { field: "familySituation", headerName: "Situation Familiale", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      { field: "childNumber", headerName: "Nombre d'enfant", flex: 1, minWidth: 150, headerAlign: "center", align: "center" },
      { field: "rib", headerName: "RIB", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      { field: "bank", headerName: "Bank", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      {
         field: "isActive",
         headerName: "Statut",
         flex: 1, minWidth: 100,
         headerAlign: "center",
         align: "center",
         renderCell: ({ row: { isActive } }) => {
            return (
               isActive ?
                  <Tooltip title='Actif' placement="right" arrow>
                     <LockOpenOutlinedIcon color='success' />
                  </Tooltip>
                  :
                  <Tooltip title='Bloqué' placement="right" arrow>
                     <LockOutlinedIcon color='error' />
                  </Tooltip>
            );
         },
      },
      {
         field: "action",
         headerName: "Action",
         flex: 1, minWidth: 250,
         align: "center",
         headerAlign: "center",
         renderCell: ({ row }) => {
            return (
               <Box display='flex' gap='10px'>
                  <Button
                     color='warning'
                     variant="outlined"
                     startIcon={<EditNoteOutlinedIcon />}
                     onClick={() => {
                        handleClickOpenUpdate(row);
                     }}
                  >
                     Editer
                  </Button>
                  <Button
                     color={row.isActive ? "error" : "success"}
                     variant="outlined"
                     startIcon={row.isActive ? <DoDisturbOutlinedIcon /> : <PublishedWithChangesOutlinedIcon />}
                     onClick={() => handleBlockUser(row.id, row.isActive)}
                  >
                     {row.isActive ? "Bloquer" : "Activer"}
                  </Button>
               </Box>
            );
         }
      },
   ];

   return (
      <Box m="15px">
         <Header
            title="UTILISATEURS"
            subtitle="Liste des empolyees d'ImpactDev"
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
               sx={{ mb: "10px" }}
               variant="contained"
               startIcon={<PersonAddAltOutlinedIcon />}
               onClick={handleClickOpenRegistration}
            >
               Ajouter utilisateur
            </Button>
            <DataGrid
               rows={users}
               columns={columns}
               slots={{
                  toolbar: GridToolbar,
               }}
               getRowId={(row) => row.email}
               sx={{
                  maxWidth: isCollapsed ? 'calc(100vw - 80px)' : 'calc(100vw - 300px)',
               }}
            />
         </Box>

         {/* registration for dialog  */}
         <RegistrationDialog open={openRegistration} handleClose={handleCloseRegistration} />
         {/* registration for dialog  */}
         <UpdateUser user={selectedUser} open={openUpdate} handleClose={handleCloseUpdate} />
      </Box >
   );
};

export default Utilisateurs;