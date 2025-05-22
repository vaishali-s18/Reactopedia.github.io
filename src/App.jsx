import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import EditPage from './pages/EditPage';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}