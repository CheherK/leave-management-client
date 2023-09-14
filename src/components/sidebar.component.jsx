import { useState } from "react"; // Import useState hook from React
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar"; // Import components from react-pro-sidebar library
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"; // Import MUI components
import SidebarItem from "./sidebar-item.component"; // Import SidebarItem component
import { tokens } from "../theme"; // Import theme tokens
import useSidebar from "../hooks/useSidebar"; // Import custom hook useSidebar
import { useDispatch } from "react-redux"; // Import useDispatch from Redux
import { setIsCollapsed } from "../store/sidebar/sidebar.reducer"; // Import setIsCollapsed action
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"; // Import MenuOutlinedIcon from MUI
import 'react-pro-sidebar/dist/css/styles.css'; // Import CSS styles
import { useEffect } from "react"; // Import useEffect from React

const Sidebar = ({ routes, firstName, lastName, jobTitle }) => {
   const theme = useTheme(); // Get the current theme
   const colors = tokens(theme.palette.mode); // Get color tokens based on theme mode
   const { isCollapsed } = useSidebar(); // Get isCollapsed state from custom hook
   const dispatch = useDispatch(); // Get dispatch function from Redux
   const [selected, setSelected] = useState("Accueil"); // State to track the selected sidebar item
   const isNonMobile = useMediaQuery("(min-width:600px)"); // Check if the screen is non-mobile

   useEffect(() => {
      dispatch(setIsCollapsed(!isNonMobile)); // Toggle sidebar collapsed state based on screen size
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

/*
The Sidebar component represents the sidebar navigation for your application's dashboard.

It uses various MUI components, such as Box, IconButton, Typography, and custom components like SidebarItem, to create the sidebar layout and functionality.

It imports the useSidebar custom hook to get the isCollapsed state from the Redux store.

The sidebar's appearance and behavior change based on the screen size. On non-mobile screens (isNonMobile), it displays a full-sized sidebar, and on mobile screens, it toggles between collapsed and expanded states.

The useEffect hook is used to toggle the sidebar's collapsed state based on screen size.

The sidebar displays a logo (ImpactDev) and menu icon that allows users to collapse/expand the sidebar on mobile screens.

It also displays user information, such as profile picture, first name, and job title.

The sidebar items are generated dynamically based on the routes prop, which is an array of route objects.

The selected state is used to track the currently selected sidebar item.

The sidebar items are generated using the map function, and each item is represented by a SidebarItem component.

The mobileStyleOpen and mobileStyleClosed styles are used to adjust the sidebar's appearance on mobile screens based on its state (collapsed or expanded).

The ProSidebar component from the react-pro-sidebar library is used to create the sidebar structure.

Overall, the Sidebar component provides a responsive and customizable sidebar navigation for your application's dashboard.
*/