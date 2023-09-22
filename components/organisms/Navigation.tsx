"use client";

import { useState } from "react";
import Hamburger from "../atoms/Hamburger";
import NavLinksList from "../molecules/NavLinksList";
import MobileNavLinksList from "../molecules/MobileNavLinksList";
import { NAV_LINKS } from "../../lib/constants";

export default function Navigation() {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  return (
    <nav className="flex content-center justify-between">
      <span>Logo</span>
      <NavLinksList links={NAV_LINKS} />
      <MobileNavLinksList isVisible={isMobileNavVisible} links={NAV_LINKS} />
      <Hamburger />
    </nav>
  );
}
