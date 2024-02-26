import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const studentsSlice = createSlice({
    name:"students",
    initialState,
    reducers:{
        getStudents(state){
            return state;
        },
        setStudents(state, action){
            return action.payload;
        }
    }
})

export const {getStudents, setStudents} = studentsSlice.actions;
export default studentsSlice.reducer;

