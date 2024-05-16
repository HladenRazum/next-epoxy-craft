import GallerySection from "@/components/organisms/GallerySection"

export const revalidate = 0

export default function Home() {
  return (
    <>
      <div className="h-screen flex items-center flex-col justify-center bg-paper-secondary">
        <h1>This is a test section</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          cumque enim ea sit molestiae reprehenderit sequi provident animi aut
          impedit!
        </p>
      </div>
      <div className="bg-paper">
        <GallerySection />
      </div>
    </>
  )
}
