import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../src/features/cart/cartSlice'
import modalReducer from '../src/features/modal/modalSlice'

/*Stores all states and actions from the app*/
export const store = configureStore({
    reducer:{
        cart: cartReducer, /*Provides access to cart state*/
        modal: modalReducer /*Provides access to modal state*/
    }
})