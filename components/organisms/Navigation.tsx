"use client";

import { useState } from "react";
import Hamburger from "../atoms/Hamburger";
import NavLinksList from "../molecules/NavLinksList";
import MobileNavLinksList from "../molecules/MobileNavLinksList";
import { NAV_LINKS } from "../../lib/constants";
import PhoneNumberLink from "../atoms/PhoneNumberLink";
import Logo from "../atoms/Logo";

export default function Navigation() {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  return (
    <nav className="flex justify-between items-center sm:grid grid-cols-3 py-5">
      <Logo />
      <PhoneNumberLink />
      <NavLinksList links={NAV_LINKS} />
      <MobileNavLinksList isVisible={isMobileNavVisible} links={NAV_LINKS} />
      <Hamburger />
    </nav>
  );
}
