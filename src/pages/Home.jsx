import { useState, useEffect, useContext } from 'react';
import Search from '../components/Search';
import { sampleArticles } from '../data/sampleData';
import { FaReact, FaLightbulb, FaBookOpen, FaArrowRight } from 'react-icons/fa';
import CodeSnippet from "../components/CodeSnippet.jsx";

import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/userContext';
import './Home.css';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const { isDarkMode } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  // Filter articles based on active tab (case-insensitive)
  const filteredArticles = activeTab === 'all'
    ? sampleArticles
    : sampleArticles.filter(article =>
        article.categories?.some(
          cat => cat.toLowerCase() === activeTab.toLowerCase()
        )
      );

  // Mock API fetch simulation
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className={`home-container${isDarkMode ? ' dark' : ''}`}>
      {/* Hero Section */}
      <section className="hero animated-hero">
        <div className="hero-content">
          <div className="flex items-center mb-4">
            <FaReact className="hero-icon spin" />
            <div>
              <h1>
                Welcome{user ? `, ${user.email.split('@')[0]}` : ""} to Reactopedia
              </h1>
              <p className="hero-subtitle">The React Developer's Encyclopedia</p>
            </div>
          </div>
          <Search articles={sampleArticles} />
          <Link to="/tutorials" className="cta-btn">
            Start Learning <FaArrowRight style={{ marginLeft: 8 }} />
          </Link>
        </div>
      </section>

      {/* Featured Articles */}
      <div className="content-section">
        <div className="section-header">
          <h2 className="section-title">
            <FaBookOpen className="mr-2" />
            Featured Topics
          </h2>
          <div className="tab-buttons">
            <button
              onClick={() => setActiveTab('all')}
              className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('Hooks')}
              className={`tab-button ${activeTab === 'Hooks' ? 'active' : ''}`}
            >
              Hooks
            </button>
            <button
              onClick={() => setActiveTab('Performance')}
              className={`tab-button ${activeTab === 'Performance' ? 'active' : ''}`}
            >
              Performance
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          <div className="articles-grid fade-in">
            {filteredArticles.length === 0 ? (
              <div className="no-articles">No articles found.</div>
            ) : (
              filteredArticles.map(article => (
                <Link 
                  to={`/article/${article.slug}`} 
                  key={article.id} 
                  className="article-card"
                >
                  <div className="article-content">
                    <div className="article-icon">
                      <FaReact />
                    </div>
                    <div>
                      <h3>{article.title}</h3>
                      <p className="article-excerpt">{article.content}</p>
                      <div className="article-meta">
                        {article.categories?.map(cat => (
                          <span key={cat} className="category-tag">
                            {cat}
                          </span>
                        ))}
                        <span className="last-updated">
                          Updated {article.lastEdited}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="content-section quick-links-section">
        <h3>Quick Links</h3>
        <ul className="quick-links-list">
          <li><Link to="/category/hooks" className="quick-link">React Hooks</Link></li>
          <li><Link to="/category/state" className="quick-link">State Management</Link></li>
          <li><Link to="/category/router" className="quick-link">React Router</Link></li>
        </ul>
      </div>

      {/* React Tip with Code Example */}
      <div className="content-section tip-section pop">
        <div className="section-header">
          <FaLightbulb className="tip-icon" />
          <h2 className="section-title">React Tip of the Day</h2>
        </div>
        <p className="tip-content">
          The virtual DOM allows React to optimize rendering by comparing the new virtual DOM
          with a pre-update version (diffing) and then making only the necessary updates to
          the real DOM.
        </p>
        <CodeSnippet
          language="jsx"
          code={`function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`}
        />
      </div>
    </div>
  );
}