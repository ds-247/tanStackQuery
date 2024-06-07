import { useQuery } from "@tanstack/react-query";
import http from "./api";

// get movies query

export function useGetMovies(){
    return useQuery({
        queryKey : ['getMovies'],
        queryFn : http.get,
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
    })
}