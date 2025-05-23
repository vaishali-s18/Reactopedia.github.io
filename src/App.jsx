import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Article from './pages/ArticlePage';
import Category from './pages/CategoryPage';
import Edit from './pages/EditPage';  // Fixed the typo in import path

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Article />} />
        <Route path="/category" element={<Category />} />
        <Route path="/edit" element={<Edit />} />
       
      </Routes>
    </Router>
  );
}

export default App;