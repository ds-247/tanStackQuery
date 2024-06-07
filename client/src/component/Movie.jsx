import { useState } from "react";
import { useCreateMovie } from "../services/mutations";
import { useGetMovies, useMultipleMoviesMitId } from "../services/queries";

function Movie() {
  const [movieName, setMovieName] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");

  const getMoviesQuery = useGetMovies();
  const createMovieMutation = useCreateMovie();

  const movieIds = getMoviesQuery.data?.map((e) => e.id) || [];
  const getMovieQueryResults = useMultipleMoviesMitId(movieIds);

  const handleSubmit = (event) => {
    event.preventDefault();
    
      createMovieMutation.mutate({title : movieName, year, director})
    
    setMovieName("");
    setYear("");
    setDirector("");
  };

  if (getMoviesQuery.isLoading) return "Loading...";
  if (getMoviesQuery.isError) return "Error occurred";

  // Check if all movie queries are still loading or have errors
  if (getMovieQueryResults.some((query) => query.isLoading))
    return "Loading movies...";
  if (getMovieQueryResults.some((query) => query.isError))
    return "Error loading some movies";

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Movie Name:
            <input
              type="text"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Year:
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Director:
            <input
              type="text"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

      {getMovieQueryResults.map((result, index) => {
        if (result.isLoading) return <p key={index}>Loading...</p>;
        if (result.isError) return <p key={index}>Error loading movie</p>;

        const movie = result.data;
        return (
          <div key={movie.id}>
            <h1>{movie.title}</h1>
            <h4>ID: {movie.id}</h4>
            <h4>Director: {movie.director}</h4>
            <h4>Year: {movie.year}</h4>
          </div>
        );
      })}
    </>
  );
}

export default Movie;
