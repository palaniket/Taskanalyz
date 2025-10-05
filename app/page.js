import { Header } from "../components/Header"
import { SearchBar } from "../components/searchbar"
import { TaskList } from "../components/tasklist"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <SearchBar />
        <TaskList />
      </main>
    </div>
  )
}
