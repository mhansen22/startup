const express = require('express');
const app = express();
const axios = require('axios');
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));

const apiKey = 'apikey';
let genreMap = {};
let movieCache = [];


// Router for service endpoints
// var apiRouter = express.Router();
// app.use(`/api`, apiRouter);





// let movies = [
//   { title: "Inception", genre: "Action", year: 2010, director: "Christopher Nolan" },
//   { title: "The Shawshank Redemption", genre: "Drama", year: 1994, director: "Frank Darabont" },
//   { title: "The Godfather", genre: "Crime", year: 1972, director: "Francis Ford Coppola" },
//   { title: "Pulp Fiction", genre: "Crime", year: 1994, director: "Quentin Tarantino" },
//   { title: "The Dark Knight", genre: "Action", year: 2008, director: "Christopher Nolan" },
//   { title: "Forrest Gump", genre: "Drama", year: 1994, director: "Robert Zemeckis" },
//   { title: "Fight Club", genre: "Drama", year: 1999, director: "David Fincher" }
// ];




// const fetchGenres = async () => {
//   try {
//     const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
//     response.data.genres.forEach(genre => {
//       genreMap[genre.id] = genre.name;
//     });
//   } catch (error) {
//     console.error('Error fetching genres:', error);
//   }
// };

// var apiRouter = express.Router();

// // apiRouter.get('/movies', (req, res) => {
// //   // let shuffledMovies = movies.sort(() => 0.5 - Math.random());
// //   // let selectedMovies = shuffledMovies.slice(0, 3);
// //   function shuffleArray(array) {
// //     for (let i = array.length - 1; i > 0; i--) {
// //         const j = Math.floor(Math.random() * (i + 1));
// //         [array[i], array[j]] = [array[j], array[i]]; // swap elements
// //     }
// //   }

// //   let shuffledMovies = [...movies];
// //   shuffleArray(shuffledMovies);
// //   let selectedMovies = shuffledMovies.slice(0, 3);



// //   res.json(selectedMovies);
// // });

// apiRouter.get('/movies', async (req, res) => {
//   try {
//       const apiKey = '388d82aaee1185ab0a41407aad8b8a81';
//       const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`;

   
//       const response = await axios.get(url);
//       const movies = response.data.results;


//       let refinedMovies = movies.map(movie => ({
//           title: movie.title,
//           genre: 'Various', 
//           year: movie.release_date.substring(0, 4),
//           director: 'N/A', 
//       }));

      
//       function shuffleArray(array) {
//           for (let i = array.length - 1; i > 0; i--) {
//               const j = Math.floor(Math.random() * (i + 1));
//               [array[i], array[j]] = [array[j], array[i]];
//           }
//       }

//       shuffleArray(refinedMovies);
//       let selectedMovies = refinedMovies.slice(0, 3);

//       res.json(selectedMovies);
//   } catch (error) {
//       console.error('Error fetching movies from TMDB:', error);
//       res.status(500).send('Error fetching movie data');
//   }
// });

// apiRouter.post('/movies', (req, res) => {
//   const movie = req.body;
//   movies.push(movie);
//   res.json(movies);
// });

// apiRouter.put('/movies/:title', (req, res) => {
//   const { title } = req.params;
//   const movieUpdate = req.body;

//   let movieFound = false;
//   for (let movie of movies) {
//     if (movie.title === title) {
//       movieFound = true;
//       movie.rating = movieUpdate.rating;
//       break;
//     }
//   }

//   if (movieFound) {
//     res.json(movies);
//   } else {
//     res.status(404).send('Movie not found');
//   }
// });

//here

// const updateGenreMap = async () => {
//   try {
//     const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
//     genreMap = response.data.genres.reduce((map, genre) => {
//       map[genre.id] = genre.name;
//       return map;
//     }, {});
//   } catch (error) {
//     console.error('Error fetching genres:', error);
//   }
// };

// const fetchMovies = async () => {
//   try {
//     if (movieCache.length === 0) {
//       await updateGenreMap();  // Update genre mapping if needed
//       const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`);
//       const movies = response.data.results;

//       movieCache = movies.map(movie => ({
//         title: movie.title,
//         genres: movie.genre_ids.map(id => genreMap[id] || 'Unknown'),
//         year: movie.release_date ? movie.release_date.substring(0, 4) : 'Unknown',
//       }));
//     }
//     return movieCache;
//   } catch (error) {
//     console.error('Error fetching movies:', error);
//     return [];
//   }
// };

// const shuffleArray = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// };


// var apiRouter = express.Router();

// apiRouter.get('/movies', async (req, res) => {
//   try {
//     let movies = await fetchMovies();
//     shuffleArray(movies);
//     let selectedMovies = movies.slice(0, 3);
//     res.json(selectedMovies);
//   } catch (error) {
//     console.error('Error serving movie data:', error);
//     res.status(500).send('Error fetching movie data');
//   }
// });

// app.use('/api', apiRouter);

// app.use((_req, res) => {
//   res.sendFile('index.html', { root: 'public' });
// });

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });


//there




//

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

var apiRouter = express.Router();

apiRouter.get('/movies', async (req, res) => {
  try {
    await fetchGenres();  // Ensure genreMap is populated
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