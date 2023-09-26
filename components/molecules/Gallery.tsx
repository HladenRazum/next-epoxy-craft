import Image from "next/image";

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

export default function Gallery() {
  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
      {IMAGES.map(({ id, src, alt }) => (
        <Image width={600} height={800} key={id} src={src} alt={alt} />
      ))}
    </ul>
  );
}
