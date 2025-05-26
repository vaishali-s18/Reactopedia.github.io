import { useContext } from 'react';
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import ArticleDetail from './pages/ArticleDetail.jsx';
import EditPage from './pages/EditPage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';


function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

function App() {
  const { isDarkMode } = useContext(ThemeContext); // Get theme state

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}`}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/articles/:id/detail" element={<ArticleDetail />} />
          <Route path="/articles/:id/edit" element={<EditPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          
          
        </Routes>
      </Router>
    </div>
  );
}

export default AppWrapper;