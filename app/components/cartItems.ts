"use client"
import { useAppSelector } from "../store/store";

export const cartItems = useAppSelector((state:any)=>state.cart);
