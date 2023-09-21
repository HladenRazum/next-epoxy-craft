import NavLink from "../atoms/NavLink";
import type { NavLinkType } from "../lib/constants";

type NavLinksListProps = {
  links: NavLinkType[];
};

export default function NavLinksList({ links }: NavLinksListProps) {
  if (Boolean(!links) || links.length === 0) {
    return (
      <p>
        <strong>No links found.</strong>
      </p>
    );
  }

  return (
    <ul className="hidden sm:flex gap-5">
      {links.map((link) => (
        <NavLink href={link.href} key={link.name}>
          {link.text}
        </NavLink>
      ))}
    </ul>
  );
}
