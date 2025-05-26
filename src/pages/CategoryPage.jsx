import { useParams } from 'react-router-dom';
import { sampleArticles } from '../data/sampleData';
import { FaReact } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CategoryPage() {
  const { name } = useParams();
  const filtered = sampleArticles.filter(article => 
    article.categories.includes(name)
  );

  return (
    <div className="container mx-auto px-4 mt-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">
        Articles in: <span className="text-blue-600">{name}</span>
      </h1>

      {filtered.length === 0 ? (
        <p>No articles found under this category.</p>
      ) : (
        <div className="grid gap-4">
          {filtered.map(article => (
            <Link to={`/article/${article.slug}`} key={article.id}>
              <div className="p-4 border rounded-lg hover:shadow-md transition">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FaReact className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{article.title}</h3>
                    <p className="text-gray-600 mt-1 line-clamp-2">
                      {article.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Last edited: {article.lastEdited}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
