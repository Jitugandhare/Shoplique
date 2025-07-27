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


export const updateProduct = createAsyncThunk('admin/updateProduct', async ({ id, formData }, { rejectWithValue }) => {
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


export const deleteProduct = createAsyncThunk('admin/deleteProduct', async (id, { rejectWithValue }) => {
    try {

        const { data } = await axios.delete(`/api/v1/products/admin/product/${id}`)

        return { id }
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to Delete Product.')
    }
})


export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (_, { rejectWithValue }) => {
    try {

        const { data } = await axios.get(`/api/v1/user/admin/users`)
        console.log('Fetched users:', data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to Fetch Users.')
    }
})


export const getSingleUser = createAsyncThunk('admin/getSingleUser', async (id, { rejectWithValue }) => {
    try {

        const { data } = await axios.get(`/api/v1/user/admin/user/${id}`)
        console.log('Fetched single users:', data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to Fetch User.')
    }
})


export const updateUserRole = createAsyncThunk('admin/updateUserRole', async ({ id, role }, { rejectWithValue }) => {
    try {

        const { data } = await axios.put(`/api/v1/user/admin/user-profile-update/${id}`, { role })
        console.log('update user:', data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to Update User.')
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
        deleting: {},
        users: [],
        user: {},
        message: null,

    },
    reducers: {
        removeError: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = false;
        },
        clearMessage: (state) => {
            state.message = null;
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



            }).
            addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.error = action.payload || 'Failed to Update Product.';
            })

        // delete product
        builder.addCase(deleteProduct.pending, (state, action) => {
            const productId = action.meta.arg;

            state.deleting[productId] = true;
            state.error = null;
        })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const productId = action.payload.id;
                state.deleting[productId] = false;
                state.products = state.products.filter((product) => product._id !== productId)



            }).
            addCase(deleteProduct.rejected, (state, action) => {
                const productId = action.meta.arg;
                state.deleting[productId] = false;
                state.success = action.payload.success;
                state.error = action.payload || 'Failed to Delete Product.';
            })



        // Fetch Users
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.users = action.payload.user;

            })

            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.error = action.payload || 'Failed to Fetch Users.';
            })



        // fetch single user

        builder
            .addCase(getSingleUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSingleUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload.user;

            })

            .addCase(getSingleUser.rejected, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.error = action.payload || 'Failed to Fetch User.';
            })


        // update user role
        builder
            .addCase(updateUserRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserRole.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload?.success;
                state.message = action.payload?.message || "User Role Update Successfully.";
                // state.user = action.payload.user;
                 state.user = action.payload?.user || state.user;
            })
            .addCase(updateUserRole.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || 'Failed to Update User.';
            })


    }

})


export const { removeError, removeSuccess, clearMessage } = adminSlice.actions;
export default adminSlice.reducer;