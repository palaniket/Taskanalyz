
import Users from '@/models/Users';
import taskschema from '@/models/taskschema';
export async function GET() {
    
    

    try {
        const tasks = await taskschema.find({});
        return Response.json({ success: true, data: tasks }, { status: 201 });
    } catch (error) {
        console.log(error);
        return Response.json({ success: false, error: error.message }, { status: 400 });
    }
}