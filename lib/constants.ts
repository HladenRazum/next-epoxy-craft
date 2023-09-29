export const NAV_LINKS: NavLinkType[] = [
   { name: "home", href: "/", text: "Начало" },
   { name: "contact", href: "/#contact", text: "Контакти" },
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
