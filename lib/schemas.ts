import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_MEASURMENT_ID: z.string().optional(),
});

export const validatedEnvSchema = envSchema.parse(process.env);

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
});

export const addProductFormSchema = z.object({
  name: z.string().trim().min(1, "Полето е задължително"),
  type: z.enum(["table", "cutting-board", "table-top"], {
    errorMap: () => {
      return { message: "Моля изберете валиден тип" };
    },
  }), //TODO: inherit values from the type
});
