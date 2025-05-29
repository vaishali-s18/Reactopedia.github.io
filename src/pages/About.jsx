import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';
import './About.css';

const About = () => {
  const { isDarkMode } = useContext(ThemeContext);

  // Team members data
  const team = [
    { name: "Vaishali ", role: "Reactpedia designer", image: "/src/img/team1.jpg" },
    
  ];

  // FAQ data
  const faqs = [
    { question: "Is Reactopedia free?", answer: "Yes! All our content is completely free." },
    { question: "Can I contribute?", answer: "Absolutely! Visit our GitHub repo to submit PRs." },
    { question: "How can I contact you?", answer: "You can reach us via email or social media links below." },
    { question: "Do you offer certifications?", answer: "Currently, we do not offer certifications, but we are exploring options." },
    { question: "What topics do you cover?", answer: "We cover everything from React basics to advanced concepts like hooks and state management." },
    { question: "How can I stay updated?", answer: "Follow us on Twitter or subscribe to our newsletter for the latest updates." },
    { question: "Can I suggest a tutorial topic?", answer: "Yes! We welcome suggestions. Reach out via our contact page." },
  
  ];

  return (
    <div className={`about-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="about-inner">
        <h1 className="about-title">About Reactopedia</h1>

        {/* Hero Section */}
        <div className="about-hero">
          <p className="tagline">
            Your mini encyclopedia for <span className="highlight">React.js</span> learning
          </p>
        </div>

        {/* Our Story Section */}
        <div className="about-section">
          <div className="about-image">
            <img src="/src/img/tech1.jpeg" alt="Our Story" />
          </div>
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Reactopedia is an mini encyclopedia app of a passion for simplifying React.js education. 
              we built a project-based learning hub that combines <strong>theory</strong>, <strong>examples</strong>, and <strong>Tutorials</strong>.
            </p>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Provides Sufficient content</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <span className="stat-label">Tutorials</span>
              </div>
            </div>
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
              We’re on a mission to:
            </p>
            <ul className="mission-list">
              <li>🚀 <strong>Demystify React concepts</strong> with visual explanations</li>
              <li>💡 <strong>Focus on practical coding</strong> over abstract theory</li>
              <li>🌐 <strong>Build a community</strong> of React developers</li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="about-section team">
          <h2>Meet the Team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="social-links">
                 
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="about-section faq">
          <h2>FAQs</h2>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <div key={index} className="faq-item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="about-section tech-stack">
          <h2>Built With</h2>
          <div className="tech-icons">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" />
          </div>
        </div>

        {/* Contact Section */}
        <div className="about-section contact">
          <h2>Get In Touch</h2>
          <div className="contact-methods">
            <a href="mailto:contact@reactopedia.dev" className="contact-link">
              <FaEnvelope /> Email Us
            </a>
            <a href="https://twitter.com/reactopedia" target="_blank" rel="noopener noreferrer" className="contact-link">
              <FaTwitter /> Twitter
            </a>
            <a href="https://github.com/vaishali-s18/my-react-app" target="_blank" rel="noopener noreferrer" className="contact-link">
              <FaGithub /> GitHub
            </a>
          </div>
          <p className="contact-note">
            We love hearing from our community! Whether you have feedback, suggestions, or just want to say hi, 
            feel free to reach out.</p>
        </div>
      </div>
    </div>
  );
};

export default About;