import { Product, addProductFormSchema } from "./schemas"

export const NAV_LINKS: NavLinkType[] = [
  { name: "home", href: "/", text: "Начало" },
  { name: "contact", href: "/#contact", text: "Контакти" },
]

export enum Routes {
  HOME = "/",
  CONTROL_PANEL = "/control-panel",
  LOGIN = "/auth/login",
  LOGOUT = "/auth/logout",
  API_LOGIN = "/api/auth/login",
  API_LOGOUT = "/api/auth/logout",
  API_ME = "/api/auth/me",
  FORBIDDEN = "/forbidden",
}

export type NavLinkType = {
  href: string
  name: string
  text: string
}

export const TERMS = {
  PAGE_TITLE: "Epoxy Crafts",
  CUTTING_BOARD: "дъска за рязане",
  TABLE: "маса",
}

export const FirebaseCollections = {
  FIRESTORE_DOCUMENTS: "products",
  STORAGE_IMAGES: "product-images",
  USERS: "users",
}

export const ResponseStatuses = {
  SUCCESS: "success",
  ERROR: "error",
}

export const JTW_MAX_AGE = 60 * 60 * 24 * 2 // 2 days
export const AUTH_COOKIE = "JWT_TOKEN"

export const DIMENSIONS_MIN_VALUES = {
  width: 1,
  length: 1,
  heightFromFloor: 1,
  thickness: 1,
}

export const DIMENSIONS_DEFAULT_VALUES = {
  width: 90,
  length: 120,
  thickness: 7,
  heightFromFloor: 90,
}

export const MAX_FILE_SIZE_MB = 5
export const ACCEPTED_IMAGE_TYPES = ["jpg", "jpeg", "png"]
