import { createSlice } from "@reduxjs/toolkit";
import { LOGIN_URL } from "../../../api/auth-url";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";
import { ADD_USER_URL, UPDATE_USER_BY_ID } from "../../../api/user-crud";


const userInfo = localStorage.getItem('userInfo')
   ? JSON.parse(localStorage.getItem('userInfo'))
   : null;


const INITIAL_STATE = {
   userInfo,
   userCreated: null,
   usersNumber: null,
   usersOnLeaveNumber: null,
   loading: false,
   error: null,
};

export const userLogin = createAsyncThunk(
   'user/login',
   async ({ email, password }, { rejectWithValue }) => {
      try {
         const config = {
            headers: {
               'Content-Type': 'application/json',
            },
         };
         //get the corresponding User IRI
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

const userSlice = createSlice({
   name: 'user',
   initialState: INITIAL_STATE,
   reducers: {
      logout(state) {
         state.userInfo = null;
         localStorage.removeItem("userInfo");
      },
      cleanUserCreated(state) {
         state.userCreated = null;
         state.loading = false;
         state.error = null;
      },
      setUserIsFirstLogin(state, action) {
         state.userInfo.isFirstLogin = action.payload;
      },
      setUserInfo(state, action) {
         state.userInfo = action.payload;
         localStorage.setItem('userInfo', JSON.stringify(action.payload));
      },
      setUsersNumber(state, action) {
         state.usersNumber = action.payload;
      },
      setUsersOnLeaveNumber(state, action) {
         state.usersOnLeaveNumber = action.payload;
      }
   },
   extraReducers: (builder) => {
      //user Login
      builder.addCase(userLogin.pending, (state) => {
         state.loading = true;
         state.error = null;
      }),
         builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
         }),
         builder.addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
      //user creation
      builder.addCase(userCreate.pending, (state) => {
         state.loading = true;
         state.error = null;
      }),
         builder.addCase(userCreate.fulfilled, (state, action) => {
            state.loading = false;
            state.userCreated = action.payload;
         }),
         builder.addCase(userCreate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;

         });
      //user update
      builder.addCase(userUpdate.pending, (state) => {
         state.loading = true;
         state.error = null;
      }),
         builder.addCase(userUpdate.fulfilled, (state, action) => {
            state.loading = false;
            state.userCreated = action.payload;
         }),
         builder.addCase(userUpdate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;

         });
   }
});

export const { logout, cleanUserCreated, setUserIsFirstLogin, setUserInfo, setUsersOnLeaveNumber, setUsersNumber } = userSlice.actions;
export default userSlice.reducer;