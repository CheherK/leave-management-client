import { Box, Button, TextField, Dialog, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from './Header.compoent';
import { useSnackbar } from 'notistack';
import { motifsDeConge } from "../constants/leave-request-reasons";
import useUser from '../hooks/useUser';
import axios from '../../api/axios';
import { ADD_LEAVE_REQUEST_URL } from '../../api/leaveRequest-crud';

const LeaveRequestForm = ({ open, handleClose }) => {

   const isNonMobile = useMediaQuery('(min-width:600px)');
   const { enqueueSnackbar } = useSnackbar();
   const { userInfo } = useUser();

   const handleFormSubmit = async (values, { setSubmitting }) => {
      let priority;
      switch (userInfo?.roles[0]) {
         case "ROLE_DR": priority = 1; break;
         case "ROLE_DEV": priority = 2; break;
         default: priority = 0;
      }
      const leaveRequestsData = {
         ...values,
         empolyee: `api/users/${userInfo.id}`,
         status: "pending",
         priority
      };
      console.log(leaveRequestsData);
      handleClose();
      try {
         await axios.post(
            ADD_LEAVE_REQUEST_URL,
            leaveRequestsData
         );
         enqueueSnackbar('Demande de congé soumise avec succès.', { variant: 'success' });
         setSubmitting(false);
      } catch (error) {
         console.error('Error:', error);
         setSubmitting(false);
      }
   };

   const leaveRequestSchema = yup.object().shape({
      startDate: yup.date().nullable().required('Start date is required'),
      endDate: yup.date().nullable().required('End date is required'),
      reason: yup.string().required('Reason is required'),
   });

   const initialValues = {
      startDate: '',
      endDate: '',
      reason: '',
   };

   return (
      <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose}>
         <DialogTitle>
            <Header title="Formulaire de demande de congé" subtitle="Soumettre une nouvelle demande de congé." />
         </DialogTitle>
         <DialogContent>
            <Formik
               onSubmit={handleFormSubmit}
               initialValues={initialValues}
               validationSchema={leaveRequestSchema}
            >
               {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                     <Box display="grid" gap="30px" sx={{ gridColumn: isNonMobile ? undefined : 'span 2' }}>
                        <TextField
                           fullWidth
                           variant="filled"
                           type="date"
                           label="Date de Début"
                           InputLabelProps={{
                              shrink: true,
                           }}
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.startDate}
                           name="startDate"
                           error={!!touched.startDate && !!errors.startDate}
                           helperText={touched.startDate && errors.startDate}
                        />
                        <TextField
                           fullWidth
                           variant="filled"
                           type="date"
                           label="Date de fin"
                           InputLabelProps={{
                              shrink: true,
                           }}
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.endDate}
                           name="endDate"
                           error={!!touched.endDate && !!errors.endDate}
                           helperText={touched.endDate && errors.endDate}
                        />
                        <TextField
                           fullWidth
                           variant="filled"
                           type="text"
                           select
                           label="Motif"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.reason}
                           name="reason"
                           error={!!touched.reason && !!errors.reason}
                           helperText={touched.reason && errors.reason}
                        >
                           {
                              motifsDeConge.map((poste) => <MenuItem key={poste} value={poste}>{poste}</MenuItem>)
                           }
                        </TextField>
                     </Box>
                     <Box mt="30px" display="flex" gap="10px" justifyContent="flex-end">
                        <Button color="error" variant="outlined" onClick={handleClose}>
                           Annuler
                        </Button>
                        <Button color="success" variant="outlined" type="submit">
                           Soumettre
                        </Button>
                     </Box>
                  </form>
               )}
            </Formik>
         </DialogContent>
      </Dialog>
   );
};

export default LeaveRequestForm;
