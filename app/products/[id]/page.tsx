import Gallery from "./components/Gallery";
import { getAllProductIds, getProductById } from "@/lib/firebase";
import InvalidAddress from "@/components/molecules/InvalidAddress";
import { TERMS } from "@/lib/constants";
import ProductInfo from "./components/ProductInfo";

export default async function ProductPage({
  params,
}: {
  params: { id: string; };
}) {
  const { id } = params;
  const productIds = await getAllProductIds();

  if (!productIds.includes(id)) {
    return <InvalidAddress />;
  }

  const product = await getProductById(id);

  return (
    <div>
      <main className="wrapper flex flex-col md:grid grid-cols-5 py-20">
        <div className="col-span-3">
          <Gallery
            mainImageUrl={product.mainImageUrl}
            imagesUrls={product.imagesUrls}
            productId={id}
            productName={product.name}
          />
        </div>
        <aside className="col-span-2">
          <ProductInfo product={product} />
        </aside>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const productIds = await getAllProductIds();
  return productIds;
}

export async function generateMetadata({ params }: { params: { id: string; }; }) {
  const { id } = params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: `${TERMS.PAGE_TITLE} | Product not found`,
    };
  }

  let productType;

  switch (product.type) {
    case "cutting-board":
      productType = TERMS.CUTTING_BOARD;
      break;

    case "table":
    default:
      productType = TERMS.TABLE;
  }

  return {
    title: `${TERMS.PAGE_TITLE} |  ${product.name}`,
    content: `${productType} ${product.name}`,
  };
}
