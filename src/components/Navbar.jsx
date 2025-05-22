import { Link } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <nav className="bg-white dark:bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-2xl font-bold">Reactopedia</Link>
        <button onClick={toggleTheme}>
          {isDark ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </nav>
  );
  
}