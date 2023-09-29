import React from "react";
import Gallery from "./components/Gallery";
import { getAllProductIds, getProductById } from "@/lib/firebase";
import InvalidAddress from "@/components/atoms/InvalidAddress";
import { TERMS } from "@/lib/constants";

export default async function ProductPage({ params }: { params: { id: string; }; }) {
  const { id } = params;
  const productIds = await getAllProductIds();

  if (!productIds.includes(id)) {
    return <InvalidAddress />;
  }

  const product = await getProductById(id);

  return (
    <div>
      <h1 className="text-4xl mb-10">{product.name}</h1>
      <Gallery mainImageUrl={product.mainImageUrl} imagesUrls={product.imagesUrls} productId={id} productName={product.name} />
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
    content: `${productType} ${product.name}`
  };

}