"use client"

import { useEffect } from "react"

export function DbInitializer() {
  useEffect(() => {
    // Initialize database when component mounts
    const initDb = async () => {
      try {
        const response = await fetch("/api/init-db", {
          method: "POST",
        })
        if (response.ok) {
          console.log("Database initialized successfully")
        }
      } catch (error) {
        console.error("Failed to initialize database:", error)
      }
    }

    initDb()
  }, [])

  return null // This component doesn't render anything
}
