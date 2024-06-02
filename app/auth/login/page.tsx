"use client"

import { useState } from "react"
import axios from "axios"
import type { AxiosError } from "axios"
import { loginSchema } from "@/lib/schemas"
import { ErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { Routes } from "@/lib/constants"
import Link from "next/link"
import useAuth from "@/app/hooks/useAuth"
import { useRouter } from "next/navigation"

type FormFields = {
  username: string
  password: string
}

type Notification = {
  status: null | "success" | "error"
  message: null | string
}

export default function LoginPage() {
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [notification, setNotification] = useState<Notification>({
    status: null,
    message: "",
  })

  const { isAuthenticated, setIsAuthenticated } = useAuth()
  const { replace } = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await axios.post(Routes.API_LOGIN, data)

      if (!res.data.status) {
        setNotification({
          message: "Нещо се обърка",
          status: "error",
        })
        throw new Error("Нещо се обърка")
      }

      if (res.status !== 200) {
        throw new Error("Нещо се обърка")
      }

      if (res.data.statusCode == 401) {
        throw new Error(res.data.message ?? "Неуспешно влизане в системата")
      }

      setNotification({
        message: "Успешно влизане в системата",
        status: "success",
      })

      setIsAuthenticated(true)
      setIsRedirecting(true)
      setTimeout(() => {
        replace(Routes.CONTROL_PANEL)
      }, 4000)
    } catch (e) {
      const error = e as AxiosError
      console.log(e)

      setNotification({
        message: error.message,
        status: "error",
      })
    }

    reset()
  }

  const notificationEl =
    notification.status === "success" ? (
      <div className="text-center">
        <p className=" text-success">Успешно влизане в системата.</p>
      </div>
    ) : (
      <p className="pb-5 text-error text-center">{notification.message}</p>
    )

  return (
    <>
      <main className="wrapper py-10 relative">
        {isAuthenticated && (
          <Link
            className="absolute left-1 underline text-primary top-5"
            href={Routes.CONTROL_PANEL}
          >
            Контролен панел
          </Link>
        )}
        <div className="place-content-center grid">
          <h1 className="mb-4 text-center">Вход в системата</h1>

          {!isRedirecting && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full min-w-[360px] max-w-[500px] bg-indigo-200 p-2 rounded text-black"
            >
              <div className="mb-3">
                <label htmlFor="username">Потребител: </label>
                <br />
                <input
                  className="w-full text-xl bg-transparent placeholder:text-neutral-500"
                  type="text"
                  {...register("username")}
                  id="username"
                  autoComplete="off"
                />
                <div className="error-field">
                  <ErrorMessage name="username" errors={errors} />
                </div>
              </div>
              <div className="mb-5">
                <label htmlFor="password">Парола: </label>
                <br />
                <input
                  className="w-full text-xl bg-transparent placeholder:text-neutral-500"
                  type="password"
                  {...register("password")}
                  id="password"
                  autoComplete="off"
                />
                <div className="error-field">
                  <ErrorMessage name="password" errors={errors} />
                </div>
              </div>
              <button
                className="bg-primary btn text-white disabled:bg-neutral-500"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Влизане..." : "Вход в системата"}
              </button>
            </form>
          )}
        </div>
      </main>
      {notification.status !== null && notificationEl}
      {isRedirecting && (
        <div className="text-center">
          <p className="text-primary">Пренасочване към контролния панел...</p>
        </div>
      )}
    </>
  )
}
