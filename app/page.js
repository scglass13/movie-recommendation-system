"use client";

import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=5314ec5f13d5b6fc429984a0c9893aef`
      );
      const data = await res.json();
      const formattedMovies = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
      }));
      setMovies(formattedMovies);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Welcome to the Movie Recommendation System</h2>
      <p>Discover movies tailored to your tastes!</p>
      <MovieList movies={movies} />
    </div>
  );
}
