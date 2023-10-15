import PhoneNumberLink from "../atoms/PhoneNumberLink";
import Logo from "../atoms/Logo";

export default function Navigation() {
  return (
    <div className="bb">
      <nav className="wrapper flex justify-between items-center py-5">
        <Logo />
        <PhoneNumberLink />
      </nav>
    </div>
  );
}
