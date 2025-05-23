import { useState, useEffect } from 'react';
import Search from '../components/Search';
import { sampleArticles } from '../data/sampleData';
import { FaReact, FaLightbulb, FaBookOpen } from 'react-icons/fa';
import CodeSnippet from '../components/CodeSnippet';

export default function Home() {
  const [featuredArticles, setFeaturedArticles] = useState(sampleArticles.slice(0, 3));
  const [loading, setLoading] = useState(false); // Changed since we're using sample data
  const [activeTab, setActiveTab] = useState('all');

  // Filter articles based on active tab
  const filteredArticles = activeTab === 'all' 
    ? featuredArticles 
    : featuredArticles.filter(article => 
        article.categories?.includes(activeTab)
      );

  // Mock API fetch simulation (remove if using real API)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto mt-4 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg shadow mb-8 border border-blue-100">
          <div className="flex items-center mb-4">
            <FaReact className="text-4xl text-blue-500 mr-3 animate-spin-slow" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Reactopedia</h1>
              <p className="text-blue-600">The React Developer's Encyclopedia</p>
            </div>
          </div>
          <Search articles={sampleArticles} />
        </div>

        {/* Featured Articles */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <FaBookOpen className="mr-2 text-blue-500" />
              Featured Topics
            </h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-full text-sm ${activeTab === 'all' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveTab('Hooks')}
                className={`px-3 py-1 rounded-full text-sm ${activeTab === 'Hooks' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
              >
                Hooks
              </button>
              <button 
                onClick={() => setActiveTab('Performance')}
                className={`px-3 py-1 rounded-full text-sm ${activeTab === 'Performance' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
              >
                Performance
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredArticles.map(article => (
                <div key={article.id} className="group border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center">
                      <FaReact className="text-blue-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold group-hover:text-blue-600 transition">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mt-1 line-clamp-2">
                        {article.content}
                      </p>
                      <div className="flex items-center mt-3">
                        {article.categories?.map(cat => (
                          <span key={cat} className="mr-2 px-2 py-1 bg-gray-100 rounded-full text-xs">
                            {cat}
                          </span>
                        ))}
                        <span className="text-xs text-gray-500 ml-auto">
                          Updated {article.lastEdited}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* React Tip with Code Example */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <FaLightbulb className="text-2xl text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold">React Tip of the Day</h2>
          </div>
          <p className="text-gray-700 mb-4">
            The virtual DOM allows React to optimize rendering by comparing the new virtual DOM 
            with a pre-update version (diffing) and then making only the necessary updates to 
            the real DOM.
          </p>
          
          <CodeSnippet 
            language="jsx"
            code={`function Example() {
  const [count, setCount] = useState(0);

  // This effect runs after every render
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
    </div>
  );
}