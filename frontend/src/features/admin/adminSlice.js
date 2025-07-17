import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';



export const register = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post('/api/v1/user/register', userData, config)

        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Registration failed,Please try again later.')
    }
})




const adminSlice = createSlice({
    name: "admin",
    initialState: {
        loading: false,
        error: null,
        success: false,
        user: null,
        isAuthenticated: false,
        message: null,

    },
    reducers: {
        removeError: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        // register
    }

})


export const { removeError, removeSuccess } = adminSlice.actions;
export default adminSlice.reducer;