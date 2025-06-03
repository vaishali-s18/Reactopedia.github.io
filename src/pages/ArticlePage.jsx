import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default function ArticlePage({ articles }) {
  const { slug, id } = useParams();

  // Debugging
  console.log("slug:", slug);
  console.log("id:", id);
  console.log("articles:", articles);

  let article;
  if (slug) {
    article = articles.find(a => a.slug === slug);
  } else if (id) {
    article = articles.find(a => String(a.id) === String(id));
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 mt-6 max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <Link to="/" className="text-blue-600 hover:underline flex items-center">
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

  // Limit content to 200 words
  const contentWords = article.content.split(' ');
  const limitedContent =
    contentWords.length > 200
      ? contentWords.slice(0, 200).join(' ') + '...'
      : article.content;

  return (
    <div className="container mx-auto px-4 mt-6 max-w-4xl">
      <Link to="/" className="text-blue-600 hover:underline flex items-center mb-4">
        <FaArrowLeft className="mr-2" /> Back to Home
      </Link>

      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold">{article.title}</h1>
      </div>

      <p className="text-gray-500 mb-4">Last Edited: {article.lastEdited}</p>

      <div className="mb-4">
        {article.categories.map(cat => (
          <span key={cat} className="mr-2 px-3 py-1 bg-gray-200 rounded-full text-sm">
            {cat}
          </span>
        ))}
      </div>

      <p className="text-lg">{limitedContent}</p>
    </div>
  );
}