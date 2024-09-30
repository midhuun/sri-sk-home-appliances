import mongoose from "mongoose";  
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10; // Define the salt work factor

const UserSchema = new Schema({
    name: {type: String, required: true},
    mobile: {type: String, unique: true},
    email: {type: String, unique: true},
    password: {type: String},
    creationDate: {type: Date, default: Date.now()},
    Address: {type: String},
    cartItems: [{
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true, min: 1 }  
      }],
      orders: [{
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true, min: 1 }  
      }]
});
UserSchema.path('email').validate(function(value){
    return value || this.mobile
}, "Either Email or mobile is required");

UserSchema.path('mobile').validate(function(value){
    return value || this.email
}, "Either Email or mobile is required");

UserSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    if(this.password){
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err:any) {
        return next(err);
    }
}
});
UserSchema.methods.validatePassword = async function validatePassword(data:any) {
    return bcrypt.compare(data, this.password);
};

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
