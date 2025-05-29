import { useParams, Link } from 'react-router-dom';
import { sampleArticles } from '../data/sampleData';
import { useState } from 'react';
import './ArticleDetail.css'; // Create this for styling

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = sampleArticles.find(a => a.slug === slug);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(article?.content || "");

  if (!article) return <p>Article not found.</p>;

  return (
    <div className="article-detail-container">
      <h1 className="article-title">{article.title}</h1>
      <p className="article-meta">Last updated: {article.lastEdited}</p>
      <div className="article-tags">
        {article.categories.map((cat, idx) => (
          <span key={idx} className="tag">{cat}</span>
        ))}
      </div>

      {isEditing ? (
        <textarea
          className="article-editor"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          rows={10}
        />
      ) : (
        <p className="article-body">{editedContent}</p>
      )}

      <div className="article-actions">
        <button onClick={() => setIsEditing(!isEditing)} className="edit-button">
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        {isEditing && (
          <button onClick={() => {
            // Here you’d typically send an update request to backend
            setIsEditing(false);
            alert("Changes saved locally!");
          }} className="save-button">
            Save
          </button>
        )}
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </div>
  );
}
