import mongoose from "mongoose"
export const ConnectToDB  = async() =>{
    await mongoose.connect("mongodb+srv://subash:sakthiMass@adminpanel.ykhyo.mongodb.net/?retryWrites=true&w=majority&appName=AdminPanel");
        console.log("Database connected successfully");
}
