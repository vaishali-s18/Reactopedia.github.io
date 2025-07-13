import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../firebase'; // <-- import Firestore instance
import { doc, updateDoc } from 'firebase/firestore';
import { sampleArticles } from '../data/sampleData';
import './ArticleDetail.css';

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = sampleArticles.find(a => a.slug === slug);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(article?.content || "");

  if (!article) return <p>Article not found.</p>;

  // Save to Firestore
  const handleSave = async () => {
    try {
      const articleRef = doc(db, "articles", article.id); // assumes article.id matches Firestore doc id
      await updateDoc(articleRef, { content: editedContent });
      setIsEditing(false);
      alert("Changes saved to Firestore!");
    } catch (error) {
      alert("Failed to save changes: " + error.message);
    }
  };

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
        <div className="article-body">
          <div dangerouslySetInnerHTML={{ __html: editedContent }} />
        </div>
      )}

      <div className="article-actions">
        <button onClick={() => setIsEditing(!isEditing)} className="edit-button">
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        {isEditing && (
          <button onClick={handleSave} className="save-button">
            Save
          </button>
        )}
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </div>
  );
}