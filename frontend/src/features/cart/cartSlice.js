import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const cartSlice = createSlice({
    nam: "cart",
    initialState: {

    },
    reducers: {
        removeError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {

    }
})



export const { removeError } = cartSlice.actions;
export default cartSlice.reducer;