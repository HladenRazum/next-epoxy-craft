"use client";

import axios from "axios";
import type { AxiosError } from "axios";
import { loginSchema } from "@/lib/schemas";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Routes } from "@/lib/constants";
import Link from "next/link";

type FormFields = {
  username: string;
  password: string;
};

type Notification = {
  status: null | "success" | "error";
  message: null | string;
};

export default function LoginPage() {
  const [notification, setNotification] = useState<Notification>({
    status: null,
    message: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await axios.post(Routes.API_LOGIN, data);

      if (!res.data.status) {
        setNotification({
          message: "Нещо се обърка",
          status: "error",
        });
        throw new Error("Нещо се обърка");
      }

      if (res.status !== 200) {
        throw new Error("Нещо се обърка");
      }

      if (res.data.statusCode == 401) {
        throw new Error(res.data.message ?? "Неуспешно влизане в системата");
      }

      if (res.data && res.data.statusCode == 200) {
        setNotification({
          message: "Успешно влизане в системата",
          status: "success",
        });
      }
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      setNotification({
        message: error.message,
        status: "error",
      });
    }

    reset();
  };

  const notificationEl =
    notification.status === "success" ? (
      <div className="text-center pb-5">
        <p className=" text-green-500 mb-5">Успешно влизане в системата</p>
        <Link
          className="text-blue-500 text-2xl underline"
          href={Routes.DASHBOARD}
        >
          Контролен панел
        </Link>
      </div>
    ) : (
      <p className="pb-5 text-red-500 text-center">{notification.message}</p>
    );

  return (
    <>
      <main className="wrapper py-10">
        <div className="place-content-center grid">
          <h1 className="mb-4">Вход в системата</h1>
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
        </div>
      </main>
      {notification.status !== null && notificationEl}
    </>
  );
}
