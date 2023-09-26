import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Epoxy Crafts | Gallery",
  description: "A collection of the products that I've done",
};

export default async function GalleryPage() {
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
