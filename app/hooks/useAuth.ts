import axios from "axios"
import { useEffect, useState } from "react"

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get("/api/auth/me")
      if (data.statusCode == 200 && data.status == "success") {
        setIsAuthenticated(true)
      }
    })()
  }, [])

  return {
    isAuthenticated,
    setIsAuthenticated,
  }
}
