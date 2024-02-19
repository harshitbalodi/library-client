import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebarSlice";
import hallSlice from "./hallSlice";
import shiftSlice from "./shiftSlice";
const store = configureStore({
  reducer: {
    isSidebarOpen: sidebarSlice,
    halls:hallSlice,
    shifts:shiftSlice
  },
});

export default store;
