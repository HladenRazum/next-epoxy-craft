"use client"

import React, { useEffect } from "react"
import PhotoSwipeLightbox from "photoswipe/lightbox"
import Image from "next/image"
import "photoswipe/photoswipe.css"

type Props = {
  mainImageUrl: string
  imagesUrls: string[]
  productId: string
  productName: string
  galleryId: string
}

export default function Gallery({
  imagesUrls,
  productId,
  productName,
  mainImageUrl,
  galleryId,
}: Props) {
  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
      gallery: "#" + galleryId,
      children: "a",
      pswpModule: () => import("photoswipe"),
    })
    lightbox.init()

    return () => {
      lightbox?.destroy()
      lightbox = null
    }
  }, [galleryId])

  let allImages = [mainImageUrl, ...imagesUrls]

  return (
    <div
      className="pswp-gallery grid grid-cols-1 sm:grid-cols-2 "
      id={galleryId}
    >
      {allImages.map((image, index) => (
        <a
          href={image}
          data-pswp-width={1024}
          data-pswp-height={900}
          key={galleryId + "-" + index}
          target="_blank"
          rel="noreferrer"
        >
          <div className="h-[360px] relative overflow-hidden">
            <Image
              src={image}
              alt={productName + "-" + index}
              className="object-cover"
              fill={true}
            />
          </div>
        </a>
      ))}
    </div>
  )
}
