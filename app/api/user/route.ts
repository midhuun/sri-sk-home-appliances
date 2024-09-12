import { ConnectToDB } from '@/app/lib/db';
import { Category } from '@/app/lib/models/productModel';
import { NextResponse } from 'next/server';
ConnectToDB();
export async function GET(req:Request):Promise<Response> {
    
    return NextResponse.json({ message:"Success"});
}
export async function POST(req:Request):Promise<Response> {
    // const formDatas = await req.formData();
    // const timeStamp = Date.now();
    // const image:any = formDatas.get('image');
    // const form = new FormData();
    // form.append('image',image)
    // const data = await fetch('https://api.imgbb.com/1/upload?key=f3145a10e034400f4b912f8123f851b1',{
    //     method:'POST',
    //     body:form
    // })
    // const result =await data.json();
    // const imgUrl = result.data.display_url;
    // const imageByteData = await image.arrayBuffer();
    // const buffer = Buffer.from(imageByteData);
    // const path = `./public/${timeStamp}_${image.name}`;
    // await writeFile(path,buffer);
    // const imgurl = `/${timeStamp}_${image.name}`
    // console.log(imgurl);
    const categoryName = {
        name:"Kitchen",
        description:"Dataaa",
    }
    await Category.create(categoryName)
    console.log("created");
    
    return NextResponse.json({ message:"Hello"});
}