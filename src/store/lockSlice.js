import { createSlice } from "@reduxjs/toolkit";

const lockSlice = createSlice({
    name: "lock",
    initialState: true,
    reducers: {
        setLock(state, action) {
            return action.payload;
        },
    },
})

export const { setLock } = lockSlice.actions
export default lockSlice.reducer