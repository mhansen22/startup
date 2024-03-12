const express = require('express');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(express.static('public'));

let movies = [
    { title: "Inception", genre: "Action", year: 2010, director: "Christopher Nolan" },
    { title: "The Shawshank Redemption", genre: "Drama", year: 1994, director: "Frank Darabont" },
    { title: "The Godfather", genre: "Crime", year: 1972, director: "Francis Ford Coppola" }
];

var apiRouter = express.Router();

// Get list of movies
apiRouter.get('/movies', (req, res) => {
  res.json(movies);
});

// Add a movie to the list
apiRouter.post('/movies', (req, res) => {
  const movie = req.body;
  movies.push(movie);
  res.json(movies);
});

// Example of updating a movie's info (e.g., rating)
apiRouter.put('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movieUpdate = req.body;

  let movieFound = false;
  for (let movie of movies) {
    if (movie.title === title) {
      movieFound = true;
      movie.rating = movieUpdate.rating;
      break;
    }
  }

  if (movieFound) {
    res.json(movies);
  } else {
    res.status(404).send('Movie not found');
  }
});

app.use('/api', apiRouter);

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
