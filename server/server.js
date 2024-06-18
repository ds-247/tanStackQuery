const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 5500;

app.use(cors());
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  await new Promise((r) =>
    setTimeout(() => {
      r()
    }, 2000)
  );

  next();
});

const readData = (file) => {
  return JSON.parse(fs.readFileSync(file, "utf8"));
};

let movies = readData("movies.json");
let awards = readData("awards.json");

const saveMovies = (movies) => {
  fs.writeFileSync("movies.json", JSON.stringify(movies, null, 2));
};

// Get all movies
app.get("/movies", (req, res) => {
  res.json(movies);
});

// Get a specific movie by ID
app.get("/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

// Add a new movie
app.post("/movies", (req, res) => {
  const newMovie = req.body;
  newMovie.id = movies.length ? movies[movies.length - 1].id + 1 : 1;
  movies.push(newMovie);
  saveMovies(movies);
  res.status(201).json(newMovie);
});

// Update an existing movie by ID
app.put("/movies/:id", (req, res) => {
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
  const movieIndex = movies.findIndex((m) => m.id === parseInt(req.params.id));
  if (movieIndex !== -1) {
    movies = movies.filter((m) => m.id !== parseInt(req.params.id));
    saveMovies(movies);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

app.get("/awards", (req, res) => {
  let { _limit, _page } = req.query;
  _limit = parseInt(_limit);
  _page = parseInt(_page);

  if (_limit && _page) {
    const start = (_page - 1) * _limit;
    const end = _page * _limit;
    const paginatedAwards = awards.slice(start, end);
    res.json(paginatedAwards);
  } else {
    res.json(awards);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
