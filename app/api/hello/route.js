import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function GET() {
    await mongoose.connect(process.env.MONGODB_URI);
  return NextResponse.json({ message: "Hello, World!" });
}