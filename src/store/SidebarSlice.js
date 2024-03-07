import { createSlice } from "@reduxjs/toolkit";

const initialState = true;
const SidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebarVisible() {
      return true;
    },
    setSidebarInvisible() {
      return false;
    },
  },
});

export const { setSidebarVisible, setSidebarInvisible } = SidebarSlice.actions;

export default SidebarSlice.reducer;
