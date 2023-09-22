import Link from "next/link";
import { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  onClick?: () => void;
};

export default function NavLink({ href, children, onClick }: NavLinkProps) {
  return (
    <Link className="text-primary" href={href} onClick={onClick}>
      {children}
    </Link>
  );
}
