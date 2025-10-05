import { NextResponse } from "next/server";
import taskschema from "@/models/taskschema";

export async function POST(request) {
    const body = await request.json();
    try {
        const task = await taskschema.create(body);
        return NextResponse.json({ success: true, data: task }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}