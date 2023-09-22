// export type NavLinksType = {
//   [key in AllowedNavLinks]: {
//     text: string;
//     route: string;
//   };
// };

// export type AllowedNavLinks = "HOME" | "GALLERY";

export const NAV_LINKS: NavLinkType[] = [
  { name: "home", href: "/", text: "Начало" },
  { name: "gallery", href: "/gallery", text: "Галерия" },
  { name: "contact", href: "/contact", text: "Контакти" },
];

export type NavLinkType = {
  href: string;
  name: string;
  text: string;
};
