import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';



export const fetchAdminProducts = createAsyncThunk('admin/fetchAdminProducts', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/v1/products/admin/product')

        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch products.')
    }
})




const adminSlice = createSlice({
    name: "admin",
    initialState: {
        products: [],
        loading: false,
        error: null,
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
        // fetch products
        builder.addCase(fetchAdminProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products = action.payload.products;
                console.log("Fullfilled case", action.payload)


            }).
            addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            })
    }

})


export const { removeError, removeSuccess } = adminSlice.actions;
export default adminSlice.reducer;