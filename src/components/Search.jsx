import { useState, useEffect, useRef, useMemo } from 'react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';

export default function Search({ articles }) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef();
  const timeoutRef = useRef();

  // Debounce implementation
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [query]);

  const fuse = useMemo(() => new Fuse(articles, {
    keys: ['title', 'content'],
    threshold: 0.4,
  }), [articles]);

  const results = useMemo(() => 
    debouncedQuery ? fuse.search(debouncedQuery).map(r => r.item) : []
  , [debouncedQuery, fuse]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (article) => {
    navigate(`/article/${article.id}`);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Search Reactopedia..."
        className="w-full p-3 border rounded-lg"
      />
      
      {isOpen && debouncedQuery && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          {results.length > 0 ? (
            results.slice(0, 5).map(article => (
              <div 
                key={article.id}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(article)}
              >
                <h3 className="font-bold">{article.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {article.content.substring(0, 150)}...
                </p>
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500">
              No results found for "{debouncedQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}