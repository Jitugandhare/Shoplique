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
        console.log('register-user', userData);

        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Registration failed,Please try again later.')
    }
})


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
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload?.user || null;
                state.success = action.payload.success;
                state.isAuthenticated = Boolean(action.payload?.user)

                console.log("Fullfilled case", action.payload)



            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.loading = false;
                state.error = action.payload?.message || 'Registration failed,Please try again later.';
                state.user = null;
                state.success = false;
                state.isAuthenticated = false;

                console.log("Fullfilled case", action.payload)

            })
    }
})


export const { removeError, removeSuccess } = userSlice.actions;
export default userSlice.reducer;