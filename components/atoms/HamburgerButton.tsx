import { MouseEvent } from "react";

type HamburgerButtonProps = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function HamburgerButton({ onClick }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex p-1 flex-col justify-around w-8 h-8 sm:hidden"
    >
      <span className="w-full bg-primary h-[3px] rounded"></span>
      <span className="w-full bg-primary h-[3px] rounded"></span>
      <span className="w-full bg-primary h-[3px] rounded"></span>
    </button>
  );
}
