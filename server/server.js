const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const cors = require('cors');
const port = 5500;

// Configuring CORS options
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 3000);
});

app.use(bodyParser.json());

const getMovies = () => {
  const data = fs.readFileSync("movies.json");
  return JSON.parse(data);
};

const saveMovies = (movies) => {
  fs.writeFileSync("movies.json", JSON.stringify(movies, null, 2));
};

app.get("/movies", (req, res) => {
  const movies = getMovies();
  res.json(movies);
});

app.post("/movies", (req, res) => {
  const movies = getMovies();
  const newMovie = req.body;
  newMovie.id = movies.length ? movies[movies.length - 1].id + 1 : 1;
  movies.push(newMovie);
  saveMovies(movies);
  res.status(201).json(newMovie);
});

app.put("/movies/:id", (req, res) => {
  const movies = getMovies();
  const movieIndex = movies.findIndex((m) => m.id === parseInt(req.params.id));
  if (movieIndex !== -1) {
    const updatedMovie = { ...movies[movieIndex], ...req.body };
    movies[movieIndex] = updatedMovie;
    saveMovies(movies);
    res.json(updatedMovie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

app.delete("/movies/:id", (req, res) => {
  let movies = getMovies();
  const movieIndex = movies.findIndex((m) => m.id === parseInt(req.params.id));
  if (movieIndex !== -1) {
    movies = movies.filter((m) => m.id !== parseInt(req.params.id));
    saveMovies(movies);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});