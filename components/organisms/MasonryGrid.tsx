"use client";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type Props = {
  children: React.ReactNode;
  gutter?: string;
};

export default function MasonryGrid({ children, gutter = "5px" }: Props) {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        300: 1,
        550: 2,
        900: 3,
      }}
    >
      <Masonry gutter={gutter}>{children}</Masonry>
    </ResponsiveMasonry>
  );
}
