"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Filter } from "lucide-react"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { TaskCard } from "../task-card/page"
import { CreateTaskDialog } from "../createtaskdialog/page"
import { EditTaskDialog } from "../editaskdialog/page"



export default function TaskList() {

  const initialTasks = []
  const router = useRouter()
  const [tasks, setTasks] = useState([])
    useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/gettasks");
      const result = await response.json();
      if (result.success) {
        setTasks(result.data);
      }
    };
    fetchTasks();
  }, []);
  console.log(tasks)

  const handleCreateTask = (newTask) => {
    const task = {
      _id: newTask._id,
      name: newTask.name,
      completed: false,
      priority: newTask.priority,
      description: newTask.description,
      assignedBy: newTask.assignedBy,
    }
    setTasks([task, ...tasks])
  }

  const handleToggle = (_id) => {
    setTasks(tasks.map((task) => (task._id === _id ? { ...task, completed: !task.completed } : task)))
  }

  const handleEdit = (id) => {
    const task = tasks.find((t) => t._id === id)
    if (task) {
      setEditingTask(task)
      setEditDialogOpen(true)
    }
  }

  const handleRemove = async (_id) => {
  try {
    const taskData={_id:_id};
    const response=await fetch('/api/taskapi/DeleteTask',{
          method:'DELETE',
          headers:{ 'Content-Type':'application/json'},
          body:JSON.stringify(taskData)
        })
        const result = await response.json();
    if (result.success) {
      setTasks(tasks.filter((task) => task._id !== _id));
    } else {
      // handle error (e.g., show toast)
      console.error(result.error);
    }
  } catch (error) {
    console.error(error);
  }
};

  const handleAnalyze = (id) => {
    router.push(`/analyze/${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <CreateTaskDialog onCreateTask={handleCreateTask} />
      </div>

      {/* Filter Controls */}
      <div className="flex items-center gap-3">
        <Select defaultValue="all">
          <SelectTrigger className="w-48 bg-card">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" className="bg-card">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Task Cards */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onRemove={handleRemove}
            onAnalyze={handleAnalyze}
          />
        ))}
      </div>

    </div>
  )
}
