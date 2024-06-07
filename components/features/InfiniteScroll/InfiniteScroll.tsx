"use client"

import { useEffect, useRef, useState } from "react"

const InfiniteScroll = () => {
  const [items, setItems] = useState<any[]>([])

  const watcher = useRef<HTMLDivElement>(null)

  const handleAdd = () => {
    setTimeout(() => {
      setItems((prev) => [...prev, 8])
    }, 2000)
  }

  useEffect(() => {
    const observerRef = new IntersectionObserver(handleAdd, {
      // rootMargin: "-500px",
      threshold: 1,
    })

    if (watcher.current) {
      observerRef.observe(watcher.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="wrapper bg-neutral-950 min-h-screen px-5 mb-20">
      <h2 className="text-error text-lg">Infinite Scroll</h2>

      <ul className="grid grid-cols-2 gap-5">
        <ImagePlaceholder />
        <ImagePlaceholder />
        {items.map((item, i) => (
          <ImagePlaceholder key={i} />
        ))}
      </ul>

      <div className="h-[100px] bg-red-500 w-full" ref={watcher}></div>
      <div className="h-screen bg-neutral-600"></div>
    </div>
  )
}

export default InfiniteScroll

function ImagePlaceholder() {
  return <div className="bg-neutral-800 h-[360px]"></div>
}
