"use client";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../types/ProductType";
// interface cartType{
//     product:Product[],
//     quantity: number
// }
const initialState:any=[]

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductType>) => {
            const existingProduct = state.find((product: ProductType) => product._id === action.payload._id);
            
            if (existingProduct) {
                return state.map((product: ProductType) =>
                    product._id === action.payload._id
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                );
            } else {
                return [...state, { ...action.payload, quantity: 1 }];
            }
        },        
        removeFromCart:(state,action:PayloadAction<any>) =>{
            return {}
        }
    }
})
export const {addToCart,removeFromCart} = CartSlice.actions;
export default CartSlice.reducer;