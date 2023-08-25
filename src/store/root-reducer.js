import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./user/user.reducer";
import sidebarReducer from "./sidebar/sidebar.reducer";

const rootReducers = combineReducers({
   user: userReducer,
   sidebar: sidebarReducer,
});

export default rootReducers;