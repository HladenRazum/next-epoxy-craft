// import getAllImages from "@/lib/firebase";
import MasonryGrid from "./MasonryGrid";
import Image from "next/image";
import Link from "next/link";

export default async function GallerySection() {
  // const data = await getAllImages();

  // const domain = "https://firebasestorage.googleapis.com/v0/b/";
  // const bucket = data.bucket;
  // const prefix = domain + bucket + "/o/";


  // const newImages = data.items.map((image, i) => {
  //   return {
  //     id: image.name + "_" + i.toString(),
  //     src: prefix + 'images%2F' + image.name + '?alt=media',
  //     alt: image.name
  //   };
  // });


  return (
    <section className="wrapper py-20">
      <h2 className="text-4xl mb-5">Галерия</h2>
      <MasonryGrid>
        {IMAGES.map((image) => <Link href="#a-linkt-to-corresponding-page" key={image.id}><Image src={image.src} alt={image.alt} width={600} height={400} /></Link>)}
      </MasonryGrid>
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