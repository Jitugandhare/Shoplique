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
        cartItems: JSON.parse(localStorage.getItem("cartItem")) || [],
        loading: false,
        error: null,
        success: false,
        message: null,
        removingId: null,
        shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},



    },
    reducers: {
        removeError: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = false;
        },
        removeItemFromCart: (state, action) => {
            state.removingId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.product !== action.payload);
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
            state.removingId = null;
        },
        removeMessage: (state) => {
            state.message = null;
        },
        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
            localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo))
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cartItem")
            localStorage.removeItem("shippingInfo")

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
                const existingItem = state.cartItems.find((i) => i.product === item.product);
                if (existingItem) {
                    existingItem.quantity = item.quantity;
                    state.message = `Updated ${item?.name} quantity in cart`;
                } else {
                    state.cartItems.push(item);
                    state.message = `${item?.name} added to cart successfully`;
                }
                state.loading = false;
                state.success = true;
                localStorage.setItem("cartItem", JSON.stringify(state.cartItems))
                console.log("CartItem:=>", item)

            })
            .addCase(addItemsToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "An error occurred";
            })
    }
})



export const { removeError, removeMessage, removeSuccess, removeItemFromCart, saveShippingInfo, clearCart } = cartSlice.actions;
export default cartSlice.reducer;