// src/pages/Home.js
import React from 'react';

function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Welcome to Spotify App</h2>
      <a href="http://localhost:3001/login">
        <button>Conectează-te cu Spotify</button>
      </a>
    </div>
  );
}

export default Home;
