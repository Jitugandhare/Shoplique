import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        error: null,
        success: false,
        user: null,
        isAuthenticated: false,

    },
    reducers: {
        removeError: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = null;
        }
    }
})


export const { removeError, removeSuccess } = userSlice.actions;
export default userSlice.reducer;