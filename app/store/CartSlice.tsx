"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../types/ProductType";

const initialState: any = [];
export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const existingProduct = state.find(
        (product: ProductType) => product._id === action.payload._id
      );

      if (existingProduct) {
        return state.map((product:any) =>
          product._id === action.payload._id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    },
    removeFromCart: (state, action: PayloadAction<ProductType>) => {
      return state
        .map((product: any) => {
          if (product._id === action.payload._id && product.quantity === 1) {
            // Return a filtered array without the product
            return state.filter(
              (product: ProductType) => product._id !== action.payload._id
            );
          } else if (product._id === action.payload._id) {
            // Decrease the quantity of the product
            return { ...product, quantity: product.quantity - 1 };
          }
          return product;
        })
        .flat(); // Flatten the resulting array
    },
    },
  });
  export const selectTotalValue = (state: { cart: any[] }) =>
    state.cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
export const { addToCart, removeFromCart} = CartSlice.actions;
export default CartSlice.reducer;
