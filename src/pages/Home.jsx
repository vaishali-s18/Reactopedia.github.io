import { useState, useEffect } from 'react';
import Search from '../components/Search';
import { sampleArticles } from '../data/sampleData';
import { FaReact, FaLightbulb, FaBookOpen } from 'react-icons/fa';
import CodeSnippet from '../components/CodeSnippet';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

export default function Home() {
  const [featuredArticles, setFeaturedArticles] = useState(sampleArticles.slice(0, 3));
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Filter articles based on active tab
  const filteredArticles = activeTab === 'all'
    ? featuredArticles
    : featuredArticles.filter(article =>
      article.categories?.includes(activeTab)
    );

  // Mock API fetch simulation
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section - Now using CSS classes */}
      <section className="hero">
        <div className="hero-content">
          <div className="flex items-center mb-4">
            <FaReact className="hero-icon" />
            <div>
              <h1>Reactopedia</h1>
              <p className="hero-subtitle">The React Developer's Encyclopedia</p>
            </div>
          </div>
          <Search articles={sampleArticles} />
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
          <div className="articles-grid">
            {filteredArticles.map(article => (
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
            ))}
          </div>
        )}
      </div>

      {/* React Tip with Code Example */}
      <div className="content-section tip-section">
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