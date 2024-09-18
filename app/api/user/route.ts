import { Category, Product, SubCategory } from '@/app/lib/models/productModel';
import { NextResponse } from 'next/server';

 export async function GET(req:Request):Promise<Response> {
    const categories = await Category.find().select('-earnings -total');
    const subcategories = await SubCategory.find().select('-earnings -total');
    const product = await Product.find().select('-earnings -instock -originalPrice');
    return NextResponse.json({ message:{categories,subcategories,product}},{status:200});

 }