import { writeFile } from 'fs/promises';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req:Request):Promise<Response> {
    console.log("API");
    return NextResponse.json({ message:"Success"});
}
export async function POST(req:Request):Promise<Response> {
    const formData = await req.formData();
    const timeStamp = Date.now();
    const image:any = formData.get('image');
    const imageByteData = await image?.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timeStamp}_${image.name}`;
    await writeFile(path,buffer);
    const imgurl = `/${timeStamp}_${image.name}`
    console.log(imgurl);
    return NextResponse.json({ message:imgurl});
}