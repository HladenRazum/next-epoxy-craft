import React from "react";
import Gallery from "./components/Gallery";
import { getAllProductIds } from "@/lib/firebase";
import InvalidAddress from "@/components/atoms/InvalidAddress";

export default async function ProductPage({ params }: { params: { id: string; }; }) {
  const { id } = params;
  const productIds = await getAllProductIds();

  if (!productIds.includes(id)) {
    return <InvalidAddress />;
  }

  return (
    <div>
      <h1>Product Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
        cupiditate doloribus cum voluptas possimus explicabo ea. Voluptatum
        nihil veritatis sed repellat consectetur libero maiores deleniti minima
        vitae. Tempore itaque blanditiis minus culpa dolor dolorem, obcaecati
        amet enim, minima, quibusdam officia. z
      </p>
      <Gallery />
    </div>
  );
}


export async function generateStaticParams() {
  const productIds = await getAllProductIds();
  return productIds;
}