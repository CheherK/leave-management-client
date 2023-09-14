import Avatar from '@mui/material/Avatar'; // Import Avatar component from MUI
import Button from '@mui/material/Button'; // Import Button component from MUI
import TextField from '@mui/material/TextField'; // Import TextField component from MUI
import FormControlLabel from '@mui/material/FormControlLabel'; // Import FormControlLabel component from MUI
import Checkbox from '@mui/material/Checkbox'; // Import Checkbox component from MUI
import Link from '@mui/material/Link'; // Import Link component from MUI
import Paper from '@mui/material/Paper'; // Import Paper component from MUI
import Box from '@mui/material/Box'; // Import Box component from MUI
import Grid from '@mui/material/Grid'; // Import Grid component from MUI
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress component from MUI
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Import LockOutlinedIcon component from MUI
import Typography from '@mui/material/Typography'; // Import Typography component from MUI
import { useTheme } from '@mui/material/styles'; // Import useTheme hook from MUI
import loginCover from "../assets/login-cover.webp"; // Import loginCover image
import useUser from '../hooks/useUser'; // Import custom hook useUser
import { userLogin } from '../store/user/user.reducer'; // Import userLogin action from Redux
import { useDispatch } from 'react-redux'; // Import useDispatch hook from Redux
import { useEffect } from 'react'; // Import useEffect from React
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import Alert from '@mui/material/Alert'; // Import Alert component from MUI
import AlertTitle from '@mui/material/AlertTitle'; // Import AlertTitle component from MUI
import { tokens } from '../theme'; // Import tokens from custom theme

function Copyright(props) {
   return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
         {'Copyright © '}
         <Link color="inherit" href="#">
            ImpactDev
         </Link>{' '}
         {new Date().getFullYear()}
         {'.'}
      </Typography>
   );
}

const Login = () => {
   const theme = useTheme(); // Get the current theme from MUI
   const colors = tokens(theme.palette.mode); // Get colors based on the theme mode
   const dispatch = useDispatch(); // Get the Redux dispatch function
   const navigate = useNavigate(); // Get the navigation function from React Router
   const { userInfo, loading, error } = useUser(); // Get user info, loading state, and error from custom hook useUser

   useEffect(() => {
      // Redirect the user to the appropriate dashboard based on their role when user info changes
      if (userInfo) {
         switch (userInfo?.roles[0]) {
            case "ROLE_RH": navigate("/dashboard-rh"); break;
            case "ROLE_DR": navigate("/dashboard-dr"); break;
            case "ROLE_DEV": navigate("/dashboard-dev"); break;
            default: console.log("Navigation doesn't work for current user: " + userInfo);
         }
      }
   }, [userInfo, navigate]);

   const handleSubmit = (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      const formData = new FormData(event.currentTarget); // Get form data
      const requestData = {
         email: formData.get('email'),
         password: formData.get('password'),
      };

      dispatch(userLogin(requestData)); // Dispatch the userLogin action with the form data
   };

   return (
      loading || userInfo ? (
         <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress color='success' size={100} />
         </Box>
      ) : (
         <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
               item
               xs={false}
               sm={4}
               md={7}
               sx={{
                  backgroundImage: `url(${loginCover})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: theme.palette.mode === 'light' ? colors.primary : colors.grey[900],
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
               }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
               <Box
                  sx={{
                     my: 8,
                     mx: 4,
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                  }}
               >
                  <Avatar sx={{ m: 1, bgcolor: `${colors.blueAccent[500]}` }}>
                     <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                     Sign in
                  </Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                     <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        sx={{
                           label: {
                              color: colors.grey[100]
                           }
                        }}
                     />
                     <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                     />
                     {
                        error &&
                        <Alert severity="error" sx={{ width: '100%' }}>
                           <AlertTitle>Oops!</AlertTitle>
                           <strong>{error}</strong>
                        </Alert>
                     }
                     <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                     />
                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: `${colors.greenAccent[500]}` }}
                     >
                        Sign In
                     </Button>
                     <Grid container>
                        <Grid item xs>
                           <Link href="#" variant="body2" color={colors.blueAccent[500]} >
                              Forgot password?
                           </Link>
                        </Grid>
                     </Grid>
                     <Copyright sx={{ mt: 5 }} />
                  </Box>
               </Box>
               <Box display="flex" justifyContent="space-between" px="10px" flexWrap="wrap">
                  <Box>
                     <h5>HR Account:</h5>
                     <p>Email: impactdev3@gmail.com</p>
                     <p>Password: 123456789</p>
                  </Box>
                  <Box>
                     <h5>Technical Director Account:</h5>
                     <p>Email: cheherkallebi1@gmail.com</p>
                     <p>Password: 123456789</p>
                  </Box>
                  <Box>
                     <h5>Developer Account:</h5>
                     <p>Email: cheherkallebi@gmail.com</p>
                     <p>Password: 123456789</p>
                  </Box>
               </Box>
            </Grid>
         </Grid>
      )
   );
};

export default Login;

/*
The Login component handles user authentication and login. It includes a form for users to enter their email and password.

It uses MUI components for styling, including Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, CircularProgress, LockOutlinedIcon, and Typography.

It uses the useTheme hook to access the current theme and tokens to get color values based on the theme mode.

It imports the useUser custom hook to get user information, loading state, and error from the Redux store.

The component redirects users to the appropriate dashboard based on their role when the user information changes.

The handleSubmit function is called when the user submits the login form. It dispatches the userLogin action with the form data.

If there is an error during login, it displays an error message using the Alert component.

The component uses conditional rendering based on the loading state and user information to either show a loading spinner or the login form.

It provides a link to reset the password if the user forgets it.

The Copyright function displays copyright information at the bottom of the page.

Overall, the Login component provides a user-friendly login interface with validation, error handling, and redirects based on user roles.

*/