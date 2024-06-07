import { useQueries, useQuery } from "@tanstack/react-query";
import http from "./api";

// get movies query

export function useGetMovies() {
  return useQuery({
    queryKey: ["getMovies"],
    queryFn: http.get,
    // refetchInterval ,
    // refetchIntervalInBackground,
    // refetchOnMount,
    // refetchOnReconnect,
    // refetchOnWindowFocus,
    // retry,
    // retryDelay,
    // retryOnMount,
    // refetchInterval,
    // enabled
  });
}

// get  multiple movies  with ids

export function useMultipleMoviesMitId(ids = []) {
  // Ensure ids is always an array
  const validIds = Array.isArray(ids) ? ids : [];
  return useQueries({
    queries: validIds.map((id) => ({
      queryKey: ["getMovie", id], // Include id in the query key to differentiate between queries
      queryFn: () => http.getSpecific(id), // Pass the id to the query function
    })),
  });
}
