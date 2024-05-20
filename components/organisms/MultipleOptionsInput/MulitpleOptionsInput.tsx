"use client"

import Chip from "@/components/atoms/Chip"
import { ChangeEvent, KeyboardEvent, useState } from "react"

type Props = {
  label: string
  name: string
}

const MulitpleOptionsInput = ({ label, name }: Props) => {
  const [value, setValue] = useState("")
  const [items, setItems] = useState<string[]>([])

  const handleOnAddItem = () => {
    if (value.trim().length === 0) {
      return
    }

    setItems((prev) => [...prev, value.toLowerCase()])
    setValue("")
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
    <div className="">
      <label className="text-sm" htmlFor={name}>
        {label}
      </label>
      <div className="relative items-center flex px-2 bg-white input justify-between mb-2">
        <input
          id={name}
          type="text"
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChangeValue}
          value={value}
          className="pl-1 bg-transparent border-none focus:border-transparent flex-1 focus:ring-0"
          placeholder="..."
          autoComplete="false"
        />
        <button
          type="button"
          onClick={handleOnAddItem}
          className="border flex items-center p-1 text-sm bg-neutral-200 rounded"
        >
          Добави
        </button>
      </div>
      <ul className="flex gap-1 flex-wrap">
        {items.map((item, i) => (
          <li key={item + i}>
            <Chip className="bg-neutral-800 text-white" text={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MulitpleOptionsInput
