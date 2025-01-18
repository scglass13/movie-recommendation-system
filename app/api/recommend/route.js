import recommendations from "@/data/movie_recommendations.json";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  if (!title || !recommendations[title]) {
    return new Response(JSON.stringify({ message: "Movie not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({ recommendations: recommendations[title] }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
