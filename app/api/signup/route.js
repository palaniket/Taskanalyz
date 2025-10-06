import { NextResponse } from "next/server";

import Users from "@/models/Users";
import { connectDb } from "@/middleware/mongoose";
export async function POST(req) {


  try {
    await connectDb();
    const {name, email, password } = await req.json();

    // 1️ Check if user exists
    const user = await Users.create({name:name,email: email,password:password });


    
    return NextResponse.json(
      { success: true, message: "Signup successful", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error(" Login Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
