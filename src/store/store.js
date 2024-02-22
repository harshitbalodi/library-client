import { configureStore } from "@reduxjs/toolkit";
import hallSlice from "./hallSlice";
import shiftSlice from "./shiftSlice";
const store = configureStore({
  reducer: {
    halls:hallSlice,
    shifts:shiftSlice
  },
});

export default store;
