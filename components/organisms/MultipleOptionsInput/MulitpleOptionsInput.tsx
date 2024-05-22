"use client"

import Chip from "@/components/atoms/Chip"
import { cn } from "@/lib/utils"
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"

type Props = {
  label: string
  name: string
  getOptions: () => string[]
  onAddOption: (option: string) => void
}

const MulitpleOptionsInput = ({
  label,
  name,
  getOptions,
  onAddOption,
}: Props) => {
  const [value, setValue] = useState("")
  const [options, setOptions] = useState(() => getOptions())
  const [isFocused, setIsFocused] = useState(false)

  const handleOnAddItem = () => {
    if (value.trim().length === 0) {
      return
    }

    onAddOption(value)
    setValue("")
    // Trigger a rerender
    setOptions(getOptions())
  }

  const handleOnChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault()
      handleOnAddItem()
    }
  }

  return (
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
          value={value}
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
        {options?.map((option, i) => (
          <li key={option + i}>
            <Chip className="bg-neutral-800 text-white" text={option} />
          </li>
        ))}
      </ul>
      {options?.length > 0 ? (
        <button
          onClick={(e) => {
            e.preventDefault()
          }}
          className="text-xs text-primary underline absolute right-0 top-0"
        >
          изчисти
        </button>
      ) : null}
    </div>
  )
}

export default MulitpleOptionsInput
