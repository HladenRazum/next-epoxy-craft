"use client";

import Image from "next/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type Props = {
   items: Image[] | [];
   gutter?: string;
};

type Image = {
   id: number,
   src: string;
   alt: string;
};

export default function MasonryGrid({ items, gutter = '5px' }: Props) {
   if (items.length === 0) {
      return <p className="text-blue-300">Could not find any images.</p>;
   }

   return (
      <ResponsiveMasonry columnsCountBreakPoints={{
         300: 1,
         550: 2,
         900: 3
      }}>
         <Masonry gutter={gutter} >{items.map(({ id, src, alt }) => (<Image key={id} src={src} alt={alt} width={600} height={600} />)
         )}</Masonry>
      </ResponsiveMasonry>
   );
}



