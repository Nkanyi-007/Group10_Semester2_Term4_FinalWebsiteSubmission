const TMDB_KEY = "90585727dddc037ab146b226b877e75c";   // Replace with your TMDB key
const OMDB_KEY = "40ccbe12";   // Replace with your OMDb key
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

// Load a movie by TMDB ID
async function loadMovie(movieId) {
  try {
    // Fetch movie details
    const movieRes = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${TMDB_KEY}&language=en-US`);
    const movie = await movieRes.json();

    // Fetch cast
    const castRes = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_KEY}&language=en-US`);
    const credits = await castRes.json();

    // Fetch IMDb rating
    let imdbRating = "N/A";
    if (movie.imdb_id) {
      const omdbRes = await fetch(`https://www.omdbapi.com/?i=${movie.imdb_id}&apikey=${OMDB_KEY}`);
      const omdbData = await omdbRes.json();
      imdbRating = omdbData.imdbRating || "N/A";
    }

    // Fetch trailer
    const videoRes = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_KEY}&language=en-US`);
    const videoData = await videoRes.json();
    const trailer = videoData.results.find(v => v.type === "Trailer" && v.site === "YouTube");
    const trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;

    // Build cast HTML (limit to 8)
    const castHTML = credits.cast.slice(0, 8).map(actor => `
      <div class="cast-member">
        <img src="${actor.profile_path ? IMG_BASE + actor.profile_path : 'https://via.placeholder.com/90x135?text=No+Image'}" alt="${actor.name}">
        <div>${actor.name}</div>
      </div>
    `).join("");

    // Build movie card with safe fallbacks
    const cardHTML = `
      <div class="movie-card">
        <div class="poster">
          <img src="${movie.poster_path ? IMG_BASE + movie.poster_path : 'https://via.placeholder.com/300x450?text=No+Poster'}" alt="${movie.title}">
        </div>
        <div class="details">
          <h2 class="title">${movie.title || "Untitled Movie"}</h2>
          <p><strong>IMDb Rating:</strong> ⭐ ${imdbRating}</p>
          <p class="overview">${movie.overview || "No overview available."}</p>
          ${trailerUrl ? `<a href="${trailerUrl}" target="_blank" class="trailer-button">🎬 Watch Trailer</a>` : "<p>No trailer available.</p>"}
          <h3>Cast</h3>
          <div class="cast">${castHTML || "<p>No cast info available.</p>"}</div>
        </div>
      </div>
    `;

    // Inject into container
    document.getElementById("movieCards").innerHTML = cardHTML;

  } catch (err) {
    console.error("Error loading movie:", err);
    document.getElementById("movieCards").innerHTML = `<p>Failed to load movie. Please check your API keys and connection.</p>`;
  }
}

// Attach click listeners to your movie library cards
function setupLibraryClicks() {
  document.querySelectorAll(".movie-card").forEach(card => {
    card.addEventListener("click", () => {
      const movieId = card.getAttribute("data-id");
      if (movieId) {
        loadMovie(movieId);
      }
    });
  });
}

// Handle search bar
function setupSearch() {
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");

  if (!form || !input) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    try {
      // Search TMDB for the movie
      const searchRes = await fetch(`${BASE_URL}/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${encodeURIComponent(query)}`);
      const searchData = await searchRes.json();

      if (searchData.results && searchData.results.length > 0) {
        // Load the first matching result
        const movieId = searchData.results[0].id;
        loadMovie(movieId);
      } else {
        document.getElementById("movieCards").innerHTML = `<p>No results found for "${query}".</p>`;
      }
    } catch (err) {
      console.error("Search error:", err);
      document.getElementById("movieCards").innerHTML = `<p>Search failed. Please try again.</p>`;
    }
  });
}

// Run setup after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  setupLibraryClicks();
  setupSearch();
});s