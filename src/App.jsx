import { useContext } from 'react';
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { UserProvider } from "./context/userContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Auth from './components/Auth';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import EditPage from './pages/EditPage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import Tutorial from './pages/Tutorial.jsx';
import About from './pages/About.jsx';
import { sampleArticles } from './data/sampleData'; // Import your articles

function AppWrapper() {
  return (
    <ThemeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  );
}

function App() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}`}>
      <Router>
        <Navbar />
        <Auth /> {/* <-- Add here to show on every page */}
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/article/:slug" element={<ArticlePage articles={sampleArticles} />} />
          <Route path="/articles/:id" element={<ArticlePage articles={sampleArticles} />} />
          <Route path="/articles/:id/edit" element={<EditPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/tutorials" element={<Tutorial />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppWrapper;