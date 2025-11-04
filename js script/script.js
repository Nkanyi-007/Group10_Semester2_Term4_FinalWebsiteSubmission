const TMDB_KEY = "90585727dddc037ab146b226b877e75c";   // Replace with your TMDB key
const OMDB_KEY = "40ccbe12";   // Replace with your OMDb key
const MOVIE_ID = "132";                 // Example: The Godfather
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

async function loadMovie() {
  try {
    // Fetch movie details from TMDB
    const movieRes = await fetch(`${BASE_URL}/movie/${MOVIE_ID}?api_key=${TMDB_KEY}&language=en-US`);
    const movie = await movieRes.json();

    // Fetch cast from TMDB
    const castRes = await fetch(`${BASE_URL}/movie/${MOVIE_ID}/credits?api_key=${TMDB_KEY}&language=en-US`);
    const credits = await castRes.json();

    // Fetch IMDb rating from OMDb using imdb_id
    let imdbRating = "N/A";
    if (movie.imdb_id) {
      const omdbRes = await fetch(`https://www.omdbapi.com/?i=${movie.imdb_id}&apikey=${OMDB_KEY}`);
      const omdbData = await omdbRes.json();
      imdbRating = omdbData.imdbRating || "N/A";
    }

    // Build cast HTML (limit to 8)
    const castHTML = credits.cast.slice(0, 8).map(actor => `
      <div class="cast-member">
        <img src="${actor.profile_path ? IMG_BASE + actor.profile_path : 'https://via.placeholder.com/90x135?text=No+Image'}" alt="${actor.name}">
        <div>${actor.name}</div>
      </div>
    `).join("");

    // Build the movie card
    const cardHTML = `
      <div class="movie-card">
        <div class="poster">
          <img src="${IMG_BASE + movie.poster_path}" alt="${movie.title}">
        </div>
        <div class="details">
          <h2 class="title">${movie.title}</h2>
          <p><strong>IMDb Rating:</strong> ⭐ ${imdbRating}</p>
          <p class="overview">${movie.overview}</p>
          <h3>Cast</h3>
          <div class="cast">${castHTML}</div>
        </div>
      </div>
    `;

    // Inject into the fluid container
    document.getElementById("movieCards").innerHTML = cardHTML;

  } catch (err) {
    console.error("Error loading movie:", err);
  }
}

loadMovie();



// Search for a movie by name
async function searchMovie(query) {
  try {
    const searchRes = await fetch(`${BASE_URL}/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${encodeURIComponent(query)}`);
    const searchData = await searchRes.json();

    if (searchData.results && searchData.results.length > 0) {
      // Always grab the first result’s ID
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




