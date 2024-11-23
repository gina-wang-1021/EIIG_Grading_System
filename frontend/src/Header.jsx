import logo from "./assets/EIIG_logo.png";
import "./Header.css";

function Header() {
  return (
    <div id="headerDiv">
      <img id="headerImg" src={logo} alt="EIIG logo" />
    </div>
  );
}

export default Header;
