import Head from "next/head";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Epoxy Crafts | Gallery",
  description: "A collection of the products that I've done",
};

export default function GalleryPage() {
  return (
    <>
      <Head>
        <title>Epoxy Crafts | Gallery</title>
      </Head>
      <h1>Gallery Page here</h1>
    </>
  );
}
