import React, { useEffect, useState } from 'react';
import './dashboard.css'; // Folosim același stil

const COLORS = ['#1DB954', '#FF5F5F', '#FFB400', '#645CFF', '#00B2FF'];

const Settings = () => {
  const [accent, setAccent] = useState(localStorage.getItem('accentColor') || '#1DB954');

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accent);
    localStorage.setItem('accentColor', accent);
  }, [accent]);

  return (
    <div className="card">
      <h2>Selectează o temă de culoare</h2>
      <div className="theme-picker">
        {COLORS.map((color) => (
          <button
            key={color}
            className="color-button"
            style={{ backgroundColor: color }}
            onClick={() => setAccent(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default Settings;
