import { useParams, Link, useNavigate } from 'react-router-dom';

import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import { useState } from 'react';

export default function ArticlePage({ articles }) {
  const { slug } = useParams();
  const navigate = useNavigate();
const article = articles.find(a => a.slug === slug);
  const [showConfirm, setShowConfirm] = useState(false);

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

  // Handle Edit button click
  const handleEditClick = () => {
    setShowConfirm(true);
  };

  // Confirm navigation to edit page
  const confirmEdit = () => {
    setShowConfirm(false);
    navigate(`/edit/${article.slug}`);
  };

  // Cancel navigation
  const cancelEdit = () => {
    setShowConfirm(false);
  };

  return (
    <div className="container mx-auto px-4 mt-6 max-w-4xl">
      <Link to="/" className="text-blue-600 hover:underline flex items-center mb-4">
        <FaArrowLeft className="mr-2" /> Back to Home
      </Link>

      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <button
          onClick={handleEditClick}
          className="flex items-center bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-3 py-1 rounded transition"
        >
          <FaEdit className="mr-1" /> Edit Article
        </button>
      </div>

      <p className="text-gray-500 mb-4">Last Edited: {article.lastEdited}</p>

      <div className="mb-4">
        {article.categories.map(cat => (
          <span key={cat} className="mr-2 px-3 py-1 bg-gray-200 rounded-full text-sm">
            {cat}
          </span>
        ))}
      </div>

      <p className="text-lg">{article.content}</p>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm text-center">
            <p className="mb-4 text-lg">Are you sure you want to edit this article?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmEdit}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Yes, Edit
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
