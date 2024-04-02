import { createSlice } from "@reduxjs/toolkit";
import studentService from "../services/studentService";

const initialState = null;
const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    getStudents(state) {
      return state;
    },
    setStudents(state, action) {
      return action.payload;
    },
  },
});

export const { getStudents, setStudents } = studentsSlice.actions;

export const studentThunk = () => {
  return async (dispatch,getState) => {
    const isAdminLoggedIn = getState().auth.adminLoggedIn;
    if(!isAdminLoggedIn){
      return;
    }
    try{
      const { data } = await studentService.getall();
      dispatch(setStudents(data.data));
    }catch(error){
      console.log("error in studentThunk", error);
      throw error;
    }
    
  };
}

export default studentsSlice.reducer;
