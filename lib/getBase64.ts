import { getPlaiceholder } from "plaiceholder"
import { HomepageProduct } from "./firebase"

async function getBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl)

    if (!res.ok) {
      throw new Error("Failed to fetch image - " + imageUrl)
    }

    const buffer = await res.arrayBuffer()
    const { base64 } = await getPlaiceholder(Buffer.from(buffer))

    return base64
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.stack)
    } else {
      console.log(err)
    }
  }
}

export async function addBlurredDataToProducts(
  images: HomepageProduct[]
): Promise<HomepageProduct[]> {
  const base64Promises = images.map((image) => getBase64(image.src))
  const base64Results = await Promise.all(base64Promises)
  const imagesWithBlur: HomepageProduct[] = images.map((image, i) => {
    image.blurredDataUrl = base64Results[i] ?? ""
    return image
  })

  return imagesWithBlur
}

export async function getBlurredDataUrls(
  urls: string[]
): Promise<(string | undefined)[]> {
  const base64Promises = urls.map((url) => getBase64(url))
  const base64Results = await Promise.all(base64Promises)
  return base64Results
}
