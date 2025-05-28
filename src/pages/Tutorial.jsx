import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './Tutorial.css';

const tutorialsData = [
  {
    id: 1,
    title: "React Fundamentals",
    level: "beginner",
    duration: "30 min",
    content: "This tutorial covers the basics of React including components, JSX, and state management.",
    videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk"
  },
  {
    id: 2,
    title: "React Components 101",
    level: "beginner",
    duration: "25 min",
    content: "Learn how to build and compose React components effectively.",
    videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0"
  },
  {
    id: 3,
    title: "Advanced State Management",
    level: "advanced",
    duration: "2 hours",
    content: "Deep dive into advanced techniques with Context API, Redux, and custom hooks.",
    videoUrl: "https://www.youtube.com/embed/35lXWvCuM8o"
  },
  {
    id: 4,
    title: "React Hooks Deep Dive",
    level: "intermediate",
    duration: "1 hour",
    content: "Explore React Hooks in detail, including useEffect, useMemo, and useReducer.",
    videoUrl: "https://www.youtube.com/embed/f687hBjwFcM"
  },
  {
    id: 5,
    title: "Building a React App",
    level: "intermediate",
    duration: "1.5 hours",
    content: "Step-by-step guide to building a complete React application from scratch.",
    videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0"
  },
  {
    id: 6,
    title: "Testing React Applications",
    level: "expert",
    duration: "1 hour",
    content: "Learn how to write tests for your React components using Jest and React Testing Library.",
    videoUrl: "https://www.youtube.com/embed/7r4xVDI2vho"
  }
];

const Tutorial = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [activeTutorial, setActiveTutorial] = useState(null);
  const [progress, setProgress] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('tutorialProgress')) || {};
    setProgress(savedProgress);
  }, []);

  // Save progress to localStorage when updated
  useEffect(() => {
    localStorage.setItem('tutorialProgress', JSON.stringify(progress));
  }, [progress]);

  const handleContinue = (id) => {
    setActiveTutorial(activeTutorial === id ? null : id);
  };

  const markAsComplete = (id) => {
    setProgress({ ...progress, [id]: 100 });
  };

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handleLevelFilter = (e) => setLevelFilter(e.target.value);

  const filteredTutorials = tutorialsData.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchTerm) &&
    (levelFilter === 'all' || tutorial.level === levelFilter)
  );

  const themeStyles = {
    '--bg-color': isDarkMode ? '#111827' : '#ffffff',
    '--text-color': isDarkMode ? '#f3f4f6' : '#1f2937',
    '--card-bg': isDarkMode ? '#1f2937' : '#f9fafb',
    '--meta-color': isDarkMode ? '#9ca3af' : '#6b7280',
    '--border-color': isDarkMode ? '#374151' : '#e5e7eb',
    '--input-bg': isDarkMode ? '#1f2937' : '#ffffff',
    '--progress-bg': isDarkMode ? '#374151' : '#e5e7eb'
  };

  return (
    <div className="tutorial-container" style={themeStyles}>
      <h1 className="tutorial-header">Tutorials</h1>
      
      <div className="filter-bar">
        <input 
          type="text" 
          placeholder="Search tutorials..." 
          onChange={handleSearch}
        />
        <select onChange={handleLevelFilter}>
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>
      </div>

      <div className="tutorial-grid">
        {filteredTutorials.map(({ id, title, level, duration, content, videoUrl }) => (
          <div key={id} className="tutorial-card">
            <div className="tutorial-card-content">
              <h3 className="tutorial-title">{title}</h3>
              <span className={`tutorial-level level-${level}`}>{level}</span>
              <div className="tutorial-meta">
                <span>{duration}</span>
                <span>{progress[id] || 0}% complete</span>
              </div>
              <div className="progress-container">
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill progress-incomplete" 
                    style={{ width: `${progress[id] || 0}%` }}
                  ></div>
                </div>
              </div>
              <button 
                className="tutorial-button"
                onClick={() => handleContinue(id)}
              >
                {activeTutorial === id ? 'Hide Content' : 'Continue Learning'}
              </button>

              {activeTutorial === id && (
                <div className="tutorial-extra-content">
                  <p>{content}</p>
                  <div className="video-wrapper" style={{marginTop: '1rem'}}>
                    <iframe 
                      width="100%" 
                      height="315" 
                      src={videoUrl} 
                      title={title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p style={{ marginTop: '0.5rem' }}>
                    <a href={videoUrl.replace('/embed/', '/watch?v=')} target="_blank" rel="noopener noreferrer">
                      Watch full video on YouTube
                    </a>
                  </p>
                  <button onClick={() => markAsComplete(id)} className="tutorial-complete-btn">
                    Mark as Complete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorial;
