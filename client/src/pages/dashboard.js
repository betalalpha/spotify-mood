import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // 🔹 Obține tokenul din URL sau localStorage
  const params = new URLSearchParams(window.location.search);
  const tokenFromURL = params.get('access_token');
  const token = tokenFromURL || localStorage.getItem('access_token');

  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [user, setUser] = useState(null);

  // 🔹 Salvează tokenul în localStorage dacă vine din URL
  useEffect(() => {
    if (tokenFromURL) {
      localStorage.setItem('access_token', tokenFromURL);
      // Șterge tokenul din URL pentru o adresă curată
      window.history.replaceState({}, document.title, '/dashboard');
    }
  }, [tokenFromURL]);

  useEffect(() => {
    const accent = localStorage.getItem('accentColor') || '#1DB954';
    document.documentElement.style.setProperty('--accent-color', accent);
  }, []);

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error('Eroare user:', err));

    fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTracks(data.items || []))
      .catch((err) => console.error('Eroare tracks:', err));

    fetch('https://api.spotify.com/v1/me/top/artists?limit=6', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setArtists(data.items || []))
      .catch((err) => console.error('Eroare artists:', err));
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  return (
    <div className="dashboard">
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>

      {user && (
        <div className="profile-card">
          <img src={user.images?.[0]?.url} alt="User" />
          <h2>{user.display_name}</h2>
          <p>{user.email}</p>
        </div>
      )}

      <div className="card">
        <h2>Ultimele melodii ascultate</h2>
        {tracks.length === 0 ? (
          <p>Se încarcă...</p>
        ) : (
          <div className="tracks">
            {tracks.map((item, index) => (
              <div className="track" key={index}>
                <img src={item.track.album.images?.[0]?.url} alt="cover" />
                <div>
                  <strong>{item.track.name}</strong>
                  <p>{item.track.artists[0].name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h2>Top artiști</h2>
        {artists.length === 0 ? (
          <p>Se încarcă...</p>
        ) : (
          <div className="artists">
            {artists.map((artist) => (
              <div className="artist" key={artist.id}>
                <img src={artist.images?.[0]?.url} alt={artist.name} />
                <p>{artist.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
