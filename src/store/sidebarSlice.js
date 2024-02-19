import { createSlice } from "@reduxjs/toolkit";

const initialState = false;
const sidebarSlice= createSlice({
    name:"isSidebarOpen",
    initialState,
    reducers:{
        toggleSidebar(state){
            return !state;
        }  
    }
})

export const {toggleSidebar} = sidebarSlice.actions;

export default sidebarSlice.reducer;