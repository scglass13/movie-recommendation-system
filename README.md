# 🎬 Movie Recommendation System
### 📌 Overview

The Movie Recommendation System is a web application that helps users discover movies tailored to their tastes. It fetches popular movies from the TMDb API and provides AI-powered recommendations when a user selects a movie.
## 🚀 Features

📌 Fetches Popular Movies – Retrieves a list of trending movies using the TMDb API.<br>
🎭 Movie Metadata – Displays movie posters, titles, genres, directors, and actors.<br>
🧠 AI-Powered Recommendations – Suggests similar movies based on selected movie attributes.<br>
🔄 Dynamic UI – Clicking a movie updates the page to show recommended movies.<br>
🎨 Responsive Design – Optimized for both desktop and mobile users.<br>

## 🛠️ Technologies Used

Frontend: React.js (Next.js)<br>
Backend API: Node.js (Express)<br>
Database: TMDb API (for movie data)<br>
AI Model: Python (Scikit-Learn for recommendations)<br>
Styling: CSS, Bootstrap<br>

## 🎥 Usage

View popular movies displayed on the homepage.<br>
Click on a movie to get AI-powered recommendations.<br>
Browse recommended movies, displayed dynamically with posters.<br>
Go back to the homepage using the Back to Movies button.<br>

## 🧠 How the AI Model Works

Step 1: The model is trained using train_model.py, which processes movie metadata (genres, keywords, actors).<br>
Step 2: When a user selects a movie, the system searches for similar movies using cosine similarity.<br>
Step 3: The recommendations are dynamically retrieved and displayed on the frontend.<br>

## 🎯 Future Improvements

🔍 Advanced AI Recommendations – Improve accuracy with deep learning models.<br>
💾 User Authentication – Allow users to save favorite movies and preferences.<br>
🌎 Multi-language Support – Make the app available in multiple languages.<br>
📊 Movie Ratings & Reviews – Allow users to rate and review movies.<br>

## 📜 License

This project is licensed under the MIT License.
