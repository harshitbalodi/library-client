import { createSlice } from "@reduxjs/toolkit";

const editDropdownSlice = createSlice({
  name: "editDropdown",
  initialState: { isEnabled: false },
  reducers: {
    disableDropdown() {
      return { isEnabled: false };
    },
    enableDropdown() {
      return { isEnabled: true };
    },
  },
});

export const { disableDropdown, enableDropdown } = editDropdownSlice.actions;

export default editDropdownSlice.reducer;
