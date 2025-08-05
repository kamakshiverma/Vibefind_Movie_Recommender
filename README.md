🎬 MoodFlix – Pick a Movie Based on Your Mood!
Welcome to MoodFlix, a web app that recommends movies based on your mood, occasion, language, and preferred genre. It uses The Movie Database (TMDb) API to dynamically fetch and display movie suggestions tailored just for you.

🚀 Live Demo
👉 (https://vibefind.netlify.app/)


🧠 Features
✅ Pick a movie based on:

Your mood (Happy, Sad, Romantic, Scared, etc.)

Occasion (Alone, Friends, Family, Date)

Language preference (Hindi or English)

Genre (Comedy, Action, Romance, Drama, etc.)

✅ Movie card displays:

Poster

Title

Description

Release date

Available streaming platforms

✅ "🎲 Show Another" button fetches a different movie suggestion
✅ Top Genres section to explore best movies by genre
✅ Responsive design with a clean UI

🔧 Tech Stack
Tech	Purpose
HTML/CSS	Structure and Styling
JavaScript	Dynamic Logic and API Handling
TMDb API	Fetch real-time movie data
Netlify / GitHub	Hosting

🧩 Folder Structure
bash
Copy
Edit
moodflix/
├── index.html          # Main UI
├── genre.html          # (Optional) Separate genre page
├── style.css           # Custom styles
├── script.js           # JavaScript logic
└── assets/             # Images, icons, etc.
🔑 TMDb API Integration
This project uses the TMDb API to fetch:

Movie data: title, poster, overview

Streaming providers

Genre lists


💡 How It Works
User selects:

Mood → Suggests related genre IDs

Occasion → For fun personalization

Language → Filters Bollywood/Hollywood

Genre → Direct genre filter (optional)

JavaScript builds the final query using TMDb API

Movie suggestion is displayed with streaming info

Top genres feature allows genre-based exploration

📦 Setup Locally
Clone the repo

bash
Copy
Edit
git clone https://github.com/yourusername/moodflix.git
cd moodflix
Open index.html in your browser

bash
Copy
Edit
# or use live server (VS Code plugin)
🌐 Deployment
You can deploy this site using:

Netlify: Drag & drop or GitHub CI

GitHub Pages: Enable in repository settings

Vercel or any static hosting provider

📝 Future Features (Optional Ideas)
Search movies by actor or year

Add watchlist / favorites

User authentication

Save mood history

Dark mode toggle

🙌 Credits
TMDb API – for real-time movie data

