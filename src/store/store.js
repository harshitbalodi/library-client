import { configureStore } from "@reduxjs/toolkit";
import hallSlice from "./hallSlice";
import shiftSlice from "./shiftSlice";
import SidebarSlice from './SidebarSlice';
import studentsSlice from "./studentsSlice";
import seatSlice from "./seatSlice";

const store = configureStore({
  reducer: {
    halls:hallSlice,
    shifts:shiftSlice,
    sidebar:SidebarSlice,
    students:studentsSlice,
    seat:seatSlice
  },
});

export default store;
