import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const cart = createAsyncThunk('user/cart', async (userData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/user/cart', userData, config)

        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Please try again later.')
    }
})







const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        loading: false,
        error: null,
        success: false,
        message: null,

    },
    reducers: {
        removeError: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = false;
        },
        removeMessage: (state) => {
            state.message = null;
        }
    },
    extraReducers: (builder) => {

    }
})



export const { removeError, removeMessage, removeSuccess } = cartSlice.actions;
export default cartSlice.reducer;