import Logo from "../atoms/Logo";

export default function Footer() {
  return (
    <footer className="bt py-5">
      <div className="wrapper">
        <Logo />
        <ul id="contact">
          <li>
            Телефон: <a href="mobile:0888 888888">0888 888888</a>
          </li>
          <li>
            E-mail: <a href="mailto:example@mail.com">example@mail.com</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
