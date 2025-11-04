<<<<<<< Updated upstream
const TMDB_KEY = "90585727dddc037ab146b226b877e75c";   // Replace with your actual TMDB key
const OMDB_KEY = "40ccbe12";   // Replace with your actual OMDb key
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
=======
const TMDB_KEY = "90585727dddc037ab146b226b877e75c";  
const OMDB_KEY = "40ccbe12";   
const MOVIE_ID = "132";                 
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

async function loadMovie() {
  try {
    
    const movieRes = await fetch(`${BASE_URL}/movie/${MOVIE_ID}?api_key=${TMDB_KEY}&language=en-US`);
    const movie = await movieRes.json();

  
    const castRes = await fetch(`${BASE_URL}/movie/${MOVIE_ID}/credits?api_key=${TMDB_KEY}&language=en-US`);
    const credits = await castRes.json();

   
>>>>>>> Stashed changes
    let imdbRating = "N/A";
    if (movie.imdb_id) {
      const omdbRes = await fetch(`https://www.omdbapi.com/?i=${movie.imdb_id}&apikey=${OMDB_KEY}`);
      const omdbData = await omdbRes.json();
      imdbRating = omdbData.imdbRating || "N/A";
    }

<<<<<<< Updated upstream
    // Fetch trailer
    const videoRes = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_KEY}&language=en-US`);
    const videoData = await videoRes.json();
    const trailer = videoData.results.find(v => v.type === "Trailer" && v.site === "YouTube");
    const trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;

    // Build cast HTML
=======
    
>>>>>>> Stashed changes
    const castHTML = credits.cast.slice(0, 8).map(actor => `
      <div class="cast-member">
        <img src="${actor.profile_path ? IMG_BASE + actor.profile_path : 'https://via.placeholder.com/90x135?text=No+Image'}" alt="${actor.name}">
        <div>${actor.name}</div>
      </div>
    `).join("");

<<<<<<< Updated upstream
    // Build movie card
=======

>>>>>>> Stashed changes
    const cardHTML = `
      <div class="movie-card">
        <div class="poster">
          <img src="${IMG_BASE + movie.poster_path}" alt="${movie.title}">
        </div>
        <div class="details">
          <h2 class="title">${movie.title}</h2>
          <p><strong>IMDb Rating:</strong> ⭐ ${imdbRating}</p>
          <p class="overview">${movie.overview}</p>
<<<<<<< Updated upstream
          ${trailerUrl ? `<a href="${trailerUrl}" target="_blank" class="trailer-button">🎬 Watch Trailer</a>` : ""}
=======
>>>>>>> Stashed changes
          <h3>Cast</h3>
          <div class="cast">${castHTML}</div>
        </div>
      </div>
    `;

<<<<<<< Updated upstream
    // Inject into container
=======
    
>>>>>>> Stashed changes
    document.getElementById("movieCards").innerHTML = cardHTML;

  } catch (err) {
    console.error("Error loading movie:", err);
<<<<<<< Updated upstream
    document.getElementById("movieCards").innerHTML = `<p>Failed to load movie. Please check your API keys and connection.</p>`;
  }
}

// Load The Godfather on page load
loadMovie(238);
=======
  }
}

loadMovie();




async function searchMovie(query) {
  try {
    const searchRes = await fetch(`${BASE_URL}/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${encodeURIComponent(query)}`);
    const searchData = await searchRes.json();

    if (searchData.results && searchData.results.length > 0) {
      
      const firstResult = searchData.results[0];
      await loadMovie(firstResult.id);
    } else {
      document.getElementById("movieCards").innerHTML = `<p>No results found for "${query}".</p>`;
    }
  } catch (err) {
    console.error("Error searching movie:", err);
  }
}

document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim();
  if (query) searchMovie(query);
});




>>>>>>> Stashed changes
