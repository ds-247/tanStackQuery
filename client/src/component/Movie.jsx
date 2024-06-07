import { useGetMovies } from "../services/queries"

function Movie() {
    const getMovieQuery = useGetMovies();

    if(getMovieQuery.isPending)return "Loading";
    if(getMovieQuery.isError) return "Error occured";

    console.log(getMovieQuery.data);

    return <>{getMovieQuery.data.data.map(e => {
        console.log(e);
        return (
          <>
            <h1>{e.title}</h1>
            <h4>{e.id}</h4>
            <h4>{e.director}</h4>
          </>
        );
    })}</>   
}

export default Movie