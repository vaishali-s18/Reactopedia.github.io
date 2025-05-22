import { Link } from 'react-router-dom';
import { FaWikipediaW } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="bg-blue shadow py-4">
      <div className="container mx-auto flex items-center">
        <Link to="/" className="flex items-center">
          <FaWikipediaW className="text-4xl text-gray-700 mr-2" />
          <h1 className="text-2xl font-bold">Reactopedia</h1>
        </Link>
      </div>
    </header>
  );
}