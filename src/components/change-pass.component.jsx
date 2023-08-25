import { Formik } from "formik";
import * as yup from "yup";
import axios from "../../api/axios";
import { UPDATE_USER_BY_ID } from "../../api/user-crud";
import { Box, Button, CircularProgress, TextField, useMediaQuery } from '@mui/material';
import Header from "./Header.compoent";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserIsFirstLogin } from "../store/user/user.reducer";
import { useState } from "react";
// import { useState } from "react";


const ChangePass = ({ userId }) => {
   const navigate = useNavigate();
   const isNonMobile = useMediaQuery("(min-width:600px)");
   const dispatch = useDispatch();
   const [loading, setLoading] = useState(false);
   const handleFormSubmit = async (values) => {
      try {
         setLoading(true);
         await axios.put(UPDATE_USER_BY_ID(userId), { password: values.password });
         dispatch(setUserIsFirstLogin(false));
         navigate("/");
      } catch (error) {
         console.error("Error:", error);
      }

   };
   const passwordShcema = yup.object().shape({
      password: yup.string().required(),
      confirmPassword: yup.string().label('Confirmer mot de passe').required().oneOf([yup.ref('password'), null], 'Passwords must match'),
   });

   const initialValues = {
      password: "",
      confirmPassword: "",
   };
   return (
      <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
         <Box height="40%" width={isNonMobile ? "40%" : "90%"} m="20px" borderRadius="12px">
            <Header title="Nouveau mot de passe" subtitle="Modifier votre mot de passe." />
            {
               loading ?
               <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CircularProgress color='success' size={70} />
               </Box>
                  :
                  <Formik
                     onSubmit={handleFormSubmit}
                     initialValues={initialValues}
                     validationSchema={passwordShcema}
                  >
                     {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                     }) => (
                        <form onSubmit={handleSubmit}>
                           <Box
                              display="grid"
                              gap="30px"
                              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                           >
                              <TextField
                                 fullWidth
                                 variant="filled"
                                 type="password"
                                 label="mot de passe"
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 value={values.password}
                                 name="password"
                                 error={!!touched.password && !!errors.password}
                                 helperText={touched.password && errors.password}
                                 sx={{ gridColumn: "span 4" }}
                              />
                              <TextField
                                 fullWidth
                                 variant="filled"
                                 type="password"
                                 label="Confirmer mot de passe"
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 value={values.confirmPassword}
                                 name="confirmPassword"
                                 error={!!touched.confirmPassword && !!errors.confirmPassword}
                                 helperText={touched.confirmPassword && errors.confirmPassword}
                                 sx={{ gridColumn: "span 4" }}
                              />
                           </Box>
                           <Box mt="30px">
                              <Button color="success" variant="contained" onClick={handleSubmit}>Confirmer</Button>
                           </Box>
                        </form>
                     )}
                  </Formik>
            }
         </Box>
      </Box>
   );
};

export default ChangePass;