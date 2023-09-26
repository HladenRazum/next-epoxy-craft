"use client";

import MasonryGrid from "./MasonryGrid";

export default function GallerySection() {

  return (
    <section className="wrapper py-20">
      <h2 className="text-4xl mb-5">Галерия</h2>
      <MasonryGrid items={IMAGES} />
      <button>Get more items</button>
    </section>
  );
}


const IMAGES = [
  {
    id: 1,
    src: "/assets/product-images/1.jpg",
    alt: "alt 1",
  },
  {
    id: 2,
    src: "/assets/product-images/2.jpeg",
    alt: "alt 2",
  },
  {
    id: 3,
    src: "/assets/product-images/3.jpg",
    alt: "alt 3",
  },
  {
    id: 4,
    src: "/assets/product-images/4.jpeg",
    alt: "alt 4",
  },
  {
    id: 5,
    src: "/assets/product-images/5.jpeg",
    alt: "alt 5",
  },
];