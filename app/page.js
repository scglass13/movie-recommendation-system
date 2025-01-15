"use client";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;

import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        const formattedMovies = data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
        }));

        setMovies(formattedMovies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
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
