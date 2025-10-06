
import Users from '@/models/Users';
import taskschema from '@/models/taskschema';
import {connectDb} from '@/middleware/mongoose';
export async function GET() {
    
    

    try {
        await connectDb();
        const tasks = await taskschema.find({});
        return Response.json({ success: true, data: tasks }, { status: 201 });
    } catch (error) {
        console.log(error);
        return Response.json({ success: false, error: error.message }, { status: 400 });
    }
}