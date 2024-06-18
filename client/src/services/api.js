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

async function getAwards(page) {
  try {
    const limit = 3;
    let url = "http://localhost:5500/awards";
    if (!page) {
      const res = await axios.get("http://localhost:5500/awards");

      return res.data;
    } else {
      const res = await axios.get(url, {
        params: {
          _limit: limit,
          _page: page,
        },
      });

      return res.data;
    }
  } catch (error) {
    throw new Error("Error fetching awards .... ");
  }
}

async function getCelebs({ pageParam = 1 }) {
  try {
    const limit = 5;
    const url = "http://localhost:5500/celebs";
    const res = await axios.get(url, {
      params: {
        _limit: limit,
        _page: pageParam,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Error fetching celebs list .... ");
  }
}

const http = {
  get: fetchMovies,
  getSpecific: fetchMovie,
  create: createMovie,
  getAwards: getAwards,
  getCelebs : getCelebs
};

export default http;
