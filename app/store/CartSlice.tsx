"use client";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import Product from '../types/ProductType';
// interface cartType{
//     product:Product[],
//     quantity: number
// }
const initialState:any={name:"Midhun"}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart:(state,action:PayloadAction<any>) =>{
             return  {...state,product:action.payload}
        },
        removeFromCart:(state,action:PayloadAction<any>) =>{
            return {}
        }
    }
})
export const {addToCart,removeFromCart} = CartSlice.actions;
export default CartSlice.reducer;