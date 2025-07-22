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



export const createProduct = createAsyncThunk('admin/createProduct', async (productData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const { data } = await axios.post('/api/v1/products/admin/create-product', productData, config)

        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to create products.')
    }
})


export const updateProduct = createAsyncThunk('admin/updateProduct', async ({ formData, id }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const { data } = await axios.put(`/api/v1/products/admin/product/${id}`, formData, config)

        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to update products.')
    }
})




const adminSlice = createSlice({
    name: "admin",
    initialState: {
        products: [],
        loading: false,
        error: null,
        success: false,
        product: {},
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


        // create products
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products.push(action.payload.product);
                state.success = action.payload.success;

                console.log("Fullfilled case", action.payload)


            }).
            addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.error = action.payload || 'Failed to Create Product.';
            })

        // update product
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload.success;
                state.product = action.payload.product;

                console.log("Fullfilled case", action.payload.product)


            }).
            addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.error = action.payload || 'Failed to Update Product.';
            })
    }

})


export const { removeError, removeSuccess } = adminSlice.actions;
export default adminSlice.reducer;