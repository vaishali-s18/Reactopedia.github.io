import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar ${isDarkMode ? "dark" : "light"}`}>
      <div className="navbar-container">
        <h1 className="navbar-logo">Reactopedia</h1>
        
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

        <button onClick={toggleTheme} className="theme-toggle-btn">
          {isDarkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
