"use client"

import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type Props = {
  children: ReactNode
  className?: string
  defaultWidth?: number
  type?: "aside" | "div"
} & HTMLAttributes<HTMLElement>

export default function ResizablePanel({
  defaultWidth,
  children,
  className = "",
  type = "div",
}: Props) {
  const [panelWidth, setPanelWidth] = useState<number>((defaultWidth = 300))

  const resizerRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  const onResize = (e: MouseEvent) => {
    if (!panelRef.current) {
      return
    }

    const x = e.clientX
    const currentWidth = parseInt(
      window.getComputedStyle(panelRef.current).width
    )
  }

  useEffect(() => {
    if (resizerRef.current) {
      resizerRef.current.addEventListener("mousedown", onResize)
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      resizerRef.current?.removeEventListener("mousedown", onResize)
    }
  }, [])

  switch (type) {
    case "aside": {
      return (
        <>
          <aside
          // ref={resizerRef}
          // className={cn(className, "")}
          // onResize={() => console.log("resized")}
          >
            {children}
          </aside>
        </>
      )
    }

    // TODO: https://www.youtube.com/watch?v=yKRLSfaJOWI
    default: {
      return (
        <div className="relative">
          <div
            style={{ width: panelWidth }}
            ref={panelRef}
            className={cn(className, "h-full")}
          >
            {children}
          </div>
          <div
            className="w-[10px] bg-pink-200 cursor-ew-resize absolute l-5"
            ref={resizerRef}
          ></div>
        </div>
      )
    }
  }
}
