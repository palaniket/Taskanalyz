import { NextResponse } from "next/server";

import Users from "@/models/Users";

export async function POST(req) {


  try {
    const { email, password } = await req.json();

    // 1️ Check if user exists
    const user = await Users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 2️ Compare password (basic check)
    if (user.password !== password) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    // 3️ Return success
    return NextResponse.json(
      { success: true, message: "Login successful", data: user },
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
