"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Filter } from "lucide-react"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { TaskCard } from "../task-card/page"
import { CreateTaskDialog } from "../createtaskdialog/page"



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
    console.log("Edit task:", _id)
  }

  const handleRemove = (id) => {
    setTasks(tasks.filter((task) => task._id !== _id))
  }

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
