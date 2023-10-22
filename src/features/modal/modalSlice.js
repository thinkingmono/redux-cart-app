import { createSlice } from "@reduxjs/toolkit";

/*Modal Initial State*/
const initialState = {
    isOpen: false
}

/*Modal properties config. Reducer routines to modify modal state*/
const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        /*Open modal handle*/
        openModal: (state, action) => {
            state.isOpen = true;
        },
        /*Close modal handle*/
        closeModal: (state, action) => {
            state.isOpen = false;
        }
    }
})

/*Export actions to be available in components*/
export const {openModal, closeModal} = modalSlice.actions;

export default modalSlice.reducer; /*Export reducer to add it in store*/