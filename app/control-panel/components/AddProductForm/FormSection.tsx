import { ReactNode } from "react"

type Props = {
  title: string
  borderBottom?: boolean
  children: ReactNode
}

export default function FormSection({
  borderBottom = true,
  title,
  children,
}: Props) {
  return (
    <>
      <h3 className="mb-5 text-primary">{title}</h3>
      <div className="flex flex-col gap-2 sm:flex-row">{children}</div>
      {borderBottom && <hr className="my-5" />}
    </>
  )
}
