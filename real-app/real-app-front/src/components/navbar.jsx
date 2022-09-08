import "./Background.css";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import Logo from "../img/logo.jpg";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav
      className="navbar navbar-expand-sm navbar-light bg-dark"
      aria-label="Third navbar example"
    >
      <div className="container mx-3">
        <Link to="/" className="navbar-brand">
          <img className="logo" src={Logo} alt="Logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <NavLink className="nav-link active" to="about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              {user?.biz && (
                <NavLink to="my-cards" className="nav-link">
                  My Cards
                </NavLink>
              )}
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
            {user ? (
              <li className="nav-item">
                <NavLink to="signout" className="nav-link">
                  Sign Out
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="signIn" className="nav-link">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="signUp" className="nav-link">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="signUpBiz" className="nav-link">
                    Sign Up Your Business
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
