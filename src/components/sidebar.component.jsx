import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import SidebarItem from "./sidebar-item.component";
import { tokens } from "../theme";
import useSidebar from "../hooks/useSidebar";
import { useDispatch } from "react-redux";
import { setIsCollapsed } from "../store/sidebar/sidebar.reducer";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import 'react-pro-sidebar/dist/css/styles.css';
import { useEffect } from "react";

const Sidebar = ({ routes, firstName, lastName, jobTitle }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const { isCollapsed } = useSidebar();
   const dispatch = useDispatch();
   const [selected, setSelected] = useState("Accueil");
   const isNonMobile = useMediaQuery("(min-width:600px)");

   useEffect(() => {
      dispatch(setIsCollapsed(!isNonMobile));
   }, []);

   const mobileStyleOpen = !isNonMobile && !isCollapsed ? {
      position: "absolute",
      left: 0,
      top: 0,
      height: "100vh"
   } : {};
   const mobileStyleClosed = !isNonMobile && isCollapsed ? {
      width: "50px",
      minWidth: "50px"
   } : {};

   return (
      <Box
         sx={{
            "& .pro-sidebar.collapsed": {
               ...mobileStyleClosed
            },
            "& .pro-sidebar-inner": {
               background: `${colors.primary[400]} !important`,
            },
            "& .pro-icon-wrapper": {
               backgroundColor: "transparent !important",
            },
            "& .pro-inner-item": {
               padding: `${!isNonMobile && isCollapsed ? "5px 20px 5px 8px !important" : "5px 35px 5px 20px !important"}`,
            },
            "& .pro-inner-item:hover": {
               color: "#868dfb !important",
            },
            "& .pro-menu-item.active": {
               color: "#6870fa !important",
            },
            ...mobileStyleOpen,
            
         }}
      >
         <ProSidebar collapsed={isCollapsed}>
            <Menu iconShape="square">
               {/* LOGO AND MENU ICON */}
               <MenuItem
                  onClick={() => dispatch(setIsCollapsed(!isCollapsed))}
                  icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                  style={{
                     margin: "10px 0 20px 0",
                     color: colors.grey[100],
                  }}
               >
                  {!isCollapsed && (
                     <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        ml="15px"
                     >
                        <Typography variant="h3" color={colors.grey[100]}>
                           ImpactDev
                        </Typography>
                        <IconButton onClick={() => dispatch(setIsCollapsed(!isCollapsed))}>
                           <MenuOutlinedIcon />
                        </IconButton>
                     </Box>
                  )}
               </MenuItem>

               {!isCollapsed && (
                  <Box mb="25px">
                     <Box display="flex" justifyContent="center" alignItems="center">
                        <img
                           alt="profile-user"
                           width="100px"
                           height="100px"
                           src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`}
                           style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                     </Box>
                     <Box textAlign="center">
                        <Typography
                           variant="h2"
                           color={colors.grey[100]}
                           fontWeight="bold"
                           sx={{ m: "10px 0 0 0" }}
                        >
                           {firstName}
                        </Typography>
                        <Typography variant="h5" color={colors.greenAccent[500]}>
                           {jobTitle}
                        </Typography>
                     </Box>
                  </Box>
               )}

               <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                  {routes.map((item) =>
                     <SidebarItem
                        key={item.name}
                        title={item.name}
                        to={item.layout + item.path}
                        icon={<item.icon />}
                        selected={selected}
                        setSelected={setSelected}
                     />
                  )}
               </Box>
            </Menu>
         </ProSidebar>
      </Box>
   );
};

export default Sidebar;