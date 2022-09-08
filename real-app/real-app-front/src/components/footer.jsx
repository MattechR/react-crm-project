import "./Background.css";
import Logo from "../img/logo.jpg";

const Footer = () => {
  return (
    <footer>
      <p className="border-top pt-3 text-center">
        <span>
          Real
          <img className="logo" src={Logo} alt="Logo" />
          App
        </span>
        <span className="mx-1">&copy;</span>
        <span>{new Date().getFullYear()}</span>
      </p>
    </footer>
  );
};
export default Footer;
