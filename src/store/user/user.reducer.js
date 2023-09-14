import { createSlice } from "@reduxjs/toolkit"; // Import createSlice from Redux Toolkit
import { LOGIN_URL } from "../../../api/auth-url"; // Import login URL from the authentication API
import { createAsyncThunk } from "@reduxjs/toolkit"; // Import createAsyncThunk from Redux Toolkit
import axios from "../../../api/axios"; // Import axios for making HTTP requests
import { ADD_USER_URL, UPDATE_USER_BY_ID } from "../../../api/user-crud"; // Import URLs for adding and updating users

// Retrieve user information from local storage or set to null if unavailable
const userInfo = localStorage.getItem('userInfo')
   ? JSON.parse(localStorage.getItem('userInfo'))
   : null;

// Define the initial state for the user slice of the Redux store
const INITIAL_STATE = {
   userInfo, // User information
   userCreated: null, // Newly created user data
   usersNumber: null, // Number of users
   usersOnLeaveNumber: null, // Number of users on leave
   loading: false, // Loading indicator
   error: null, // Error message
};

// Create an async thunk for user login
export const userLogin = createAsyncThunk(
   'user/login',
   async ({ email, password }, { rejectWithValue }) => {
      try {
         const config = {
            headers: {
               'Content-Type': 'application/json',
            },
         };
         // Get the corresponding User IRI
         let { data } = await axios.post(
            LOGIN_URL,
            { email, password },
            config
         );
         const userData = await axios.get(data, config);
         localStorage.setItem('userInfo', JSON.stringify(userData.data));
         return userData.data;
      } catch (error) {
         if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
         } else {
            return rejectWithValue(error.message);
         }
      }
   }
);

// Create an async thunk for user creation
export const userCreate = createAsyncThunk(
   'user/create',
   async (userData, { rejectWithValue }) => {
      try {
         let response = await axios.post(
            ADD_USER_URL,
            userData
         );
         return response.data;
      } catch (error) {
         if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
         } else {
            return rejectWithValue(error.message);
         }
      }
   }
);

// Create an async thunk for user update
export const userUpdate = createAsyncThunk(
   'user/update',
   async (userData, { rejectWithValue }) => {
      console.log(userData);
      const requestData = userData?.requestData;
      const id = userData?.userId;
      try {
         let response = await axios.patch(
            UPDATE_USER_BY_ID(id),
            { ...requestData }
         );
         console.log("res from updating user : ", response);
         return response.data;
      } catch (error) {
         if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
         } else {
            return rejectWithValue(error.message);
         }
      }
   }
);

// Create a userSlice using createSlice
const userSlice = createSlice({
   name: 'user',
   initialState: INITIAL_STATE,
   reducers: {
      // Logout user
      logout(state) {
         state.userInfo = null;
         localStorage.removeItem("userInfo");
      },
      // Clean userCreated data
      cleanUserCreated(state) {
         state.userCreated = null;
         state.loading = false;
         state.error = null;
      },
      // Set user's first login status
      setUserIsFirstLogin(state, action) {
         state.userInfo.isFirstLogin = action.payload;
      },
      // Set user information
      setUserInfo(state, action) {
         state.userInfo = action.payload;
         localStorage.setItem('userInfo', JSON.stringify(action.payload));
      },
      // Set the number of users
      setUsersNumber(state, action) {
         state.usersNumber = action.payload;
      },
      // Set the number of users on leave
      setUsersOnLeaveNumber(state, action) {
         state.usersOnLeaveNumber = action.payload;
      }
   },
   extraReducers: (builder) => {
      // Handle user login actions
      builder.addCase(userLogin.pending, (state) => {
         state.loading = true;
         state.error = null;
      });
      builder.addCase(userLogin.fulfilled, (state, action) => {
         state.loading = false;
         state.userInfo = action.payload;
      });
      builder.addCase(userLogin.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload;
      });
      
      // Handle user creation actions
      builder.addCase(userCreate.pending, (state) => {
         state.loading = true;
         state.error = null;
      });
      builder.addCase(userCreate.fulfilled, (state, action) => {
         state.loading = false;
         state.userCreated = action.payload;
      });
      builder.addCase(userCreate.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload;
      });
      
      // Handle user update actions
      builder.addCase(userUpdate.pending, (state) => {
         state.loading = true;
         state.error = null;
      });
      builder.addCase(userUpdate.fulfilled, (state, action) => {
         state.loading = false;
         state.userCreated = action.payload;
      });
      builder.addCase(userUpdate.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload;
      });
   }
});

// Export actions and reducer from userSlice
export const { logout, cleanUserCreated, setUserIsFirstLogin, setUserInfo, setUsersOnLeaveNumber, setUsersNumber } = userSlice.actions;
export default userSlice.reducer; // Export the user reducer
