import mongoose, { Schema } from "mongoose";

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
  total: { type: String, required: true },
  user: { type: Schema.Types.Mixed, ref: "User" },
  address: { type: addressSchema, required: true }, 
});

export const Orders = mongoose.models.Orders || mongoose.model("Orders", orderSchema);
