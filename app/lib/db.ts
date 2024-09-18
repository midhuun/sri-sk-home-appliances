import mongoose from "mongoose"
export const connectToDB  = async() =>{
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@adminpanel.ykhyo.mongodb.net/?retryWrites=true&w=majority&appName=AdminPanel`);
        console.log("Database connected successfully");
}
