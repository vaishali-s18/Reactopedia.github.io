 import { useParams } from 'react-router-dom';
import { sampleArticles } from '../data/sampleData';

export default function ArticlePage() {
  const { id } = useParams();
  const article = sampleArticles.find(a => a.id === parseInt(id));

  if (!article) return <div>Article not found</div>;

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <div className="prose max-w-none">
          {article.content.split('\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}