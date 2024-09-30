import { User } from "@/app/lib/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req:Request){
   const {fullName,email,phone,password}= await req.json();
   try{
   if(phone && password){
   const res = await User.create({
    name:fullName,
    email:email,
    mobile:phone,
    password:password
    })
   }
   if(!phone && !password){
      const res = await User.create({
         name:fullName,
         email:email
         })
   }
    return NextResponse.json({message:"Created"},{status:200})
}
 catch(err:any){
    return NextResponse.json({message:err},{status:400})
 }
}