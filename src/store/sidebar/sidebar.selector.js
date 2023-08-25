import { createSelector } from "reselect";

const selectSiderbarReducer = (state) => state.sidebar;

export const selectSidebar = createSelector(
   [selectSiderbarReducer],
   (sidebarSlice) => sidebarSlice
)
