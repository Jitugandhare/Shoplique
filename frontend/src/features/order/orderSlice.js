import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const createOrder = createAsyncThunk('order/createOrder', async (order, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/v1/order/new/order`, order, config)

        console.log("Order data", data)


        return data

    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to create order.')
    }
})


// get all orders
export const getAllMyOrders = createAsyncThunk('order/getAllMyOrders', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/v1/order/my-orders`)

        console.log("All myOrders", data)


        return data

    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to Fetch Order.')
    }
})






const orderSlice = createSlice({
    name: "order",
    initialState: {

        loading: false,
        error: null,
        success: false,
        message: null,
        order: {},
        orders: [],
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
        },

    },

    extraReducers: (builder) => {
        // create order
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.order = action.payload.order;
                state.success = action.payload.success;

            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to create order.';
                state.success = false;
            })


        // getAllMyOrders
        builder
            .addCase(getAllMyOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.orders = action.payload.orders;
                state.success = action.payload.success;

            })
            .addCase(getAllMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to Fetch Order.';
                state.success = false;
            })


    }
})



export const { removeError, removeMessage, removeSuccess } = orderSlice.actions;
export default orderSlice.reducer;