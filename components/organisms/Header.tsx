import { NAV_LINKS } from "../lib/constants";
import NavLinksList from "../molecules/NavLinksList";

export default function Header() {
  return (
    <header className="flex content-center justify-between">
      <span>Logo</span>
      <NavLinksList links={NAV_LINKS} />
    </header>
  );
}
