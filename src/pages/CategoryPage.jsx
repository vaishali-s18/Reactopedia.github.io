import { useParams } from 'react-router-dom';
import { sampleArticles } from '../data/sampleData';

export default function CategoryPage() {
  const { category } = useParams();
  const articles = sampleArticles.filter(article => 
    article.categories?.some(cat => 
      cat.toLowerCase() === category.toLowerCase()
    )
  );

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Articles in category: {category}</h1>
        {articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map(article => (
              <div key={article.id} className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <p className="text-gray-600 mt-1">
                  {article.content.substring(0, 150)}...
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No articles found in this category.</p>
        )}
      </div>
    </div>
  );
}