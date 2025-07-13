import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const addItemsToCart = createAsyncThunk('cart/addItemsToCart', async ({ id, quantity }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/v1/products/product-details/${id}`)

        console.log("Returned Data:-", data)
        return {
            product: data.product._id,
            name: data.product?.name,
            price: data.product.price,
            image: data.product.image[0].url,
            stock: data.product.stock,
            quantity
        }


    } catch (error) {
        return rejectWithValue(error.response?.data || 'An error occurred.')
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

        builder
            .addCase(addItemsToCart.pending, (state) => {
                state.loading = true;
                state.error = null;

            })
            .addCase(addItemsToCart.fulfilled, (state, action) => {
                const item = action.payload;
                state.cartItems.push(item);
                state.loading = false;
                state.message = `${item?.name} added to cart`;
                state.success = true;
                console.log("CartItem:=>", item)

            })
            .addCase(addItemsToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "An error occurred";
            })
    }
})



export const { removeError, removeMessage, removeSuccess } = cartSlice.actions;
export default cartSlice.reducer;