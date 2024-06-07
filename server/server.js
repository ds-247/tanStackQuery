const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require('cors')
const app = express();
const port = 5500;

app.use(cors());
app.use(bodyParser.json());

const getMovies = () => {
  const data = fs.readFileSync("movies.json");
  return JSON.parse(data);
};

const saveMovies = (movies) => {
  fs.writeFileSync("movies.json", JSON.stringify(movies, null, 2));
};

// Get all movies
app.get("/movies", (req, res) => {
  const movies = getMovies();
  res.json(movies);
});

// Get a specific movie by ID
app.get("/movies/:id", (req, res) => {
  const movies = getMovies();
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

// Add a new movie
app.post("/movies", (req, res) => {
  const movies = getMovies();
  const newMovie = req.body;
  newMovie.id = movies.length ? movies[movies.length - 1].id + 1 : 1;
  movies.push(newMovie);
  saveMovies(movies);
  res.status(201).json(newMovie);
});

// Update an existing movie by ID
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

// Delete a movie by ID
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
