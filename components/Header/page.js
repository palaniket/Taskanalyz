"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold text-foreground">TaskAnalyzer</h1>
        </Link>
        <div className="flex items-center gap-3">
          {!token && (
            <>
              <Link href="/components/login">
                <Button variant="ghost" size="default">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="default" size="default">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          {token && (
            <Button variant="default" size="default" onClick={logout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
