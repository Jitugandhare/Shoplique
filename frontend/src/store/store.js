import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/product/productSlice'
import userReducer from '../features/user/userSlice'
import cartReducer from '../features/cart/cartSlice'
import adminReducer from '../features/admin/adminSlice'
import orderReducer from '../features/order/orderSlice'


const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        admin: adminReducer,
        cart: cartReducer,
        order:orderReducer,
    }
})

export default store;