"use client"

import { Pencil, Trash2, Sparkles } from "lucide-react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"

const priorityColors = {
  low: "bg-green-500/10 text-green-500 border-green-500/20",
  medium: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  high: "bg-red-500/10 text-red-500 border-red-500/20",
}

export function TaskCard({ task, onToggle, onEdit, onRemove, onAnalyze }) {
  const truncateDescription = (text, wordLimit = 60) => {
    const words = text.split(/\s+/)
    if (words.length <= wordLimit) return text
    return words.slice(0, wordLimit).join(" ") + "..."
  }

  return (
    <Card className="p-4 bg-card border-border hover:border-primary/50 transition-colors">
      <div className="flex items-start gap-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task._id)}
          className="h-5 w-5 mt-1"
        />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-base font-medium ${
                task.completed
                  ? "line-through text-muted-foreground"
                  : "text-card-foreground"
              }`}
            >
              {task.name}
            </span>
            {task.priority && (
              <Badge
                variant="outline"
                className={priorityColors[task.priority]}
              >
                {task.priority.toUpperCase()}
              </Badge>
            )}
          </div>
          {task.assignedBy && (
            <p className="text-sm text-muted-foreground">
              Assigned by: {task.assignedBy}
            </p>
          )}
          {task.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {truncateDescription(task.description, 60)}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="default"
            size="sm"
            onClick={() => onAnalyze(task._id)}
            className="h-9 px-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <Sparkles className="h-4 w-4 mr-1" />
            AI Analyze
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task._id)}
            className="h-9 px-3"
          >
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(task._id)}
            className="h-9 px-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </Card>
  )
}
