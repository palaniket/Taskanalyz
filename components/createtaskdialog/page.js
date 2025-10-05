"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "../ui/textarea"


export function CreateTaskDialog({ onCreateTask }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [priority, setPriority] = useState("medium")
  const [description, setDescription] = useState("")
  const [emailId, setEmailId] = useState("")

  const handleCreate = async() => {
    if (name.trim() && emailId.trim()) {
      const taskData={
        name: name.trim(),
        priority,
        description: description.trim(),
        assignedBy: emailId.trim(),
      }
      try{
        const response=await fetch('/api/taskapi/createtask',{
          method:'POST',
          headers:{ 'Content-Type':'application/json'},
          body:JSON.stringify(taskData)
        })
        const result = await response.json();
      if (result.success) {
        onCreateTask(result.data); // update parent if needed
        // Reset form
        setName("");
        setPriority("medium");
        setDescription("");
        setEmailId("");
        setOpen(false);
      } else {
        // handle error (e.g., show toast)
        console.error(result.error);
      }
    } catch (error) {
      console.error(error);
    }
    }

  }

  const handleCancel = () => {
    setName("")
    setPriority("medium")
    setDescription("")
    setEmailId("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="h-12 px-6 font-semibold">
          <Plus className="h-5 w-5 mr-2" />
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Add a new task to your list. Fill in all the details below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Task Name</Label>
            <Input
              id="name"
              placeholder="Enter task name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-card"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority} onValueChange={(value) => setPriority(value)}>
              <SelectTrigger id="priority" className="bg-card">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="urgent">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-card min-h-[100px] resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email ID</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="bg-card"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!name.trim() || !emailId.trim()}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
