import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{accessToken:null,refreshToken:null},
    reducers:{
        setToken(state, action){
            state.accessToken= action.payload.access;
            state.refreshToken = action.payload.refresh;
            return state;
        },
        setRefresh(state, action){
            state.refreshToken = action.payload;
            return state;
        },
        logOut(){
            return {accessToken:null, refreshToken:null};
        },
        setAccess(state, action){
            console.log(action.payload.access);
            state.accessToken = action.payload.access;
            return state;
        }
    }
})
export const {setToken, logOut, setRefresh, setAccess} = authSlice.actions;

export default authSlice.reducer;