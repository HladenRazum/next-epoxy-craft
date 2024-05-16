import PhoneIcon from "./PhoneIcon"

type PhoheNumberLinkProps = {
  number?: string
  text?: string
}

export default function PhoneNumberLink({
  number = "+359 8888 88888",
  text = "За запитвания: ",
}: PhoheNumberLinkProps) {
  return (
    <a href={`tel:${number}`} className="flex items-center gap-3">
      <div className="flex items-center justify-center rounded-full p-1 border w-[36px] h-[36px] ">
        <PhoneIcon className="stroke-blue-500" />
      </div>
      <div>
        <p className="text-xs font-light -mb-2">{text}</p>
        <strong className="text-lg">{number}</strong>
      </div>
    </a>
  )
}
