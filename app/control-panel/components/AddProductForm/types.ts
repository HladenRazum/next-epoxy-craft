import { Dimensions } from "@/lib/schemas"
import { EpoxyProductType } from "@/types/product"

export type AddProductFormFields = {
  name: string
  type: EpoxyProductType
  materials: {
    wood: string[]
    resin: string[]
  }
  mainImage: File[]
  images: File[]
  dimensions: Dimensions
}
