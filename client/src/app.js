import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Settings from './pages/settings';

const App = () => {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/settings">Setări</Link>
        <Link to="/">Logout</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
