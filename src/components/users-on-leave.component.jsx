import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import useSidebar from "../hooks/useSidebar";
import { useEffect } from "react";
import { useState } from "react";
import { Typography } from "@mui/material";
import axios from "../../api/axios";
import { GET_ALL_USERS_URL } from "../../api/user-crud";
import { useDispatch } from "react-redux";
import { setUsersOnLeaveNumber } from "../store/user/user.reducer";

const UsersOnLeave = () => {
   const [usersOnLeave, setUsersOnLeave] = useState([]);
   const { isCollapsed } = useSidebar();
   const dispatch = useDispatch();
   // Helper function to set a cookie
   const setCookie = (name, value, expires) => {
      document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
   };

   // Helper function to get a cookie
   const getCookie = (name) => {
      const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
      return cookieValue ? decodeURIComponent(cookieValue.pop()) : null;
   };

   useEffect(() => {
      const fetchData = async () => {
         try {
            // Check if the session cookie exists
            const cachedUsers = getCookie("usersOnLeave");
            if (cachedUsers) {
               setUsersOnLeave(JSON.parse(cachedUsers));
               dispatch(setUsersOnLeaveNumber(JSON.parse(cachedUsers)?.length));
            } else {
               const response = await axios.get(GET_ALL_USERS_URL);
               const usersOnLeaveData = response.data?.filter(item => item?.onLeave === true);
               setUsersOnLeave(usersOnLeaveData);
               const currentDate = new Date();
               const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);
               setCookie("usersOnLeave", JSON.stringify(usersOnLeaveData), endOfDay);
               dispatch(setUsersOnLeaveNumber(usersOnLeaveData?.length));
            }
         } catch (error) {
            console.error("Error fetching users on leave:", error);
         }
      };

      fetchData();
   }, []);

   // useMemo(() => {
   //    dispatch(setUsersOnLeaveNumber(usersOnLeave.length));
   // }, [usersOnLeave]);

   const columns = [
      { field: "firstName", headerName: "Nom", flex: 1, minWidth: 150, headerAlign: "center", align: "center" },
      { field: "lastName", headerName: "Prénom", flex: 1, minWidth: 150, headerAlign: "center", align: "center" },
      { field: "jobTitle", headerName: "Poste", flex: 1, minWidth: 150, headerAlign: "center", align: "center" },
      {
         field: "onLeave",
         headerName: "État",
         flex: 1,
         minWidth: 100,
         headerAlign: "center",
         align: "center",
         renderCell: () => {
            return (
               <Typography color="error">En congé</Typography>
            );
         },
      },
   ];

   return (
      <DataGrid
         rows={usersOnLeave}
         columns={columns}
         slots={{
            toolbar: GridToolbar,
         }}
         initialState={{
            pagination: {
               paginationModel: {
                  pageSize: 5,
               },
            },
         }}
         autoHeight={false}
         minHeight={300}
         pageSizeOptions={[5]}
         getRowId={(row) => row.id}
         sx={{
            maxWidth: isCollapsed ? 'calc(100vw - 80px)' : 'calc(100vw - 300px)',
         }}
      />
   );
};

export default UsersOnLeave;