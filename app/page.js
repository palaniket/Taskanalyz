// import { Header } from "../components/"

import  TaskList  from "../components/tasklist/page"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
    
      <main className="container mx-auto px-4 py-8 max-w-4xl">
       
        <TaskList />
      </main>
    </div>
  )
}
