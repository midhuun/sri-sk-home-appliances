import mongoose from "mongoose"
export const connectToDB  = async() =>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@adminpanel.ykhyo.mongodb.net/?retryWrites=true&w=majority&appName=AdminPanel`);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        throw new Error("Database connection failed");
    }
}
