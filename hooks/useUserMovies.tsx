import { UserMoviesContext } from "@/contexts/user-movies-context";
import { useContext } from "react";

export function useUserMovies() {
  return useContext(UserMoviesContext);
}
