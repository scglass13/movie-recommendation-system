import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
import os

# sample movie data (replace with real data later)
movies = [
    {
        "id": 1,
        "title": "Inception",
        "genres": "Sci-Fi, Action",
        "overview": "A thief enters dreams",
        "actors": "Leonardo DiCaprio, Joseph Gordon-Levitt",
        "director": "Christopher Nolan",
    },
    {
        "id": 2,
        "title": "Interstellar",
        "genres": "Sci-Fi, Adventure",
        "overview": "A team explores space",
        "actors": "Matthew McConaughey, Anne Hathaway",
        "director": "Christopher Nolan",
    },
    {
        "id": 3,
        "title": "The Dark Knight",
        "genres": "Action, Crime",
        "overview": "Batman fights the Joker",
        "actors": "Christian Bale, Heath Ledger",
        "director": "Christopher Nolan",
    },
]

# convert to dataframe
df = pd.DataFrame(movies)

# combine text fields for similarity analysis
df["combined_features"] = (
    df["genres"] + " " + df["overview"] + df["actors"] + " " + df["director"]
)

# convert text into numerical vectors
vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix = vectorizer.fit_transform(df["combined_features"])

# compute cosine similarity between movies
cosine_sim = cosine_similarity(tfidf_matrix)

# store results in dictionary format
movie_sim_dict = {}
for idx, row in df.iterrows():
    similar_indices = cosine_sim[idx].argsort()[:-6:-1]  # top 5 similar movies
    similar_movies = [df.iloc[i]["title"] for i in similar_indices if i != idx]
    movie_sim_dict[row["title"]] = similar_movies

# ensure 'data' directory exists
data_dir = os.path.join(os.getcwd(), "data")
os.makedirs(data_dir, exist_ok=True)

# save as JSON
file_path = os.path.join(data_dir, "movie_recommendations.json")
with open(file_path, "w") as f:
    json.dump(movie_sim_dict, f, indent=4)

print("Model trained! Recommendations saved.")
