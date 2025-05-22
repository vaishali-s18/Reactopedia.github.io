import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Single import
import NavigationBar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import ArticlePage from './pages/ArticlePage';  // Ensure this file exists
import NewArticle from './pages/NewArticle';    // Ensure this file exists

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Header />
      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/new" element={<NewArticle />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;