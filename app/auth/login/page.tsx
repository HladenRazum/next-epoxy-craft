"use client";

import axios from "axios";
import type { AxiosError } from "axios";
import { loginSchema } from "@/lib/schemas";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormFields = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await axios.post("/api/auth/login", data);

      if (res.status !== 200) {
        throw new Error("Нещо се обърка");
      }

      if (res.data.statusCode == 401) {
        throw new Error(res.data.message ?? "Unauthorized");
      }

      if (res.data && res.data.statusCode == 200) {
        console.log(res.data.message ?? "Успешно влизане в системата");
        isSubmitSuccessful &&
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
      }
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.message);
    }
  };

  return (
    <>
      <main className="wrapper py-10 place-content-center grid">
        <h1 className="text-5xl mb-5">Вход в системата</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[500px] bg-indigo-200 p-2 rounded text-black"
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
        {isSubmitSuccessful && <p>Препращане...</p>}
      </main>
    </>
  );
}
