import { useGetMovies, useMultipleMoviesMitId } from "../services/queries";

function Movie() {
  const getMoviesQuery = useGetMovies();

  const movieIds = getMoviesQuery.data?.map((e) => e.id) || [];
  const getMovieQueryResults = useMultipleMoviesMitId(movieIds);

  if (getMoviesQuery.isLoading) return "Loading...";
  if (getMoviesQuery.isError) return "Error occurred";

  // Check if all movie queries are still loading or have errors
  if (getMovieQueryResults.some((query) => query.isLoading))
    return "Loading movies...";
  if (getMovieQueryResults.some((query) => query.isError))
    return "Error loading some movies";

  return (
    <>
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
