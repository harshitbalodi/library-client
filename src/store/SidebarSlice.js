import { createSlice } from "@reduxjs/toolkit";

const initialState = true;
const SidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar(state) {
      return !state;
    },
    setSidebarInvisible(){
      return false;
    },
    setSidebarVisible(){
      return true;
    }
  },
});

export const { toggleSidebar, setSidebarInvisible, setSidebarVisible } = SidebarSlice.actions;

export default SidebarSlice.reducer;
