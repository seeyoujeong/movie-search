import axios from "axios";
import { defineStore } from "pinia";

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface Movies {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface SearchMoviesParams {
  s: string;
  y?: number;
  page?: number;
}

export interface SearchMovieDetailsParams {
  i: string;
  plot?: "short" | "full";
}

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    movies: {} as Movies,
    movieDetails: {} as MovieDetails,
    loading: false,
  }),
  getters: {},
  actions: {
    async searchMovies(params: SearchMoviesParams) {
      if (this.loading) return;
      this.loading = true;
      try {
        const { data } = await axios.post("/api/movies", params);
        this.movies = data;
      } catch (error) {
        console.error("searchMovies:", error);
      } finally {
        this.loading = false;
      }
    },
    async searchMovieDetails(params: SearchMovieDetailsParams) {
      if (this.loading) return;
      this.loading = true;
      try {
        const { data } = await axios.post("/api/movies", params);
        this.movieDetails = data;
      } catch (error) {
        console.error("searchMovieDetails:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
