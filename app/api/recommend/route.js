export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  console.log("Received request for movie:", title);

  if (!title) {
    return new Response(JSON.stringify({ error: "No movie title provided" }), {
      status: 400,
    });
  }

  try {
    //Fetch movie ID from TMDB
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${
      process.env.NEXT_PUBLIC_TMDB_API_KEY
    }&query=${encodeURIComponent(title)}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (!searchData.results || searchData.results.length === 0) {
      return new Response(
        JSON.stringify({ error: "Movie not found in TMDB" }),
        {
          status: 404,
        }
      );
    }

    const movieId = searchData.results[0].id; // get first movie ID from search results
    console.log(`Found movie ID: ${movieId}`);

    // Fetch similar movies using the ID
    const recommendationsUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`;
    const recRes = await fetch(recommendationsUrl);
    const recData = await recRes.json();

    if (!recData.results || recData.results.length === 0) {
      return new Response(
        JSON.stringify({ error: "No similar movies found" }),
        {
          status: 404,
        }
      );
    }

    // Extract movie titles
    const recommendedMovies = recData.results.map((movie) => movie.title);

    return new Response(
      JSON.stringify({ recommendations: recommendedMovies }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return new Response(JSON.stringify({ error: "Initial Server Error" }), {
      status: 500,
    });
  }
}
