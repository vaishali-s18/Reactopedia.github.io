import { Link } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-cyan-400 shadow py-4">
      <div className="container mx-auto flex items-center px-4">
        <Link to="/" className="flex items-center">
          <FaReact className="text-4xl text-white mr-3 animate-spin-slow" />
          <div>
            <h1 className="text-2xl font-bold text-white">Reactopedia</h1>
            <p className="text-xs text-blue-100">The React Developer's Encyclopedia</p>
          </div>
        </Link>
        <nav className="ml-auto flex space-x-4">
          <Link to="/docs" className="text-white hover:text-blue-100 font-medium">Docs</Link>
          <Link to="/tutorials" className="text-white hover:text-blue-100 font-medium">Tutorials</Link>
          <Link to="/hooks" className="text-white hover:text-blue-100 font-medium">Hooks</Link>
        </nav>
      </div>
    </header>
  );
}