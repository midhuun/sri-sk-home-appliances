import { Category, Product, SubCategory } from '@/app/lib/models/productModel';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const categories = await Category.find().populate('subcategories').select('-earnings -total');
    const subcategories:any = await SubCategory.find({}).populate('products','name description image price colors subcategory').select('-earnings -total')
    const products = await Product.find().populate('subcategory',{'name':1,'category':1}).select('-earnings -instock -originalPrice');
   
    return NextResponse.json(
      { message: { categories, subcategories, products } },
      { status: 200 }
    );
  } catch (error:any) {
    return NextResponse.json(
      { error: 'Failed to fetch data', details: error.message },
      { status: 500 }
    );
  }
}
