import { configureStore } from "@reduxjs/toolkit";
import hallSlice from "./hallSlice";
import shiftSlice from "./shiftSlice";
import SidebarSlice from './SidebarSlice';
import studentsSlice from "./studentsSlice";

const store = configureStore({
  reducer: {
    halls:hallSlice,
    shifts:shiftSlice,
    sidebar:SidebarSlice,
    students:studentsSlice
  },
});

export default store;
