import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProduct = createAsyncThunk('product/getProduct', async (_, { rejectWithValue }) => {
    try {
        const link = '/api/v1/products';
        const { data } = await axios.get(link)
        console.log("Response data", data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'An error occur')
    }
})


const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        productCount: 0,
        loading: false,
        error: null
    },
    reducers: {
        removeError: (state) => {
            state.error = null;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products = action.payload.products;
                state.productCount = action.payload.productCount;
                console.log("Fullfilled case", action.payload)


            }).
            addCase(getProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            })
    }
})


export const { removeError } = productSlice.actions;
export default productSlice.reducer;