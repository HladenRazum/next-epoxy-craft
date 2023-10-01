import GallerySection from "@/components/organisms/GallerySection";
import IntroSection from "@/components/organisms/IntroSection";
import { Suspense } from "react";
import Loading from "./loading";
import ThreeImagesGallery from "@/components/organisms/ThreeImagesGallery";

export default function Home() {
  return (
    <>
      <IntroSection />
      <ThreeImagesGallery />
      <Suspense fallback={<Loading />}>
        <GallerySection />
      </Suspense>
    </>
  );
}
