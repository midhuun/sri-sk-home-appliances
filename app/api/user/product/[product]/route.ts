import { Product } from '@/app/lib/models/productModel';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url =req.url;
    const parts = url.split('/'); 
    const id = parts[parts.indexOf('product') + 1];  // Getting the value after 'sub'
    const subCategory:any = await Product.findOne({name:decodeURIComponent(id)}).populate('subcategory');
    return NextResponse.json(
      { message:subCategory },
      { status: 200 }
    );
  } catch (error:any) {
    return NextResponse.json(
      { error: 'Failed to fetch data', details: error.message },
      { status: 500 }
    );
  }
}
