import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProduct = createAsyncThunk('product/getProduct', async ({ keyword, page = 1, limit = 10
    , category


}, { rejectWithValue }) => {
    try {

        let link = '/api/v1/products?page=' + page;
        if (category) {
            link += `&category=${category}`
        }
        if (keyword) {
            link += `&keyword=${encodeURIComponent(keyword)}`;
        }

        // const link = keyword ? `/api/v1/products?keyword=${encodeURIComponent(keyword)}` : `/api/v1/products`
        // const link = '/api/v1/products';

        const { data } = await axios.get(link)
        console.log("Response data", data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'An error occur')
    }
})

export const getProductDetails = createAsyncThunk('product/getProductDetails', async (id, { rejectWithValue }) => {
    try {
        const link = `/api/v1/products/product-details/${id}`;
        const { data } = await axios.get(link)

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
        error: null,
        product: null,
        page: 1,
        totalPages: 0,
        limit: Number(10)

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
                state.totalPages = action.payload.totalPages;
                state.page = action.payload.page;
                state.limit = action.payload.limit;




            }).
            addCase(getProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            })

        builder.addCase(getProductDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.product = action.payload.product;

                console.log("Product Details", action.payload)


            }).
            addCase(getProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            })
    }
})


export const { removeError } = productSlice.actions;
export default productSlice.reducer;