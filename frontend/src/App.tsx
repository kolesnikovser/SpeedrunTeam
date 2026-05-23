import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Teams from './pages/Teams';
import Runs from './pages/Runs';

const App: React.FC = () => {
  return (
    <Router>
      <header className="navbar">
        <div className="nav-logo" onClick={() => window.location.href = '/'}>
          <span>⚡</span> SpeedrunTeam
        </div>
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Главная
          </NavLink>
          <NavLink to="/teams" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Команды
          </NavLink>
          <NavLink to="/runs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Записи забегов
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            О проекте
          </NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/runs" element={<Runs />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} SpeedrunTeam — Премиальная панель управления скоростными забегами. Разработано с использованием React, Express и SQLite.</p>
      </footer>
    </Router>
  );
};

export default App;
