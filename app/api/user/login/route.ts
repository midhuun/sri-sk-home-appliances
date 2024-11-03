import { User } from "@/app/lib/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDB } from "@/app/lib/db";

export async function POST(req: Request) {
  await connectToDB();
  const { username, password } = await req.json();
  console.log(username);

  try {
    const user = await User.findOne({ email: username });
    if (!user) {
      return NextResponse.json({ message: "User not Registered!" }, { status: 404 });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ message: "Incorrect Password! Try Again" }, { status: 401 });
    }
        const token = jwt.sign(
      { email: user.email},
      process.env.SECRET_KEY || 'Xb7wDALMRA',
      { expiresIn: 60 * 1200 } // 
    );

    // Return the generated token
    return NextResponse.json({ message: {token,"email":user.email,"name":user.name} }, { status: 200 });

  } catch (err: any) {
    console.error(err); // Log the error for debugging purposes
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
