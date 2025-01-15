import MovieList from "@/components/MovieList";

const sampleMovies = [
  { id: 1, title: "Inception", poster: "https://via.placeholder.com/200x300" },
  {
    id: 2,
    title: "Interstellar",
    poster: "https://via.placeholder.com/200x300",
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster: "https://via.placeholder.com/200x300",
  },
];

export default function Home() {
  return (
    <div>
      <h2>Welcome to the Movie Recommendation System</h2>
      <p>Discover movies tailored to your tastes!</p>
      <MovieList movies={sampleMovies} />
    </div>
  );
}
