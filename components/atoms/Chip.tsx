import { cn } from "@/lib/utils"

type Props = {
  text: string
  className?: string
}

const Chip = ({ className, text }: Props) => {
  return (
    <span
      className={cn(
        "flex max-w-fit p-0.5 px-2 text-xs rounded items-center select-none justify-center border bg-neutral-200",
        className
      )}
    >
      {text}
    </span>
  )
}

export default Chip
