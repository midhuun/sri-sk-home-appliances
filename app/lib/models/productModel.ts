import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String},
    subcategories:[{type:Schema.Types.ObjectId,ref:'Subcategory'}]
});
export const Category = mongoose.models.Category || mongoose.model("Category",categorySchema)
const subCategorySchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:Schema.Types.ObjectId,ref:'Category'},
    products:[
        {type:Schema.Types.ObjectId,ref:"Products"}
    ]
})
export const subCategory = mongoose.models.subCategory || mongoose.model("subCategory",subCategorySchema);


const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    colors:[
        {type:String}
    ],
    stock:{type:Number,required:true},
    subcategory:{type:Schema.Types.ObjectId,ref:"SubCategory"}
})
export const Product = mongoose.models.Product || mongoose.model("Product",productSchema)

