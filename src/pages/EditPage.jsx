import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sampleArticles } from '../data/sampleData';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

export default function EditPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find the article based on slug
  const articleToEdit = sampleArticles.find(a => a.slug === slug);

  // Local state for form inputs
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState('');
  const [lastEdited, setLastEdited] = useState('');

  // Load article data into form state when component mounts or article changes
  useEffect(() => {
    if (articleToEdit) {
      setTitle(articleToEdit.title);
      setContent(articleToEdit.content);
      setCategories(articleToEdit.categories.join(', ')); // join array to comma-separated string for input
      setLastEdited(articleToEdit.lastEdited);
    }
  }, [articleToEdit]);

  // Handle form submission
  const handleSave = (e) => {
    e.preventDefault();

    // Prepare updated article object
    const updatedArticle = {
      ...articleToEdit,
      title,
      content,
      categories: categories.split(',').map(cat => cat.trim()), // convert string back to array
      lastEdited: new Date().toISOString().split('T')[0] // current date YYYY-MM-DD
    };

    // TODO: Save the updated article back to your app's state or localStorage
    // For now, just log it to confirm:
    console.log('Updated article:', updatedArticle);

    // Redirect back to article detail page
    navigate(`/article/${slug}`);
  };

  if (!articleToEdit) {
    return (
      <div className="container mx-auto px-4 mt-6 max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <Link to="/" className="text-blue-600 hover:underline flex items-center">
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-6 max-w-4xl">
      <Link to={`/article/${slug}`} className="text-blue-600 hover:underline flex items-center mb-4">
        <FaArrowLeft className="mr-2" /> Back to Article
      </Link>

      <h1 className="text-3xl font-bold mb-6">Edit Article</h1>

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1" htmlFor="title">Title</label>
          <input
            id="title"
            className="w-full border px-3 py-2 rounded"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="content">Content</label>
          <textarea
            id="content"
            className="w-full border px-3 py-2 rounded h-40"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="categories">Categories (comma separated)</label>
          <input
            id="categories"
            className="w-full border px-3 py-2 rounded"
            type="text"
            value={categories}
            onChange={e => setCategories(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          <FaSave className="mr-2" /> Save Changes
        </button>
      </form>
    </div>
  );
}
