import Hamburger from "../atoms/Hamburger";
import { NAV_LINKS } from "../../lib/constants";
import NavLinksList from "../molecules/NavLinksList";

export default function Navigation() {
  return (
    <nav className="flex content-center justify-between">
      <span>Logo</span>
      <NavLinksList links={NAV_LINKS} />
      <Hamburger />
    </nav>
  );
}
