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
      <h1 className="py-1 text-5xl font-extrabold bg-gradient-to-r bg-clip-text text-transparent  from-pink-500 to-violet-500">
        Gallery Page
      </h1>
    </>
  );
}
