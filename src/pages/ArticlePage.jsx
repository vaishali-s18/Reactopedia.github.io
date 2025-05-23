import { useParams } from 'react-router-dom';
import { sampleArticles } from '../data/sampleData';
import { Link } from 'react-router-dom';

export default function ArticlePage() {
  const { id } = useParams();
  const article = sampleArticles.find(a => a.id === parseInt(id));

  if (!article) return <div className="container mx-auto mt-8">Article not found</div>;

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <div className="prose max-w-none">
          {article.content.split('\n\n').map((section, i) => (
            <div key={i} className="mb-4">
              {section.startsWith('## ') ? (
                <h2 className="text-xl font-semibold mb-2">{section.substring(3)}</h2>
              ) : (
                <p>{section}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-4 border-t">
          <h3 className="font-bold mb-2">Categories:</h3>
          <div className="flex flex-wrap gap-2">
            {article.categories?.map(category => (
              <Link 
                key={category} 
                to={`/category/${category.toLowerCase()}`}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              >
                {category}
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Last edited on {article.lastEdited}
          </p>
        </div>
      </div>
    </div>
  );
}