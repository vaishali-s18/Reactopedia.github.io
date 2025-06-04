import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/userContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FaReact, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className={`navbar ${isDarkMode ? "dark" : "light"}`}>
      <div className="navbar-container">
        <div className="navbar-logo-area">
          <FaReact className="navbar-logo-icon" />
          <h1 className="navbar-logo">Reactopedia</h1>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-links active" : "nav-links"}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/tutorials" className={({ isActive }) => isActive ? "nav-links active" : "nav-links"}>
              Tutorials
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-links active" : "nav-links"}>
              About
            </NavLink>
          </li>
        </ul>
        <div className="navbar-actions">
          <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle theme">
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
          {user && (
            <>
              <span className="navbar-user">
                <FaUserCircle className="user-avatar" />
                <span className="user-email">
                  {user.email.split("@")[0]}
                </span>
              </span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;