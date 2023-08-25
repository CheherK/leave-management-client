import { getAcceptedLeaveRequets } from "../../api/leaveRequest-crud";
import { getDifferenceInDays } from "../utils/getDifferenceInDays";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import useSidebar from "../hooks/useSidebar";
import { useEffect } from "react";
import { useState } from "react";
import { Chip } from "@mui/material";

const AcceptedRequests = () => {
   const [acceptedRequests, setAccesptedRequest] = useState([]);
   const { isCollapsed } = useSidebar();


   useEffect(() => {
      const fetchData = async () => {
         const response = await getAcceptedLeaveRequets();
         console.log(response);
         setAccesptedRequest(response.reverse());
      };
      fetchData();
   }, []);

   const columns = [
      {
         field: "empolyeeFirstName",
         headerName: "Nom",
         flex: 1,
         minWidth: 150,
         headerAlign: "center",
         align: "center",
         renderCell: ({ row: { empolyee } }) => {
            return empolyee.firstName;
         }
      },
      {
         field: "empolyeeLastName",
         headerName: "Prénom",
         flex: 1,
         minWidth: 150,
         headerAlign: "center",
         align: "center",
         renderCell: ({ row: { empolyee } }) => {
            return empolyee.lastName;
         }
      },
      { field: "startDate", headerName: "Début de congé", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      { field: "endDate", headerName: "Fin de congé", flex: 1, minWidth: 200, headerAlign: "center", align: "center" },
      {
         field: "leaveDuration",
         headerName: "durée de congé",
         type: "number",
         flex: 1,
         minWidth: 150,
         headerAlign: "center",
         align: "center",
         renderCell: ({ row: { startDate, endDate } }) => {
            return getDifferenceInDays(endDate, startDate);
         }
      },
      { field: "createdAt", headerName: "Date de soumission", flex: 1, minWidth: 150, headerAlign: "center", align: "center" },
      {
         field: "status",
         headerName: "statut de demande",
         flex: 1,
         minWidth: 150,
         headerAlign: "center",
         align: "center",
         renderCell: ({ row: { status } }) => {
            let label, color;
            switch (status) {
               case "pending": label = "En Attente"; color = "warning"; break;
               case "accepted": label = "Acceptée"; color = "success"; break;
               case "rejected": label = "Réfusée"; color = "error"; break;
            }
            return <Chip label={label} color={color} />;
         }
      },
   ];
   return (
      <DataGrid
         rows={acceptedRequests}
         columns={columns}
         slots={{
            toolbar: GridToolbar,
         }}
         initialState={{
            pagination: {
               paginationModel: {
                  pageSize: 6,
               },
            },
         }}
         pageSizeOptions={[6]}
         getRowId={(row) => row.id}
         sx={{
            maxWidth: isCollapsed ? 'calc(100vw - 80px)' : 'calc(100vw - 300px)',
         }}
      />
   );
};

export default AcceptedRequests;