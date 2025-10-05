"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function Header() {
  return (
    <header className="sticky top-0 z-50  border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={'/'}>
        <h1 className="text-2xl font-bold text-foreground">TaskAnalyzer</h1>
        </Link>
        <div className="flex items-center gap-3">
            <Link href={'./login'}>
          <Button variant="ghost" size="default">
            Login
          </Button>
            </Link>
            <Link href={'./signup'}>
          <Button variant="default" size="default">
            Sign Up
          </Button>
            </Link>
        </div>
      </div>
    </header>
  )
}
