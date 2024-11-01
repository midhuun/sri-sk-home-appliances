import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import FavouriteSlice from "./FavouriteSlice";

export  const store = configureStore({
    reducer:{
        cart:CartSlice,
        favourite:FavouriteSlice
    }
})

export type  RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;