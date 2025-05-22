import React from 'react';
import { useParams } from 'react-router-dom';
import articles from '../data/articles';

const ArticlePage = () => {
  const { id } = useParams();
  const article = articles.find(article => article.id === Number(id));


  if (!article) {
    return <h2>Article not found.</h2>;
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </div>
  );
};

export default ArticlePage;
