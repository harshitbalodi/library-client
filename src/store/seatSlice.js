import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const seatSlice = createSlice({
    name:"seat",
    initialState,
    reducers:{
        setSeat(state,action){
            return action.payload;
        }
    }
})

export const {setSeat} = seatSlice.actions;

export default seatSlice.reducer;