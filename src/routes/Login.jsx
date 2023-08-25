import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import loginCover from "../assets/login-cover.webp";
import useUser from '../hooks/useUser';
import { userLogin } from '../store/user/user.reducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { tokens } from '../theme';

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
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { userInfo, loading, error } = useUser();

   useEffect(() => {
      if (userInfo) {
         switch (userInfo?.roles[0]) {
            case "ROLE_RH": navigate("/dashboard-rh"); break;
            case "ROLE_DR": navigate("/dashboard-dr"); break;
            case "ROLE_DEV": navigate("/dashboard-dev"); break;
            default: console.log(" navigation doesn't work current user: " + userInfo);
         }
      }
   }, [userInfo, navigate]);

   const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const requestData = {
         email: formData.get('email'),
         password: formData.get('password'),
      };

      dispatch(userLogin(requestData));

   };

   return (
      loading || userInfo ?
         <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress color='success' size={100} />
         </Box>
         :
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
                  <Avatar sx={{ m: 1, bgcolor:`${colors.blueAccent[500]}` }}>
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
                        sx={{ mt: 3, mb: 2, bgcolor:`${colors.greenAccent[500]}` }}
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
            </Grid>
         </Grid>
   );
};

export default Login;