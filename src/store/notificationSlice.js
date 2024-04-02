import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    success: null,
    error: null,
  },
  reducers: {
    setSuccess(state, action) {
      state.success = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearNotification(state) {
      state.error =null;
      state.success = null;
    },
  },
});


export const { setSuccess, setError, clearNotification } =
  notificationSlice.actions;

export const setSuccessMessage = (message) => {
  return (dispatch) => {
    dispatch(setSuccess(message));
    setTimeout(() => {
      dispatch(setSuccess(null));
    }, 5000);
  };
};

export const setErrorMessage = (message) => {
  return (dispatch) => {
    dispatch(setError(message));
    setTimeout(() => {
        dispatch(setError(null))
    }, 5000);
  };
};
export default notificationSlice.reducer;
