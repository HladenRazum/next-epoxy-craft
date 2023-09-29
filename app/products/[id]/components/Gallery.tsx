"use client";

import Image from "next/image";
import React from "react";

type Props = {
  mainImageUrl: string;
  imagesUrls: string[];
  productId: string;
  productName: string;
};

export default function Gallery({
  imagesUrls,
  productId,
  productName,
  mainImageUrl,
}: Props) {
  let allImages = [mainImageUrl, ...imagesUrls];
  return (
      <ul className='flex flex-wrap gap-2'>
         {allImages.map((url, i) =>
         (<li key={productId.concat(i.toString())}>
            <Image src={url} alt={productName} width={200} height={200} />
         </li>))}
      </ul>
   );
}
