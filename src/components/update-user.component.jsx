import { Box, MenuItem, Button, TextField, Dialog, DialogContent, DialogTitle, CircularProgress } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from './Header.compoent';
import { LIST_BANK } from '../constants/bank-list';
import { CONTRACT_TYPES } from '../constants/contract-types';
import { POSTES, ROLE_FOR_POSTE } from '../constants/postes';
import { useDispatch } from 'react-redux';
import { userUpdate } from '../store/user/user.reducer';
import useUser from '../hooks/useUser';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';
import { useState } from 'react';
import { dateFormat } from '../utils/dateFromString';

const initialState = {
   firstName: "",
   lastName: "",
   phone: "",
   email: "",
   jobTitle: "",
   birthday: "",
   childNumber: 0,
   familySituation: "",
   adress: "",
   leaveBalance: 0,
   rib: "",
   bank: "",
   type: "",
   contractStartDate: "",
   contractEndDate: "",
   salary: 0,
};

const UpdateUser = ({ user, open, handleClose }) => {

   const isNonMobile = useMediaQuery("(min-width:600px)");

   const dispatch = useDispatch();
   const [initialValues, setInitialValues] = useState(initialState);

   const { loading, error, userCreated } = useUser();

   // fetch the selected user's data   
   useEffect(() => {
      const formattedResponse = {
         ...user,
         birthday: dateFormat(user?.birthday),
         contractStartDate: dateFormat(user?.contractStartDate),
         contractEndDate: dateFormat(user?.contractEndDate),
      };
      setInitialValues(formattedResponse);
   }, [user]);

   const handleFormSubmit1 = async (values, { setSubmitting }) => {

      const requestData = {
         ...values,
         "roles": [ROLE_FOR_POSTE[values.jobTitle]],
      };

      const userData = {
         requestData,
         userId: user.id
      };
      try {
         dispatch(userUpdate(userData));
         setSubmitting(false);
      } catch (error) {
         console.error("Error:", error);
         setSubmitting(false);
      }

   };

   return (
      <Dialog maxWidth='md' fullWidth open={open} onClose={handleClose}>
         <DialogTitle>
            <Header title="Modification" subtitle="Effectuer les ajustements requis pour cet utilisateur." />
         </DialogTitle>
         <DialogContent>
            {
               userCreated || error ?
                  <Alert
                     severity={error ? "error" : "success"}
                     action={
                        <Button size="sm" variant="solid" color="inherit" onClick={handleClose}>
                           Close
                        </Button>
                     }
                  >
                     {
                        !error ?
                           "La mise à jour de l'utilisateur a été effectuée avec succès."
                           :
                           "La mise à jour de l'utilisateur a échoué."
                     }
                  </Alert>
                  :
                  loading ?
                     <Box sx={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress color='success' size={100} />
                     </Box>
                     :
                     <Box m="20px">
                        <Formik
                           onSubmit={handleFormSubmit1}
                           initialValues={initialValues}
                           validationSchema={userSchema}
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
                                    sx={{
                                       "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                    }}
                                 >
                                    <TextField
                                       fullWidth
                                       variant="filled"
                                       type="text"
                                       label="Nom"
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                       value={values.firstName}
                                       name="firstName"
                                       error={!!touched.firstName && !!errors.firstName}
                                       helperText={touched.firstName && errors.firstName}
                                       sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                       fullWidth
                                       variant="filled"
                                       type="text"
                                       label="Prénom"
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                       value={values.lastName}
                                       name="lastName"
                                       error={!!touched.lastName && !!errors.lastName}
                                       helperText={touched.lastName && errors.lastName}
                                       sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                       fullWidth
                                       variant="filled"
                                       type="number"
                                       label="Téléphone"
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                       value={values.phone}
                                       name="phone"
                                       error={!!touched.phone && !!errors.phone}
                                       helperText={touched.phone && errors.phone}
                                       sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                       fullWidth
                                       variant="filled"
                                       type="text"
                                       label="Email"
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                       value={values.email}
                                       name="email"
                                       error={!!touched.email && !!errors.email}
                                       helperText={touched.email && errors.email}
                                       sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                       fullWidth
                                       variant="filled"
                                       type="text"
                                       select
                                       label="Poste"
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                       value={values.jobTitle}
                                       name="jobTitle"
                                       error={!!touched.jobTitle && !!errors.jobTitle}
                                       helperText={touched.jobTitle && errors.jobTitle}
                                       sx={{ gridColumn: "span 4" }}
                                    >
                                       {
                                          POSTES.map((poste) => <MenuItem key={poste} value={poste}>{poste}</MenuItem>)
                                       }
                                    </TextField>
                                    <TextField
                                       fullWidth
                                       variant="filled"
                                       type="date"
                                       label="Date de naissance"
                                       InputLabelProps={{
                                          shrink: true,
                                       }}
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                       value={values.birthday}
                                       name="birthday"
                                       error={!!touched.birthday && !!errors.birthday}
                                       helperText={touched.birthday && errors.birthday}
                                       sx={{ gridColumn: "span 4" }}
                                    />
                                    <TextField
                                       fullWidth
                                       variant="filled"
                                       type="text"
                                       select
                                       label="Situation Familiale"
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                       value={values.familySituation}
                                       name="familySituation"
                                       error={!!touched.familySituation && !!errors.familySituation}
                                       helperText={touched.familySituation && errors.familySituation}
                                       sx={{ gridColumn: "span 2" }}
                                    >
                                       <MenuItem value="Célibataire">Célibataire</MenuItem>
                                       <MenuItem value="Marié(e)">Marié(e)</MenuItem>
                                       <MenuItem value="Divorcé(e)">Divorcé(e)</MenuItem>
                                    </TextField>
                                    <TextField
                                       fullWidth
                                       variant="filled"
                                       type="number"
                                       label="Nombre d'enfant"
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                       value={values.childNumber}
                                       name="childNumber"
                                       error={!!touched.childNumber && !!errors.childNumber}
                                       helperText={touched.childNumber && errors.childNumber}
                                       sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                       fullWidth
                                       variant="filled"
                                       type="text"
                                       label="Addresse"
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                       value={values.adress}
                                       name="adress"
                                       error={!!touched.adress && !!errors.adress}
                                       helperText={touched.adress && errors.adress}
                                       sx={{ gridColumn: "span 4" }}
                                    />
                                    <TextField
                                       fullWidth
                                       variant="filled"
                                       type="number"
                                       label="Solde de congé"
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                       value={values.leaveBalance}
                                       name="leaveBalance"
                                       error={!!touched.leaveBalance && !!errors.leaveBalance}
                                       helperText={touched.leaveBalance && errors.leaveBalance}
                                       sx={{ gridColumn: "span 4" }}
                                    />
                                    <TextField
                                       fullWidth
                                       variant="filled"
                                       type="text"
                                       label="RIB"
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                       value={values.rib}
                                       name="rib"
                                       error={!!touched.rib && !!errors.rib}
                                       helperText={touched.rib && errors.rib}
                                       sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                       fullWidth
                                       variant="filled"
                                       select
                                       type="text"
                                       label="Bank"
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                       value={values.bank}
                                       name="bank"
                                       error={!!touched.bank && !!errors.bank}
                                       helperText={touched.bank && errors.bank}
                                       sx={{ gridColumn: "span 2" }}
                                    >
                                       {
                                          LIST_BANK.map((bank) => <MenuItem key={bank} value={bank}>{bank}</MenuItem>)
                                       }
                                    </TextField>
                                    <TextField
                                       fullWidth
                                       variant="filled"
                                       type="text"
                                       select
                                       label="Type de contract"
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                       value={values.type}
                                       name="type"
                                       error={!!touched.type && !!errors.type}
                                       helperText={touched.type && errors.type}
                                       sx={{ gridColumn: "span 4" }}
                                    >
                                       {
                                          CONTRACT_TYPES.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)
                                       }
                                    </TextField>
                                    <TextField
                                       fullWidth
                                       variant="filled"
                                       type="date"
                                       InputLabelProps={{
                                          shrink: true,
                                       }}
                                       label="Début de contrat"
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                       value={values.contractStartDate}
                                       name="contractStartDate"
                                       error={!!touched.contractStartDate && !!errors.contractStartDate}
                                       helperText={touched.contractStartDate && errors.contractStartDate}
                                       sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                       fullWidth
                                       variant="filled"
                                       type="date"
                                       InputLabelProps={{
                                          shrink: true,
                                       }}
                                       label="Fin de contrat"
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                       value={values.contractEndDate}
                                       name="contractEndDate"
                                       error={!!touched.contractEndDate && !!errors.contractEndDate}
                                       helperText={touched.contractEndDate && errors.contractEndDate}
                                       sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                       fullWidth
                                       variant="filled"
                                       type="number"
                                       label="Salaire"
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                       value={values.salary}
                                       name="salary"
                                       error={!!touched.salary && !!errors.salary}
                                       helperText={touched.salary && errors.salary}
                                       sx={{ gridColumn: "span 4" }}
                                    />
                                 </Box>
                                 <Box mt="30px" display="flex" gap="10px" justifyContent="flex-end">
                                    <Button color="error" variant="outlined" onClick={handleClose}>Annuler</Button>
                                    <Button color="success" variant="outlined" type="submit">Enregistrer</Button>
                                 </Box>
                              </form>
                           )}
                        </Formik>
                     </Box>
            }
         </DialogContent>
      </Dialog >
   );
};


const userSchema = yup.object().shape({
   firstName: yup.string().required("Le nom est requis"),
   lastName: yup.string().required("Le prénom est requis"),
   phone: yup
      .number()
      .typeError("Phone number must be a number")
      .positive("Phone number must be positive")
      .integer("Phone number must be an integer")
      .required("Le numéro de téléphone est requis"),
   email: yup.string().email("Invalid email format").required("Email est requis"),
   jobTitle: yup.string().required("Poste est requis"),
   birthday: yup.date().nullable().required("La date de naissance est requise"),
   childNumber: yup
      .number()
      .typeError("Child number must be a number")
      .integer("Child number must be an integer")
      .nullable(),
   familySituation: yup.string().required("La situation familiale est requise"),
   adress: yup.string().required("L'adresse est requise"),
   leaveBalance: yup
      .number()
      .typeError("Leave balance must be a number")
      .integer("Leave balance must be an integer")
      .required("Le solde des congés est requis"),
   rib: yup.string(),
   bank: yup.string(),
   type: yup.string(),
   contractStartDate: yup.date().nullable(),
   contractEndDate: yup.date().nullable(),
   salary: yup
      .number()
      .typeError("Salary must be a number")
      .positive("Salary must be positive")
      .required("Le salaire est requis"),
});

export default UpdateUser;