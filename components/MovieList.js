import React from "react";

const MovieList = ({ movies, onSelectMovie }) => {
  console.log("MovieList received movies:", movies); // Debugging

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {movies && movies.length > 0 ? (
        movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              cursor: "pointer",
              textAlign: "center",
              maxWidth: "150px",
            }}
            onClick={() => onSelectMovie?.(movie)}
          >
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={movie.title}
                style={{ width: "100%" }}
              />
            ) : (
              <p>No Poster Available</p>
            )}
            <p>{movie.title}</p>
          </div>
        ))
      ) : (
        <p>No movies available</p>
      )}
    </div>
  );
};

export default MovieList;
