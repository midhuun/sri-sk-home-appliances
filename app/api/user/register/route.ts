import { headers } from "next/headers";
import { User } from "@/app/lib/models/userModel";
import { NextResponse } from "next/server";
import jwt  from 'jsonwebtoken';
export async function POST(req:Request){
   const headersList = headers();
   console.log(headersList.get('authorization'));
   const {fullName,email,phone,password}= await req.json();

   try{
   await User.create({
    name:fullName,
    email:email,
    mobile:phone,
    password:password
    })
   const token =  jwt.sign({email:email},process.env.SECRET_KEY || 'Xb7wDALMRA',{expiresIn:7200})
    return NextResponse.json({message:{token,user:{email,fullName,phone}}},{status:200})
    
}
 catch(err:any){
    return NextResponse.json({message:err},{status:400})
 }
}