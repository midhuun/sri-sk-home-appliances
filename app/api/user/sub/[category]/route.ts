import { Category, Product, SubCategory } from '@/app/lib/models/productModel';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url =req.url;
    const parts = url.split('/');  // Splitting the URL by '/'
    const id = parts[parts.indexOf('sub') + 1];  // Getting the value after 'sub'
    console.log(id);  // Output: 123
    const category:any = await Category.findOne({name:id}).populate('subcategories');
    return NextResponse.json(
      { message:category },
      { status: 200 }
    );
  } catch (error:any) {
    return NextResponse.json(
      { error: 'Failed to fetch data', details: error.message },
      { status: 500 }
    );
  }
}
