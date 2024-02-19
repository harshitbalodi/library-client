import { createSlice } from "@reduxjs/toolkit";

const initialState=[];
const shiftSlice = createSlice({
    name:"shifts",
    initialState,
    reducers:{
        setShifts(state, actions){
            return actions.payload;
        },
    }
})

export const {setShifts} =shiftSlice.actions;
export default shiftSlice.reducer;