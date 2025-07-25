import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('access_token');

    if (token) {
      localStorage.setItem('access_token', token);
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="home">
      <h1>Bine ai venit!</h1>
      <a href="http://localhost:3001/login">
        <button>Conectează-te cu Spotify</button>
      </a>
    </div>
  );
};

export default Home;
