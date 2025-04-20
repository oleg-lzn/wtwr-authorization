import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "./styles/NavBar.css";
import { removeToken } from "../utils/token";
import { useLoggedIn } from "./LoggedInWrapper";

function NavBar() {
  const { setIsLoggedIn } = useLoggedIn();
  const navigate = useNavigate();

  const signOut = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Logo />
      </div>
      <ul className="navbar__nav">
        <li>
          <NavLink to="/ducks" className="navbar__link">
            Ducks
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-profile" className="navbar__link">
            My Profile
          </NavLink>
        </li>
        <li>
          <button className="navbar__link navbar__button" onClick={signOut}>
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
