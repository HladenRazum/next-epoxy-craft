"use client"

import ResizablePanel from "@/components/organisms/ResizablePanel"
import { useState } from "react"

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleCollapseSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <ResizablePanel type="div" className="w-[400px] border-r">
      <button className="border p-3" onClick={handleCollapseSidebar}>
        collapse sidebar
      </button>
    </ResizablePanel>
  )
}

export default Sidebar
