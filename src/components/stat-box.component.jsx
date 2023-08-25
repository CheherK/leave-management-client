import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./progress-circle.component";

const StatBox = ({ title, subtitle, progress, progessColor, icon }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   return (
      <Box
         backgroundColor={colors.primary[400]}
         display="flex"
         alignItems="center"
         justifyContent="space-between"
         borderRadius="12px"
         minWidth="300px"
         padding="20px"
         flex='1'
      >
         <Box>
            {icon}
            <Typography
               variant="h3"
               fontWeight="bold"
               marginBottom="10px"
               marginLeft="20px"
               fontSize="40px"
               sx={{ color: colors.grey[100] }}
            >
               {title}
            </Typography>
            <Typography variant="h5" sx={{ color: colors.grey[100] }}>
               {subtitle}
            </Typography>
         </Box>
         <Box>
            <ProgressCircle progress={progress} progressColor={progessColor} />
         </Box>
      </Box>

   );
};

export default StatBox;