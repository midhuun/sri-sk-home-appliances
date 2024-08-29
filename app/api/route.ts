import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await mongoose.connect("mongodb+srv://subash:sakthiMass@adminpanel.ykhyo.mongodb.net/?retryWrites=true&w=majority&appName=AdminPanel");
        console.log("Database connected successfully");
        return NextResponse.json({ message:"Success"});
    } catch (err) {
        console.error("Database connection error:", err);
        return NextResponse.json({ message: "error", error: err.message });
    }
}
