import { configureStore } from "@reduxjs/toolkit";
import hallSlice from "./hallSlice";
import shiftSlice from "./shiftSlice";
import SidebarSlice from "./SidebarSlice";
import studentsSlice from "./studentsSlice";
import seatSlice from "./seatSlice";
import authSlice from "./authSlice";
import editDropdownSlice from "./editDropdownSlice";

const store = configureStore({
  reducer: {
    halls: hallSlice,
    shifts: shiftSlice,
    sidebar: SidebarSlice,
    students: studentsSlice,
    seat: seatSlice,
    auth: authSlice,
    editDropdown: editDropdownSlice,
  },
});

export default store;
