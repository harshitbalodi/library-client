import { createSlice } from "@reduxjs/toolkit";

const initialState = true;
const SidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar(state) {
      return !state;
    }
  },
});

export const { toggleSidebar } = SidebarSlice.actions;

export default SidebarSlice.reducer;
