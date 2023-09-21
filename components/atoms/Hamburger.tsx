import { MouseEvent } from "react";

type HamburgerProps = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function Hamburger({ onClick }: HamburgerProps) {
  return (
    <button
      onClick={onClick}
      className="flex p-1 flex-col justify-around w-7 h-7 md:hidden"
    >
      <span className="w-full bg-primary h-[2px]"></span>
      <span className="w-full bg-primary h-[2px]"></span>
      <span className="w-full bg-primary h-[2px]"></span>
    </button>
  );
}
