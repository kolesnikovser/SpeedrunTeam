import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: 'linear-gradient(90deg, #4e54c8, #8f94fb)' }}>
        <Link to="/" style={{ marginRight: '1rem', color: '#fff', textDecoration: 'none' }}>Главная</Link>
        <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>О проекте</Link>
      </nav>
      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
