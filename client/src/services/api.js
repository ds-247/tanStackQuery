import axios from "axios";

async function fetchMovies() {
  try {
    const res = await axios.get("http://localhost:5500/movies");
    return res.data;
  } catch (error) {
    throw new Error("Error fetching movies");
  }
}

async function fetchMovie(id) {
  try {
    const res = await axios.get(`http://localhost:5500/movies/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Error fetching movie");
  }
}

async function createMovie(movie) {
  try {
    const res = await axios.post(`http://localhost:5500/movies`, movie);
    return res.data;
  } catch (error) {
    throw new Error("Error fetching movie");
  }
}

const http = {
  get: fetchMovies,
  getSpecific: fetchMovie,
  create: createMovie,
};

export default http;
