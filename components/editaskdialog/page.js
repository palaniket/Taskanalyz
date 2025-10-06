"use client"

import { useState, useEffect } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { toast } from "sonner"

export function EditTaskDialog({ task, open, onOpenChange, onUpdateTask }) {
  const [name, setName] = useState("")
  const [priority, setPriority] = useState("medium")
  const [description, setDescription] = useState("")
  const [emailId, setEmailId] = useState("")

  useEffect(() => {
    if (task) {
      setName(task.name)
      setPriority(task.priority || "medium")
      setDescription(task.description || "")
      setEmailId(task.assignedBy || "")
    }
  }, [task])

  const handleUpdate = async () => {
  if (task && name.trim()) {
    const updatedTask = {
      _id: task._id,
      name: name.trim(),
      priority,
      description: description.trim(),
      // googleDetails:task.googleDetails
    //   email: emailId.trim(),
    };

    try {
      const response = await fetch(`/api/taskapi/EditTask`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      const result = await response.json();
      if (result.success) {
        onUpdateTask(task._id, updatedTask); // update parent state
        onOpenChange(false); // close dialog
        toast('task updated successfully')
      } else {
        // handle error (e.g., show toast)
        console.error(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

  const handleCancel = () => {
    onOpenChange(false)
  }

  if (!task) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="h-5 w-5" />
            Edit Task
          </DialogTitle>
          <DialogDescription>Update the task details below.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Task Name</Label>
            <Input
              id="edit-name"
              placeholder="Enter task name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-card"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-priority">Priority</Label>
            <Select value={priority} onValueChange={(value) => setPriority(value)}>
              <SelectTrigger id="edit-priority" className="bg-card">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-card min-h-[100px] resize-none"
            />
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="edit-email">Email ID</Label>
            <Input
              id="edit-email"
              type="email"
              placeholder="Enter email address"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="bg-card"
            />
          </div> */}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={!name.trim() }>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
