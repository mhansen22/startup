const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');
const { getTopVotedMovie } = require('./database');


// const { createServer } = require('http');
// const { getTopVotedMovie } = require('./database');
const axios = require('axios');
//addded:

const authCookieName = 'token';

// const { peerProxy } = require('./peerProxy.js');

//port to use
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());
// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());
// Serve up the applications static content
app.use(express.static('public'));
// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);
// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const apiKey = '388d82aaee1185ab0a41407aad8b8a81';
let genreMap = {};

const fetchGenres = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
    response.data.genres.forEach(genre => {
      genreMap[genre.id] = genre.name;
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
};

// var apiRouter = express.Router();

apiRouter.get('/movies', async (req, res) => {
  try {
    await fetchGenres();
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`);
    const movies = response.data.results;

    let refinedMovies = movies.map(movie => ({
      title: movie.title,
      genre: movie.genre_ids.map(id => genreMap[id]).join(', '),
      year: movie.release_date.substring(0, 4),
    }));

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    shuffleArray(refinedMovies);
    let selectedMovies = refinedMovies.slice(0, 3);

    res.json(selectedMovies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Error fetching movie data');
  }
});

//change made:
secureApiRouter.post('/vote', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user) {
      return res.status(401).send({ msg: 'Unauthorized' });
  }
  const movieTitle = req.body.movieTitle;
  if (!movieTitle) {
      return res.status(400).send({ msg: 'Movie title is required' });
  }
  try {
      const vote = await DB.logVote(user._id, movieTitle);
      const topMovie = await getTopVotedMovie();//get top movie
      if (topMovie) {
          peerProxy.broadcastTopMovie(topMovie);//brodcast method used here
      }
      res.send({ msg: 'Vote logged', vote: vote });
  } catch (error) {
      console.error('Failed to log vote:', error);
      res.status(500).send({ msg: 'Failed to log vote' });
  }
});



app.use('/api', apiRouter);

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

//remove
// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);