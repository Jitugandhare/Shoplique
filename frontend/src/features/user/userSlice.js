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

export const login = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/user/login', { email, password }, config)

        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Login failed,Please try again later.')
    }
})


export const loadUser = createAsyncThunk('user/loadUser', async (_, { rejectWithValue }) => {
    try {

        const { data } = await axios.get('/api/v1/user/profile')
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to load user.')
    }
})


export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    try {

        const { data } = await axios.post('/api/v1/user/logout', null, { withCredentials: true })
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Logout Failed.')
    }
})

export const updateProfile = createAsyncThunk('user/updateProfile', async (userData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put('/api/v1/user/profile/update', userData, config)
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to update profile.')
    }
})

export const forgotPassword = createAsyncThunk('user/forgotPassword', async (email, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put('/api/v1/user/forgot/password', email, config)
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Email sent is Failed.')
    }
})


export const updatePassword = createAsyncThunk('user/updatePassword', async (formData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put('/api/v1/user/password/update', formData, config)
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to update password.')
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

                console.log("Fulfilled-case", action.payload)



            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Registration failed,Please try again later.';
                state.user = null;
                state.success = false;
                state.isAuthenticated = false;

                console.log("Rejected-case", action.payload)

            })

        // Login
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.user || null;
                state.success = action.payload.success;
                state.isAuthenticated = Boolean(action.payload?.user);
                state.error = null;
                console.log("state-dot-user", state.user)
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Login failed,Please try again later.';
                state.user = null;
                state.success = false;
                state.isAuthenticated = false;
            })


        //Load user

        builder
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.user || null;
                state.isAuthenticated = Boolean(action.payload?.user);
                state.error = null;

            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to load user.';
                state.user = null;
                // state.isAuthenticated = false;
            })

        //Logout user

        builder
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.success = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // profile update
        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload?.user || null;
                state.success = action.payload?.success;
                state.message = action.payload?.message;

            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to update profile.';


            })


        // password update
        builder
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload?.success;

            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to update password.';


            })



        // forgot password
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload?.success;
                state.message = action.payload?.message;

            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Email sent is Failed.';


            })

    }
})


export const { removeError, removeSuccess } = userSlice.actions;
export default userSlice.reducer;