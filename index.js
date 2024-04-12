const express = require('express');
const app = express();
const axios = require('axios');
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));

const apiKey = 'apikey';
let genreMap = {};
let movieCache = [];



var apiRouter = express.Router();

//changes here::

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



apiRouter.get('/movies', async (req, res) => {
  try {
    await fetchGenres(); //make sure genre map is populated...
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

app.use('/api', apiRouter);

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


let storedAdminCode = '';

apiRouter.post('/storeAdminCode', (req, res) => {
  const { adminCode } = req.body;
  storedAdminCode = adminCode;
  res.json({ message: 'Admin code stored successfully' });
});

apiRouter.post('/authenticateAdminCode', (req, res) => {
  const { adminCode } = req.body;
  if (adminCode === storedAdminCode) {
    res.json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false, message: 'Invalid admin code' });
  }
});


apiRouter.post('/storeAdminCode', (req, res) => {
  storedAdminCode = req.body.adminCode;  
  //store admin code?
  res.json({ message: 'Admin code stored successfully.' });
});

apiRouter.post('/validateAdminCode', (req, res) => {
  const { enteredCode } = req.body;
  if (enteredCode === storedAdminCode) {
    res.json({ valid: true });
  } else {
    res.status(401).json({ valid: false, message: 'Invalid admin code' });
  }
});