import { NextResponse } from "next/server";
import taskschema from "@/models/taskschema";
import { connectDb } from "@/middleware/mongoose";
export async function PUT(request) {
    const body = await request.json();
    body.status = true;
    try {
        await connectDb();
        const task = await taskschema.findOneAndUpdate(
            {_id:body._id},
            body,
            {new:true}
        );
        return NextResponse.json({ success: true, data: task }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}