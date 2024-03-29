import { createSlice } from "@reduxjs/toolkit";
import { extractShifts } from "../utils/helper";
import { setShifts } from "./shiftSlice";
import hallServices from "../services/hallServices";

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

export const setHallsThunk = () => {
  return async (dispatch, getState) => {
    const { data } = await hallServices.getall();
    console.log(data);
    console.log("inside hall thunk", data);
    dispatch(setHalls(data.data));
    const halls = getState().halls;
    dispatch(setShifts(extractShifts(halls)));
  };
};
export default hallSlice.reducer;
