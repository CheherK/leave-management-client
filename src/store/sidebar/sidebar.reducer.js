import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
   isCollapsed: false,
};

const sidebarSlice = createSlice({
   name: 'sidebar',
   initialState: INITIAL_STATE,
   reducers: {
      setIsCollapsed(state, action) {
         state.isCollapsed = action.payload;
      }
   }
});

export const { setIsCollapsed } = sidebarSlice.actions;
export default sidebarSlice.reducer;