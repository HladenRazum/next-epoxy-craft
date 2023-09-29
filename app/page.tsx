import GallerySection from "@/components/organisms/GallerySection";
import IntroSection from "@/components/organisms/IntroSection";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <>
      <IntroSection />
      <Suspense fallback={<Loading />}>
        <GallerySection />
      </Suspense>
    </>
  );
}
