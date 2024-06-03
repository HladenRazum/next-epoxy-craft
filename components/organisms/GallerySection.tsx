import Image from "next/image"
import Link from "next/link"
import MasonryGrid from "./MasonryGrid"
import { getAllProducts } from "@/lib/firebase"
import { addBlurredDataToUrls } from "@/lib/getBase64"

export default async function GallerySection() {
  const products = await getAllProducts()
  const imagesWithBlur = await addBlurredDataToUrls(products)

  return (
    <section className="wrapper py-20">
      <h2 className="text-4xl mb-5">Галерия</h2>
      <MasonryGrid>
        {imagesWithBlur.map((p) => (
          <Link href={`/products/${p.id}`} key={p.id}>
            <Image
              src={p.src}
              alt={p.name}
              width={600}
              height={400}
              placeholder="blur"
              blurDataURL={p.blurredDataUrl}
            />
          </Link>
        ))}
      </MasonryGrid>
      <button>Get more items</button>
    </section>
  )
}
