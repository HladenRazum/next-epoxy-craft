import { z } from "zod"
import {
  ACCEPTED_IMAGE_TYPES,
  DIMENSIONS_DEFAULT_VALUES,
  DIMENSIONS_MIN_VALUES,
  MAX_FILE_SIZE_MB,
} from "./constants"

const envSchema = z.object({
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_MEASURMENT_ID: z.string().optional(),
})

export const validatedEnvSchema = envSchema.parse(process.env)

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Полето е задължително")
    .min(1, "Потребителското име трябва да бъде от поне 6 символа"),
  password: z
    .string()
    .trim()
    .min(1, "Полето е задължително")
    .min(1, "Паролате трябва да бъде от поне 6 символа"),
})

export const PRODUCT_TYPES = ["table", "cutting-board", "table-top"] as const

export const addProductFormSchema = z.object({
  name: z.string().trim().min(3, "Името трябва да бъде от поне 3 символа"),
  type: z.enum(PRODUCT_TYPES),
  materials: z.object({
    wood: z.array(z.string()).min(1, "Полето е задължително"),
    resin: z.array(z.string()).min(1, "Полето е задължително"),
  }),
  dimensions: z.object({
    width: z.coerce.number().min(DIMENSIONS_MIN_VALUES.width),
    length: z.coerce.number().min(DIMENSIONS_MIN_VALUES.length),
    thickness: z.coerce.number().min(DIMENSIONS_MIN_VALUES.thickness),
    heightFromFloor: z.coerce
      .number()
      .min(DIMENSIONS_MIN_VALUES.heightFromFloor),
  }),
  mainImage: z
    .any()
    .refine((filesList) => filesList?.length > 0, "Полето е задължително")
    .refine(
      (filesList) => filesList[0]?.size <= MAX_FILE_SIZE_MB * 1000 * 1000,
      `Размерът на снимката не трябва да надвишава ${MAX_FILE_SIZE_MB} MB`
    )
    .refine(
      (filesList) =>
        ACCEPTED_IMAGE_TYPES.includes(filesList[0]?.type.split("/")[1]),
      `Невалиден тип на изображението. Моля използвайте файлове с разширения - ${ACCEPTED_IMAGE_TYPES.join(
        " "
      )}`
    ),
  images: z
    .any()
    .refine(
      (filesList: FileList) =>
        Array.from(filesList).every(
          (file) => file?.size <= MAX_FILE_SIZE_MB * 1000 * 1000
        ),
      `Размерът на снимката не трябва да надвишава ${MAX_FILE_SIZE_MB} MB`
    )
    .refine(
      (filesList: FileList) =>
        Array.from(filesList).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type.split("/")[1])
        ),
      `Невалиден тип на изображението. Моля използвайте файлове с разширения - ${ACCEPTED_IMAGE_TYPES.join(
        " "
      )}`
    )
    .optional(),
})

export type Product = z.infer<typeof addProductFormSchema>

export const addProductFormDefaultValues: Product = {
  name: "",
  type: "table",
  materials: {
    wood: [],
    resin: [],
  },
  dimensions: {
    width: DIMENSIONS_DEFAULT_VALUES.width,
    length: DIMENSIONS_DEFAULT_VALUES.length,
    thickness: DIMENSIONS_DEFAULT_VALUES.thickness,
    heightFromFloor: DIMENSIONS_DEFAULT_VALUES.heightFromFloor,
  },
  mainImage: "",
  images: [],
}

export type Dimensions = z.infer<typeof addProductFormSchema.shape.dimensions>
