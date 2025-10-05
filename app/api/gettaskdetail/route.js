
import Users from '@/models/Users';
import taskschema from '@/models/taskschema';
export async function POST(request) {
    
    const body=await request.json();
    try {
        console.log(body.taskid)
        const tasks = await taskschema.findOne({_id:body.taskid});
        // console.log(tasks);
        return Response.json({ success: true, data: tasks }, { status: 201 });
    } catch (error) {
        console.log(error);
        return Response.json({ success: false, error: error.message }, { status: 400 });
    }
}