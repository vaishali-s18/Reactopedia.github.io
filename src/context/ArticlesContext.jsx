// src/context/ArticlesContext.jsx
import { createContext, useContext, useState } from 'react';

const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
 const [articles, setArticles] = useState([
  {
    id: 1,
    title: "React Hooks Guide",
    content: "Learn useState, useEffect, and more...",
    categories: ["Hooks", "Beginner"]
  },
  // Add more articles...
]);
  return (
    <ArticlesContext.Provider value={{ articles, setArticles }}>
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticles() {
  return useContext(ArticlesContext);
}
