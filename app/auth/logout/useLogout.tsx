"use client"

import { Routes } from "@/lib/constants"
import axios, { AxiosError } from "axios"

export default function useLogout() {
  const controller = new AbortController()

  const logout = async () => {
    try {
      const response = await axios.post(`${Routes.API_LOGOUT}`, {
        signal: controller.signal,
      })

      if (response.statusText !== "OK") {
        throw new Error("Възникна грешка. Моля опитайте отново")
      }

      if (response.data.statusCode !== 200) {
        throw new Error(
          "Неуспешен изход от системата. Моля опитайте отново като презаредите страницата"
        )
      }
    } catch (error) {
      const e = error as AxiosError
    }

    setTimeout(() => {
      controller.abort()
    }, 5000)
  }

  return {
    logout,
  }
}
