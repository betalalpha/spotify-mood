import React, { useEffect, useState } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('access_token');

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserInfo(data))
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div className="dashboard">
      {userInfo ? (
        <div className="card">
          <img src={userInfo.images?.[0]?.url} alt="avatar" />
          <p><strong>{userInfo.display_name}</strong></p>
          <p>{userInfo.email}</p>
        </div>
      ) : (
        <p>Se încarcă...</p>
      )}
    </div>
  );
};

export default Dashboard;
