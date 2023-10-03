export const NAV_LINKS: NavLinkType[] = [
  { name: "home", href: "/", text: "Начало" },
  { name: "contact", href: "/#contact", text: "Контакти" },
  { name: "dashboard", href: "/dashboard", text: "Контролен Панел" },
];

export type NavLinkType = {
  href: string;
  name: string;
  text: string;
};

export const TERMS = {
  PAGE_TITLE: "Epoxy Crafts",
  CUTTING_BOARD: "дъска за рязане",
  TABLE: "маса",
};

export const FirebaseFiles = {
  FIRESTORE_DOCUMENTS_FOLDER: "products",
  STORAGE_IMAGES_FOLDER: "product-images",
};

export const ResponseStatuses = {
  SUCCESS: "success",
  ERROR: "error",
};
