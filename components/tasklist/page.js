"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Filter } from "lucide-react"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { TaskCard } from "../task-card/page"
import { CreateTaskDialog } from "../createtaskdialog/page"

const initialTasks = [
  { id: 1, name: "Complete project documentation", completed: false, priority: "high", assignedBy: "john@example.com" },
  { id: 2, name: "Review pull requests", completed: false, priority: "medium", assignedBy: "sarah@example.com" },
  { id: 3, name: "Update dependencies", completed: true, priority: "low", assignedBy: "mike@example.com" },
  { id: 4, name: "Fix responsive layout issues", completed: false, priority: "high", assignedBy: "emma@example.com" },
  {
    id: 5,
    name: "Implement user authentication",
    completed: false,
    priority: "medium",
    assignedBy: "alex@example.com",
  },
  { id: 6, name: "Write unit tests", completed: false, priority: "low", assignedBy: "lisa@example.com" },
]

export default function TaskList() {
  const router = useRouter()
  const [tasks, setTasks] = useState(initialTasks)

  const handleCreateTask = (newTask) => {
    const task = {
      id: Math.max(...tasks.map((t) => t.id), 0) + 1,
      name: newTask.name,
      completed: false,
      priority: newTask.priority,
      description: newTask.description,
      assignedBy: newTask.assignedBy,
    }
    setTasks([task, ...tasks])
  }

  const handleToggle = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleEdit = (id) => {
    console.log("Edit task:", id)
  }

  const handleRemove = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
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
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onRemove={handleRemove}
            onAnalyze={handleAnalyze}
          />
        ))}
      </div>

      {/* Analyze Button */}
      <div className="pt-4">
        <Button size="lg" className="w-full h-14 text-lg font-semibold">
          Analyze Tasks
        </Button>
      </div>
    </div>
  )
}
