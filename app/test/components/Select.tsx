/* eslint-disable react/display-name */
import React, { forwardRef } from "react"
import { UseFormRegister } from "react-hook-form"
import type { Inputs } from "./FormOne"

const Select = forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<Inputs>>
>(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </>
))

export default Select
