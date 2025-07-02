import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch product list with optional keyword, pagination, etc.
export const getProduct = createAsyncThunk(
    'product/getProduct',
    async ({ keyword = '', page = 1, limit = 10 } = {}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();

            if (keyword) params.append('search', keyword);
            if (page) params.append('page', page);
            if (limit) params.append('limit', limit);

            const link = keyword ? `/api/v1/products?keyword=${encodeURIComponent(keyword)}` : `/api/v1/products`;
            const { data } = await axios.get(link);
            console.log("Response data:-", data)
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

// Thunk to fetch individual product details by ID
export const getProductDetails = createAsyncThunk(
    'product/getProductDetails',
    async (id, { rejectWithValue }) => {
        try {
            const link = `/api/v1/products/product-details/${id}`;
            const { data } = await axios.get(link);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

// Initial State
const initialState = {
    products: [],
    productCount: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
    product: null,
};

// Slice
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        removeError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Get All Products
        builder
            .addCase(getProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products = action.payload.products;
                state.productCount = action.payload.totalProducts;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.page;
                console.log("FullFilled case", action.payload)

            })
            .addCase(getProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });

        // Get Product Details
        builder
            .addCase(getProductDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.product = action.payload.product;
                console.log("Product Details", action.payload)

            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

// Exports
export const { removeError } = productSlice.actions;
export default productSlice.reducer;
