import mongoose from "mongoose";  
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{type:String,required:true},
    mobile:{type:String,unique:true},
    email:{type:String,unique:true},
    password:{type:String,required:true,min:8},
    cartItems: [{
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true, min: 1 }  
      }]
    });

UserSchema.path('email').validate(function(value){
    return value || this.mobile
},"Either Email or password required")

UserSchema.path('mobile').validate(function(value){
    return value || this.email
},"Either Email or password required")