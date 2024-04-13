const express = require('express');
const axios = require('axios');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));


//configuration for api key
const apiKey = 'apikey';
let genreMap = {};
let movieCache = [];

//middle
app.use(express.json());
app.use(express.static('public'));

var apiRouter = express.Router();


//fetch genres from TMDB
const fetchGenres = async () => {
  try {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
    const response = await axios.get(url);
    response.data.genres.forEach(genre => {
      genreMap[genre.id] = genre.name;
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
};


//mix.shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//route
apiRouter.get('/movies', async (req, res) => {
  const { genre, yearFrom, yearTo, minLength, maxLength, rating } = req.query;
  
  try {
    await fetchGenres();
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`;
    const response = await axios.get(url);
    const movies = response.data.results;
    let refinedMovies = movies.map(movie => ({
      title: movie.title,
      genre: movie.genre_ids.map(id => genreMap[id]).join(', '),
      year: movie.release_date.substring(0, 4),
    }));

    shuffleArray(refinedMovies);
    res.json(movies.slice(0,3));
    // res.json(refinedMovies.slice(0,3));
    req.session.movies = refinedMovies;
    res.redirect('/admin.html');
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Error fetching movie data');
  }
});


//admin code
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


app.use('/api', apiRouter);


app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});