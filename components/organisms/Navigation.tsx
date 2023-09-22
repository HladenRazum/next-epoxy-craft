import NavLinksList from "../molecules/NavLinksList";
import MobileNavLinksList from "../molecules/MobileNavLinksList";
import { NAV_LINKS } from "../../lib/constants";
import PhoneNumberLink from "../atoms/PhoneNumberLink";
import Logo from "../atoms/Logo";

export default function Navigation() {
  return (
    <div className="bb">
      <nav className="wrapper flex justify-between items-center sm:grid grid-cols-3 py-5">
        <Logo />
        <PhoneNumberLink />
        <NavLinksList links={NAV_LINKS} />
        <MobileNavLinksList links={NAV_LINKS} />
      </nav>
    </div>
  );
}
