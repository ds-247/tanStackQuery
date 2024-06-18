import { keepPreviousData, useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import http from "./api";

// infinite scrolling 

export function useFetchCelebsQuery(){
  return useInfiniteQuery({
    queryKey : ["celebs"], 
    queryFn : http.getCelebs,
    getNextPageParam : (lastPage,  pages) => {
      console.log(lastPage, pages)
      if(lastPage.length  === 0)return undefined;
      return pages.length + 1;
    }
  })
}

// get awards query

export function useAwardsQuery(page){
  return useQuery({
    queryKey: ["awards", {page}],
    queryFn: () => http.getAwards(page),
    placeholderData : keepPreviousData
  })
}

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
