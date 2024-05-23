import { z } from "zod"

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
  // dimensions: z.object({
  //   width: z.number().min(1),
  //   height: z.number().min(1),
  //   thickness: z.number().min(1),
  //   heightFromFloor: z.number().min(1),
  // }),
})

export type Product = z.infer<typeof addProductFormSchema>
export type Materials = z.infer<typeof addProductFormSchema.shape.materials>

export const addProductFormDefaultValues: Product = {
  name: "",
  type: "table",
  materials: {
    wood: [],
    resin: [],
  },
}
