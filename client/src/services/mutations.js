import { useMutation } from "@tanstack/react-query";
import http from "./api";

export function useCreateMovie() {
  return useMutation({
    mutationFn: (movie) => http.create(movie),
    onMutate: () => console.log("on mutate"),
    onError: () => console.log("on error "),
    onSuccess: () => console.log("on success "),
    onSettled: () => console.log("on setteled ... "),
  });
}
