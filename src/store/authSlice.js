import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { adminLoggedIn: false },
  reducers: {
    logIn() {
      return { adminLoggedIn: true };
    },
    logOut() {
      return { adminLoggedIn: false };
    },
  },
});
export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
