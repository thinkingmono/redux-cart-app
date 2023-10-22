import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = 'https://course-api.com/react-useReducer-cart-project';

/*Cart Initial State*/
const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true
}

/*Fetch cartItems from API using AsynThunk from Redux Toolkit and conventional fetch*/
// export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
//     return fetch(url)
//         .then((resp) => resp.json())
//         .catch((err) => console.log(err))
// })

/*Fetch cartItems from API using AsynThunk from Redux Toolkit and axios*/
export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
    try {
        const resp = await axios(url);
        return resp.data
    } catch (error) {
        console.log(error);
    }
})

/*Cart properties config. Reducer routines to modify cart state*/
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []; /*Set cartItems array to an empty array.*/
            // return {cartItems: []} /*Do not return here because would become new initial state without the other properties*/
        },
        removeItem: (state, action) => {
            const itemId = action.payload; /*Capture id from payload pass with remove button onClick*/
            state.cartItems = state.cartItems.filter((item) => itemId !== item.id); /*Update cartItems with array without the item removed*/
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems && state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.price * item.amount;
            })
            state.amount = amount;
            state.total = total;
        }
    },
    /*Reducers to handle promise state from fetch getCartItems*/
    extraReducers: (builder) => {
        builder.addCase(getCartItems.pending, (state) => {
            state.isLoading = true
        }).addCase(getCartItems.fulfilled, (state, action) => {
            // console.log(action);
            state.isLoading = false;
            state.cartItems = action.payload;
        }).addCase(getCartItems.rejected, (state) => {
            state.isLoading = false
        })
    }
});

// console.log(cartSlice);

/*Export actions to be available in components*/
export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer; /*Export reducer to add it in store*/