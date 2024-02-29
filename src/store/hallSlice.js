import { createSlice } from "@reduxjs/toolkit";
import deskService from "../services/deskService";
import { desksToHalls, extractShifts } from "../utils/helper";
import { setShifts } from "./shiftSlice";

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

export const setHallsThunk=()=>{
    return async (dispatch, getState) =>{
      const {data} = await deskService.getall();
        console.log("inside setHallthunk",data);
        const newHallData = desksToHalls(data.data);
        dispatch(setHalls(newHallData));
        const halls = getState().halls;
        dispatch(setShifts(extractShifts(halls)));
    }
}
export default hallSlice.reducer;
