import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './About.css';

const About = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`about-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="about-inner">
        <h1 className="about-title">About Reactopedia</h1>

        {/* Our Story Section */}
        <div className="about-section">
          <div className="about-image">
            <img src="/src/img/tech1.jpeg" alt="Our Story" />
          </div>
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Reactopedia was born out of a desire to simplify the learning process for React developers. Whether you're a beginner or already experienced, Reactopedia aims to serve as your mini encyclopedia to learn React.js in a structured and practical way.
            </p>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="about-section reverse">
          <div className="about-image">
            <img src="/src/img/tech2.jpg" alt="Our Mission" />
          </div>
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              Our mission is to make React learning accessible, enjoyable, and project-oriented. We combine clear explanations with real-world coding examples to bridge the gap between theory and practice.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="about-section contact">
          <h2>Contact Us</h2>
          <p>Email: <a href="mailto:contact@reactopedia.dev">contact@reactopedia.dev</a></p>
          <p>Twitter: <a href="https://twitter.com/reactopedia" target="_blank" rel="noopener noreferrer">@reactopedia</a></p>
          <p>GitHub: <a href="https://github.com/vaishali-s18/my-react-app" target="_blank" rel="noopener noreferrer">github.com/my-react-app/reactopedia</a></p>
        </div>
      </div>
    </div>
  );
};

export default About;
