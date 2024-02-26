import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
const hallSlice = createSlice({
  name: "halls",
  initialState,
  reducers: {
    setHalls(state, actions) {
      return actions.payload;
    },
  },
});

export const { setHalls } = hallSlice.actions;
export default hallSlice.reducer;
