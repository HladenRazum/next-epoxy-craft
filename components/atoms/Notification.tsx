import { cn } from "@/lib/utils"

type Props = {
  notification: NotificationMessage
}

const Notification = ({ notification }: Props) => {
  if (notification.type == null) {
    return <></>
  }

  return (
    <p
      className={cn(
        "my-10 text-center",
        notification.type === "error" && "text-error",
        notification.type === "success" && "text-success"
      )}
    >
      {notification.message}
    </p>
  )
}

export default Notification
