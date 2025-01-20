🎬 Movie Recommendation System
📌 Overview

The Movie Recommendation System is a web application that helps users discover movies tailored to their tastes. It fetches popular movies from the TMDb API and provides AI-powered recommendations when a user selects a movie.
🚀 Features

    📌 Fetches Popular Movies – Retrieves a list of trending movies using the TMDb API.
    🎭 Movie Metadata – Displays movie posters, titles, genres, directors, and actors.
    🧠 AI-Powered Recommendations – Suggests similar movies based on selected movie attributes.
    🔄 Dynamic UI – Clicking a movie updates the page to show recommended movies.
    🎨 Responsive Design – Optimized for both desktop and mobile users.

🛠️ Technologies Used

    Frontend: React.js (Next.js)
    Backend API: Node.js (Express)
    Database: TMDb API (for movie data)
    AI Model: Python (Scikit-Learn for recommendations)
    Styling: CSS, Bootstrap

🎥 Usage

    View popular movies displayed on the homepage.
    Click on a movie to get AI-powered recommendations.
    Browse recommended movies, displayed dynamically with posters.
    Go back to the homepage using the Back to Movies button.

🧠 How the AI Model Works

    Step 1: The model is trained using train_model.py, which processes movie metadata (genres, keywords, actors).
    Step 2: When a user selects a movie, the system searches for similar movies using cosine similarity.
    Step 3: The recommendations are dynamically retrieved and displayed on the frontend.

🎯 Future Improvements

    🔍 Advanced AI Recommendations – Improve accuracy with deep learning models.
    💾 User Authentication – Allow users to save favorite movies and preferences.
    🌎 Multi-language Support – Make the app available in multiple languages.
    📊 Movie Ratings & Reviews – Allow users to rate and review movies.

📜 License

This project is licensed under the MIT License.
