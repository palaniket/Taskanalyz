"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { TaskCard } from "../task-card/page"
import { CreateTaskDialog } from "../createtaskdialog/page"
import { EditTaskDialog } from "../editaskdialog/page"
import { toast } from "sonner"

export default function TaskList() {
  const router = useRouter()
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter state
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`/api/gettasks`)
      const result = await response.json()
      if (result.success) {
        setTasks(result.data)
      }
    }
    fetchTasks()
  }, [])

  // Filter tasks based on filterStatus
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all") return true
    if (filterStatus === "active") return !task.status
    if (filterStatus === "completed") return task.status
  })

  // Pagination on filtered tasks
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage)
  const currentTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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

  const handleToggle = async (_id) => {
    const task = tasks.find((task) => task._id === _id)
    if (!task) return
    if (task.completed) return

    const updatedTasks = tasks.map((t) =>
      t._id === _id ? { ...t, completed: true } : t
    )
    setTasks(updatedTasks)

   
  
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
      const response = await fetch(`/api/taskapi/DeleteTask`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id })
      })
      const result = await response.json()
      if (result.success) {
        setTasks(tasks.filter((task) => task._id !== _id))
      } else {
        console.error(result.error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleAnalyze = (id) => {
    router.push(`/analyze/${id}`)
  }

  const handleUpdateTask = (id, updates) => {
    setTasks(tasks.map((task) =>
      task._id === id ? { ...task, ...updates } : task
    ))
    setEditDialogOpen(false)
    setEditingTask(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <CreateTaskDialog onCreateTask={handleCreateTask} />
      </div>

      {/* Filter Controls */}
      <div className="flex items-center gap-3">
        <Select
          value={filterStatus}
          onValueChange={(value) => {
            setFilterStatus(value)
            setCurrentPage(1) // Reset to first page on filter change
          }}
        >
          <SelectTrigger className="w-48 bg-card">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <EditTaskDialog
        task={editingTask}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onUpdateTask={handleUpdateTask}
      />

      {/* Task Cards */}
      <div className="space-y-3">
        {currentTasks.map((task) => (
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

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? "bg-blue-500 text-white" : ""}
          >
            {page}
          </Button>
        ))}
      </div>
    </div>
  )
}
