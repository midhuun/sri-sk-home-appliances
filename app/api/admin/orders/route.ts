import { NextResponse } from "next/server";
import { Orders } from "@/app/lib/models/orderModel";
import { User } from "@/app/lib/models/userModel";
export async function POST(req:Request): Promise<Response> {
    const data =  await req.json();
    console.log(data);    
    try{
    const member = await User.findOne({email:data?.user});
    console.log(member);
   await Orders.create({
    products:data.cartItems,
    total:data.totalValue,
    address:data.address,
    
   })
   return NextResponse.json({message:"Success"},{status:200})
}
   catch(err){
    console.log(err)
    return NextResponse.json({message:err},{status:404})
   }
  


}