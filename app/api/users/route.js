import {connectDb} from '@/middleware/mongoose';
import Users from '@/models/Users';


export async function POST(request) {
    await connectDb();
    const body = await request.json();

    try {
        const user = await Users.create(body);
        return Response.json({ success: true, data: user }, { status: 201 });
    } catch (error) {
        console.log(error);
        return Response.json({ success: false, error: error.message }, { status: 400 });
    }
}