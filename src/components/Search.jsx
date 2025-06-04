import { useState, useEffect, useRef, useMemo } from 'react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';

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
    navigate(`/article/${article.slug}`);
    setQuery('');
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative search-bar" ref={searchRef}>
      <FaSearch className="search-icon" />
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Search Reactopedia..."
        className="search-input"
        style={{ fontFamily: "'Playfair Display', serif" }}
        aria-label="Search Reactopedia"
      />
      {query && (
        <button className="clear-btn" onClick={handleClear} aria-label="Clear search">
          <FaTimes />
        </button>
      )}
      {isOpen && debouncedQuery && (
        <div className="search-dropdown">
          {results.length > 0 ? (
            results.slice(0, 5).map(article => (
              <div 
                key={article.id}
                className="search-result"
                onClick={() => handleSelect(article)}
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && handleSelect(article)}
              >
                <h3 className="result-title">{article.title}</h3>
                <p className="result-snippet">
                  {article.content.substring(0, 120)}...
                </p>
              </div>
            ))
          ) : (
            <div className="search-no-results">
              No results found for "<b>{debouncedQuery}</b>"
            </div>
          )}
        </div>
      )}
    </div>
  );
}