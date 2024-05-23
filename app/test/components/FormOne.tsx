"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import Select from "./Select"

export type Inputs = {
  email: string
  password: string
  gender: "male" | "female" | undefined
}

export default function FormOne() {
  const { handleSubmit, register, formState } = useForm<Inputs>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      gender: undefined,
    },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <form
      className="border p-5 flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        {...register("email")}
        className="bg-transparent mb-3"
        placeholder="email"
        autoComplete="false"
      />
      <input
        type="text"
        {...register("password")}
        className="bg-transparent mb-3"
        placeholder="password"
        autoComplete="false"
      />
      <Select label="gender" {...register("gender")} />
      <div className="my-5">
        <button
          className="px-4 py-2 rounded bg-primary text-white"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  )
}
