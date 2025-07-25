const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const querystring = require('querystring');

dotenv.config();

const app = express();
app.use(cors());

const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Serverul merge!');
});

app.get('/login', (req, res) => {
  const scope = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-read-recently-played'
  ].join(' ');

  const queryParams = querystring.stringify({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  });

  console.log('>> Ruta /login a fost accesată');
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

const axios = require('axios');

app.get('/callback', async (req, res) => {
  const code = req.query.code;

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const access_token = response.data.access_token;

    // Afișăm tokenul direct (temporar)
    res.redirect(`${process.env.FRONTEND_URI}/dashboard?access_token=${access_token}`);

  } catch (error) {
    console.error('Eroare la schimbarea codului în token:', error.response?.data || error.message);
    res.send('A apărut o eroare la autentificare.');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serverul rulează pe http://localhost:${PORT}`);
});
