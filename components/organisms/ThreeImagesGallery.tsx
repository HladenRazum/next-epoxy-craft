import Image from "next/image";

export default function ThreeImagesGallery() {
  return (
    <section className="bg-neutral-800 py-3 ">
      <div className="wrapper grid  md:grid-cols-3 md:h-[460px] gap-2">
        <div className="w-full h-[380px] md:h-full relative">
          <Image
            src="/assets/bg-images/bg-1.jfif"
            alt="1"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full h-[380px] md:h-full relative">
          <Image
            src="/assets/bg-images/bg-2.jpg"
            alt="2"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full h-[380px] md:h-full relative">
          <Image
            src="/assets/bg-images/bg-3.jpg"
            alt="3"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
