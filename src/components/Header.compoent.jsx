import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme"; // Importing theme-related tokens

const Header = ({ title, subtitle }) => {
   const theme = useTheme(); // Access the current theme
   const colors = tokens(theme.palette.mode); // Extract theme tokens based on the mode (light/dark)

   return (
      <Box mb="20px"> {/* Add margin at the bottom */}
         {/* Title */}
         <Typography
            variant="h2"
            color={colors.grey[100]} // Set the text color using the theme color
            fontWeight="bold" // Apply bold font weight
            sx={{ m: "0 0 5px 0" }} // Apply margin to the Typography component
         >
            {title} {/* Display the title */}
         </Typography>
         
         {/* Subtitle */}
         <Typography variant="h5" color={colors.greenAccent[400]}> {/* Use a different variant and color for the subtitle */}
            {subtitle} {/* Display the subtitle */}
         </Typography>
      </Box>
   );
};

export default Header;
