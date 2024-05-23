"use client"

import Chip from "@/components/atoms/Chip"
import { Product } from "@/lib/schemas"
import { cn } from "@/lib/utils"
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { FieldValues, Path, useFormContext } from "react-hook-form"
import { flushSync } from "react-dom"

type Props = {
  label: string
  name: "materials.wood" | "materials.resin" //TODO: find a way to improve this
}

function MulitpleOptionsInput({ label, name }: Props) {
  const {
    getValues,
    setValue,

    formState: { errors },
  } = useFormContext<Product>()

  const [text, setText] = useState("")
  const [options, setOptions] = useState(getValues(name))
  const [isFocused, setIsFocused] = useState(false)

  const handleOnAddItem = () => {
    if (text.trim().length === 0) {
      return
    }

    setText("")
    setOptions([...options, text])
  }

  const handleOnClearItems = () => {
    setOptions([])
  }

  const handleOnChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault()
      handleOnAddItem()
    }
  }

  useEffect(() => {
    setValue(name, options)
  }, [options, name, setValue])

  return (
    <>
      <div className="relative">
        <label className="text-sm" htmlFor={name}>
          {label}
        </label>
        <div
          className={cn(
            "items-center rounded border flex pl-3 pr-1 bg-white justify-between mb-2",
            isFocused ? "ring-2 ring-primary" : null
          )}
        >
          <input
            id={name}
            type="text"
            className="bg-transparent p-0 min-w-0 border-none focus:border-transparent focus:ring-0"
            onKeyDown={handleOnKeyDown}
            onChange={handleOnChangeValue}
            value={text}
            placeholder="..."
            autoComplete="false"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <button
            type="button"
            onClick={handleOnAddItem}
            className="border block p-1 text-sm bg-neutral-200 rounded"
          >
            Добави
          </button>
        </div>
        <ul className="flex gap-1 flex-wrap">
          {options.map((option, i) => (
            <li key={option + i}>
              <Chip className="bg-neutral-800 text-white" text={option} />
            </li>
          ))}
        </ul>
        {options.length > 0 ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              handleOnClearItems()
            }}
            className="text-xs text-primary underline absolute right-0 top-0"
          >
            изчисти
          </button>
        ) : null}

        {/*TODO: How to get the error message for this input  */}
      </div>
    </>
  )
}

export default MulitpleOptionsInput
