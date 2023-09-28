export const NAV_LINKS: NavLinkType[] = [
  { name: "home", href: "/", text: "Начало" },
  { name: "contact", href: "/#contact", text: "Контакти" },
];

export type NavLinkType = {
  href: string;
  name: string;
  text: string;
};
