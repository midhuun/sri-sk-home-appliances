import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String},
    total:{type:Number},
    earnings:{type:Number},
    subcategories:[{type:Schema.Types.ObjectId,ref:'SubCategory'}]
});
export const Category = mongoose.models.Category || mongoose.model("Category",categorySchema)
const subCategorySchema = new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String ,required:true},
    total:{type:Number},
    earnings:{type:Number},
    description:{type:String,required:true},
    category:{type:Schema.Types.ObjectId,ref:'Category'},
    products:[
        {type:Schema.Types.ObjectId,ref:"Product"}
    ]
})
export const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory",subCategorySchema);


const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    earnings:{type:Number},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    instock:{type:Boolean,default:true},
    originalPrice:{type:Number},
    colors:[
        {type:String}
    ],
    stock:{type:Number,required:true},
    subcategory:{type:Schema.Types.ObjectId,ref:"SubCategory"}
})
export const Product = mongoose.models.Product || mongoose.model("Product",productSchema)

