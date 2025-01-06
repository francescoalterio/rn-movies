import {
  MovieCredits,
  MovieDetails,
  MovieDetailsSmall,
} from "@/interfaces/Movies.interface";
import {
  TvCredits,
  TvDetails,
  TvDetailsSmall,
} from "@/interfaces/tvs.interface";

export default class MoviesAPI {
  private fetchOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_ACCESS_TOKEN}`,
    },
  };

  getMoviesByText(text: string): Promise<MovieDetailsSmall[]> {
    const url = `https://api.themoviedb.org/3/search/movie?query=${text}&include_adult=true&language=es-ES&page=1`;
    return fetch(url, this.fetchOptions)
      .then((response) => response.json())
      .then((data) => data.results);
  }

  getTvShowsByText(text: string): Promise<TvDetailsSmall[]> {
    const url = `https://api.themoviedb.org/3/search/tv?query=${text}&include_adult=true&language=es-ES&page=1`;
    return fetch(url, this.fetchOptions)
      .then((response) => response.json())
      .then((data) => data.results);
  }

  getPoster(posterPath: string) {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  getMovieDetails(id: number): Promise<MovieDetails> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=es-ES`;
    return fetch(url, this.fetchOptions).then((response) => response.json());
  }

  getMovieCredits(id: number): Promise<MovieCredits> {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=es-ES`;
    return fetch(url, this.fetchOptions).then((response) => response.json());
  }

  getTvShowDetails(id: number): Promise<TvDetails> {
    const url = `https://api.themoviedb.org/3/tv/${id}?language=es-ES`;
    return fetch(url, this.fetchOptions).then((response) => response.json());
  }

  getTvShowCredits(id: number): Promise<TvCredits> {
    const url = `https://api.themoviedb.org/3/tv/${id}/credits?language=es-ES`;
    return fetch(url, this.fetchOptions).then((response) => response.json());
  }
}
