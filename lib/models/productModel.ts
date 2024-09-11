import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String},
    subcategories:[{type:Schema.Types.ObjectId,ref:'Subcategory'}]
});
const Category = mongoose.models.Category || mongoose.model("Category",categorySchema)
module.exports = Category

const subCategorySchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:Schema.Types.ObjectId,ref:'Category'},
    products:[
        {type:Schema.Types.ObjectId,ref:"Products"}
    ]
})
const subCategory = mongoose.models.subCategory || mongoose.model("subCategory",subCategorySchema);
module.exports = subCategory;

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
const Product = mongoose.models.Product || mongoose.model("Product",productSchema)
module.exports = Product;
