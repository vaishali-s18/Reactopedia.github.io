import { useContext } from 'react';
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { UserProvider } from "./context/userContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import ArticleDetail from './pages/ArticleDetail.jsx';
import EditPage from './pages/EditPage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import Tutorial from './pages/Tutorial.jsx';
import About from './pages/About.jsx';

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          {/* ✅ Updated route to match slugs used in Home.jsx */}
          <Route path="/article/:slug" element={<ArticleDetail />} />
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
