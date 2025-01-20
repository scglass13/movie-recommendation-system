"use client";

import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        // Fetch detailed metadata for each movie
        const detailedMovies = await Promise.all(
          data.results.map(async (movie) => {
            const detailsRes = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=credits,keywords`
            );

            const details = await detailsRes.json();

            return {
              id: movie.id,
              title: movie.title,
              poster: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
              overview: movie.overview,
              genres: details.genres.map((g) => g.name).join(", "), // convert genres array to string
              director:
                details.credits.crew.find((p) => p.job === "Director")?.name ||
                "Unknown",
              actors: details.credits.cast
                .slice(0, 5)
                .map((a) => a.name)
                .join(", "), // top 5 actors
              keywords: details.keywords.keywords.map((k) => k.name).join(", "), // movie keywords
            };
          })
        );

        console.log("Fetched movies with details: ", detailedMovies);
        setMovies(detailedMovies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // fetch AI-powered recommendations when a movie is selected
  const fetchRecommendations = async (movieTitle) => {
    try {
      const res = await fetch(
        `/api/recommend?title=${encodeURIComponent(movieTitle)}`
      );

      if (!res.ok) {
        console.warn(`No recommendations found for ${movieTitle}.`);
        setRecommendedMovies([]); // set recommendations to empty list
        setSelectedMovie(movieTitle);
        return;
      }

      const data = await res.json();

      // Fetch movie details including posters for each recommended movie
      const detailedRecommendations = await Promise.all(
        data.recommendations.map(async (title, index) => {
          const searchRes = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
              title
            )}&api_key=${apiKey}`
          );
          const searchData = await searchRes.json();
          const movie = searchData.results[0]; // Take the first search result

          return movie
            ? {
                id: movie.id || index,
                title: movie.title,
                poster: movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : "https://via.placeholder.com/200", // Default placeholder if no poster is available
              }
            : null;
        })
      );

      setRecommendedMovies(detailedRecommendations.filter(Boolean)); // remove null values
    } catch (error) {
      console.error("Failed to fetch recommendations: ", error);
      setRecommendedMovies([]); // clear recommendations on error
      setSelectedMovie(movieTitle);
    }
  };

  return (
    <div>
      <h2>Welcome to the Movie Recommendation System</h2>
      <p>Discover movies tailored to your tastes!</p>

      {/* If no movie is selected, show all movies */}
      {!selectedMovie ? (
        <MovieList
          movies={movies}
          onSelectMovie={(movie) => {
            setSelectedMovie(movie);
            fetchRecommendations(movie.title);
          }}
        />
      ) : (
        <div>
          <button
            onClick={() => setSelectedMovie(null)}
            style={{ marginBottom: "20px" }}
          >
            🔙 Back to Movies
          </button>
          <h3>Recommended Movies for {selectedMovie?.title}:</h3>
          <MovieList movies={recommendedMovies} />
        </div>
      )}
    </div>
  );
}
