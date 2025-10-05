import { NextResponse } from "next/server";

import Users from "@/models/Users";

export async function POST(req) {


  try {
    const {name, email, password } = await req.json();

    // 1️ Check if user exists
    const user = await Users.create({name:name,email: email,password:password });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 2️ Compare password (basic check)
    
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
