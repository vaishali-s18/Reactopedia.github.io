import { useParams } from 'react-router-dom';
import { sampleArticles } from '../data/sampleData';

export default function ArticlePage() {
  const { slug } = useParams();
  const article = sampleArticles.find(article => article.slug === slug);

  if (!article) return <div className="p-6 text-center">Article not found.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">Last updated: {article.lastEdited}</p>
      <p className="text-gray-700 leading-relaxed">{article.content}</p>
    </div>
  );
}
