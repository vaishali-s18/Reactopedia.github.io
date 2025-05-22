import { useState } from 'react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';

export default function Search({ articles }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const fuse = new Fuse(articles, {
    keys: ['title', 'content'],
    threshold: 0.4
  });

  const results = query ? fuse.search(query).map(r => r.item) : [];

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Wikipedia..."
        className="w-full p-3 border rounded-lg"
      />
      {query && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          {results.slice(0, 5).map(article => (
            <div 
              key={article.id}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate(`/article/${article.id}`);
                setQuery('');
              }}
            >
              <h3 className="font-bold">{article.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {article.content.substring(0, 150)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}