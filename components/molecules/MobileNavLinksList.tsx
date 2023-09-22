"use client";

import { useState } from "react";
import type { NavLinkType } from "../../lib/constants";
import HamburgerButton from "../atoms/HamburgerButton";
import NavLink from "../atoms/NavLink";

type MobileNavLinksListProps = {
  links: NavLinkType[];
};

export default function MobileNavLinksList({ links }: MobileNavLinksListProps) {
  const [isVisible, setIsVisible] = useState(false);

  const visibleClasses =
    "flex bg-paper flex-col absolute left-0 right-0 top-[80px] bottom-0 text-2xl items-center pt-[140px]";

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div>
      <ul className={isVisible ? visibleClasses : "hidden"}>
        {links.map((link) => (
          <li key={link.name} className="mb-10">
            <NavLink onClick={toggleMenu} href={link.href}>
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
      <HamburgerButton onClick={toggleMenu} />
    </div>
  );
}
