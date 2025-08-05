// ✅ Your TMDb API Key
const tmdbApiKey = "b4101dc6eb147ce81c56721b676c4580";

// ✅ Store Quiz Answers
let quizAnswers = {
  mood: "",
  occasion: "",
  language: "",
  genre: ""
};

// ✅ Mood → Genre IDs Mapping
const moodGenreMap = {
  Happy: [35],         // Comedy
  Sad: [18],           // Drama
  Romantic: [10749],   // Romance
  Scared: [27],        // Horror
  Inspired: [99, 36],  // Documentary, History
  Excited: [28, 53]    // Action, Thriller
};

// ✅ Genre → Genre ID Mapping
const genreMap = {
  Any: null,
  Comedy: 35,
  Drama: 18,
  Action: 28,
  Romance: 10749
};

// ✅ Step 1: Mood
function selectMood(mood) {
  quizAnswers.mood = mood;
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
}

// ✅ Step 2: Occasion
function selectOccasion(occasion) {
  quizAnswers.occasion = occasion;
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "block";
}

// ✅ Step 3: Language
function selectLanguage(lang) {
  quizAnswers.language = lang;
  document.getElementById("step3").style.display = "none";
  document.getElementById("step4").style.display = "block";
}

// ✅ Step 4: Genre
function selectGenre(genre) {
  quizAnswers.genre = genre;
  document.getElementById("step4").style.display = "none";
  document.getElementById("result").style.display = "block";
  suggestMovie(); // Final function to fetch and show movie
}

// ✅ Get Movie Suggestion
async function suggestMovie() {
  const moodGenres = moodGenreMap[quizAnswers.mood];
  const genreFilter = genreMap[quizAnswers.genre];
  const language = quizAnswers.language || "hi";

  const finalGenres = genreFilter ? [genreFilter] : moodGenres;
  const selectedGenre = finalGenres[Math.floor(Math.random() * finalGenres.length)];

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&with_original_language=${language}&with_genres=${selectedGenre}&sort_by=popularity.desc`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      document.getElementById("movieCard").innerHTML = "<p>❌ No movies found.</p>";
      return;
    }

    const movie = data.results[Math.floor(Math.random() * data.results.length)];
    const movieId = movie.id;

    // ✅ Fetch Watch Providers
    const providerUrl = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${tmdbApiKey}`;
    let providers = "Unavailable";

    try {
      const providerRes = await fetch(providerUrl);
      const providerData = await providerRes.json();
      const country = quizAnswers.language === 'hi' ? 'IN' : 'US';

      const streaming = providerData.results?.[country]?.flatrate;
      if (streaming && streaming.length > 0) {
        providers = streaming.map(p => p.provider_name).join(", ");
      }
    } catch (err) {
      console.warn("Failed to fetch providers:", err);
    }

    // ✅ Show the Movie Card
    document.getElementById("movieCard").innerHTML = `
      <div class="movie-card">
        <div class="poster">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        </div>
        <div class="details">
          <h3>${movie.title}</h3>
          <p class="description">${movie.overview || "No description available."}</p>
          <p class="platform"><strong>Available on:</strong> ${providers}</p>
          <div class="buttons">
            <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title)}+trailer" target="_blank" class="btn trailer">🎬 Trailer</a>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching movie:", error);
    document.getElementById("movieCard").innerHTML = "<p>⚠️ Something went wrong.</p>";
  }
}

// ✅ Show Another
function getAnother() {
  suggestMovie();
}

// ✅ Navbar Actions
function goToSelect() {
  document.getElementById("step1").scrollIntoView({ behavior: "smooth" });
}

// ✅ Show Top Genres from TMDb
async function showTopGenres() {
  document.getElementById("genreSection").style.display = "block";
  document.getElementById("genreList").innerHTML = "Loading...";
  document.getElementById("genreMovies").style.display = "none";

  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbApiKey}&language=en-US`;

  try {
    const res = await fetch(genreUrl);
    const data = await res.json();

    const genres = data.genres;
    let html = "";
    genres.forEach(genre => {
      html += `<button onclick="loadMoviesByGenre(${genre.id}, '${genre.name}')">${genre.name}</button>`;
    });

    document.getElementById("genreList").innerHTML = html;
  } catch (err) {
    console.error("Failed to fetch genres:", err);
    document.getElementById("genreList").innerHTML = "❌ Failed to load genres.";
  }
}

// ✅ Load Movies for Selected Genre
async function loadMoviesByGenre(genreId, genreName) {
  document.getElementById("genreMovies").style.display = "block";
  document.getElementById("genreTitle").innerText = `🎬 Top Movies in ${genreName}`;
  document.getElementById("movieList").innerHTML = "Loading...";

  const language = quizAnswers.language || "en";

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&with_genres=${genreId}&sort_by=popularity.desc&with_original_language=${language}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      document.getElementById("movieList").innerHTML = "<p>No movies found.</p>";
      return;
    }

    const cards = data.results.map(movie => {
      return `
        <div>
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
          <h4>${movie.title}</h4>
        </div>
      `;
    }).join("");

    document.getElementById("movieList").innerHTML = cards;
  } catch (err) {
    console.error("Failed to fetch movies:", err);
    document.getElementById("movieList").innerHTML = "<p>Something went wrong.</p>";
  }
}
