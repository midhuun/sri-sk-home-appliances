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
    address: {type: String},
    orders: [{type: Schema.Types.ObjectId, ref: "Orders"}]
});


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

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
