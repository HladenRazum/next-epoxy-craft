import Image from "next/image"
import Link from "next/link"
import MasonryGrid from "./MasonryGrid"
import { getAllProducts } from "@/lib/firebase"

export default async function GallerySection() {
  const products = await getAllProducts()

  return (
    <section className="wrapper py-20">
      <h2 className="text-4xl mb-5">Галерия</h2>
      <MasonryGrid>
        {products.map((p) => (
          <Link href={`/products/${p.id}`} key={p.id}>
            <Image src={p.src} alt={p.name} width={600} height={400} />
          </Link>
        ))}
      </MasonryGrid>
      <button>Get more items</button>
    </section>
  )
}
