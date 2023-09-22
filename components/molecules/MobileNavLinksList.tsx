import type { NavLinkType } from "../../lib/constants";
import NavLink from "../atoms/NavLink";

type MobileNavLinksListProps = {
  isVisible: boolean;
  links: NavLinkType[];
};

export default function MobileNavLinksList({
  links,
  isVisible = false,
}: MobileNavLinksListProps) {
  return (
    <ul className={isVisible ? "flex" : "hidden"}>
      {links.map((link) => (
        <li key={link.name}>
          <NavLink href={link.href}>{link.text}</NavLink>
        </li>
      ))}
    </ul>
  );
}
