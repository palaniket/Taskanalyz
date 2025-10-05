import { NextResponse } from "next/server";
import taskschema from "@/models/taskschema";

export async function DELETE(request) {
    const body = await request.json();
    try {
        const result = await taskschema.deleteOne({ _id: body._id });
        return NextResponse.json({ success: true, deletedCount: result.deletedCount }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}