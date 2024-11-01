import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductType } from "../types/ProductType";

const initialState:any = []
export const FavouriteSlice = createSlice({
  name:'favourite',
  initialState,
  reducers:{
    addToFavourite:(state, action: PayloadAction<ProductType>) =>{
        return [...state, action.payload];
      },
      removeFromFavourite: (state, action: PayloadAction<ProductType>) => {
        return state.filter((product:ProductType)=>product._id !== action.payload._id);

      },
  }
})
export const { addToFavourite, removeFromFavourite } = FavouriteSlice.actions;  
export default FavouriteSlice.reducer;