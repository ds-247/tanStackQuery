import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "./api";

export function useCreateMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movie) => http.create(movie),
    onMutate: () => console.log("on mutate"),
    onError: () => console.log("on error "),
    onSuccess: () => console.log("on success "),
    onSettled: async (data, error, variables) => {
      console.log("on setteled ... ", data, error, variables);
      if (error) {
        console.log("error occured in settled");
      } else {
        await queryClient.invalidateQueries({ queryKey: ["getMovies"] });
      }
    },
  });
}
