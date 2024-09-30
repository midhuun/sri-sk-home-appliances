import { Category, Product, SubCategory } from '@/app/lib/models/productModel';
import { NextResponse } from 'next/server';

 export async function GET(req:Request):Promise<Response> {
    const categories= await Category.find();
    const subcategories = await SubCategory.find();
    const product = await Product.find();
    
    return NextResponse.json({ message:{categories,subcategories,product}},{status:200});

 }
 export async function POST(req:Request): Promise<Response> {
    const formDatas = await req.formData();
    const timeStamp = Date.now();
    const image:any = formDatas.get('file');
    const categoryId = formDatas.get('category');
    const subcategoryId = formDatas.get('subcategory');
    const subcategory = formDatas.get('subcategoryProduct');
    const categoryName = formDatas.get('categoryName');
    const price = formDatas.get('price');
    const colors = formDatas.get('colors');
    const actualPrice = formDatas.get('actualPrice');
    const stock = formDatas.get('stock');
    const form = new FormData();
    form.append('image',image);
    try{
    const data = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}`,{
        method:'POST',
        body:form
    })
    const result =await data.json();
    const imgUrl = result?.data?.display_url;
    console.log(imgUrl);
    
    if(subcategory){
       const createdProduct = await Product.create({
        name:formDatas.get('name'),
        image:imgUrl,
        description:formDatas.get('description'),
        price:price,
        stock:formDatas.get('stock'),
        originalPrice:actualPrice,
        colors:colors,
        subcategory:subcategoryId
       }) 
      await SubCategory.findByIdAndUpdate(subcategoryId,
        {
            $push:{products:createdProduct}
        },{ new: true, useFindAndModify: false })
    }
   else if(categoryId){
      const createdSubCategory =   await SubCategory.create({
            name:formDatas.get('name'),
            image:imgUrl,
            description:formDatas.get('description'),
            category:categoryId
        });
       await Category.findByIdAndUpdate(categoryId, {
        $push:{subcategories:createdSubCategory},
      },{ new: true, useFindAndModify: false });      
    }
    else if(categoryName){
        await Category.create({
            name:categoryName,
            image:imgUrl,
            description:formDatas.get('description'),
        });
    }   
    try{
    return NextResponse.json({ message:"success"},{status:200});
    }
    catch(err){
        return NextResponse.json({ message:"Cannot get Values"},{status:400});
    }
}
catch(err){
    console.log(err);
    return NextResponse.json({ message:"Uploading Failed"});
}
}

export async function DELETE(req: Request) {
    try {
      const { subcategory, category, product } = await req.json();
      if (product) {
        const deletedProduct = await Product.findByIdAndDelete(product);
        if (!deletedProduct) {
          return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Product deleted successfully" });
      }
  
      if (subcategory) {
        const deletedSubcategory = await SubCategory.findByIdAndDelete(subcategory);
        if (!deletedSubcategory) {
          return NextResponse.json({ message: "Subcategory not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Subcategory deleted successfully" });
      }
  
      if (category) {
        const deletedCategory = await Category.findByIdAndDelete(category);
        if (!deletedCategory) {
          return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Category deleted successfully" });
      }
  
      return NextResponse.json({ message: "No valid data to delete" }, { status: 400 });
    } catch (error) {
      console.error("Error during deletion:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }
  






// const imageByteData = await image.arrayBuffer();
    // const buffer = Buffer.from(imageByteData);
    // const path = `./public/${timeStamp}_${image.name}`;
    // await writeFile(path,buffer);
    // const imgurl = `/${timeStamp}_${image.name}`
    // console.log(imgurl);