"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function AnalyzePage() {
  const router = useRouter()
  const params = useParams()
  const taskId = params.taskId
  const [prompt, setPrompt] = useState("")
  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim() || isLoading) return

    setIsLoading(true)
    setAnswer("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = `Based on your query "${prompt}" for task #${taskId}, here's my analysis:

The task appears to be well-structured and achievable. I recommend breaking it down into smaller subtasks for better tracking and progress monitoring. 

Key insights:
• Estimated completion time: 2-3 days
• Recommended priority: Medium to High
• Consider assigning additional resources if deadline is tight
• Regular check-ins will help maintain momentum

The current approach looks solid, but ensure all dependencies are clearly identified before starting implementation.`

      setAnswer(aiResponse)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">AI Task Analyzer</h1>
          </div>
          <span className="text-sm text-muted-foreground">Task #{taskId}</span>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-3">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt to analyze this task..."
              className="flex-1 h-12 text-base bg-card"
              disabled={isLoading}
            />
            <Button type="submit" size="lg" className="px-8" disabled={!prompt.trim() || isLoading}>
              {isLoading ? "Analyzing..." : "Submit"}
            </Button>
          </div>
        </form>

        {isLoading && (
          <Card className="p-8 bg-card border-border">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              <p className="text-muted-foreground">Analyzing your request...</p>
            </div>
          </Card>
        )}

        {answer && !isLoading && (
          <Card className="p-6 bg-card border-border">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">AI Analysis</h2>
            </div>
            <div className="pl-11">
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">{answer}</p>
            </div>
          </Card>
        )}

        {!answer && !isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold">AI Task Analysis</h2>
            <p className="text-muted-foreground max-w-md">
              Enter a prompt above to get AI-powered insights about this task. Ask about complexity, time estimates, or
              suggestions for improvement.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
