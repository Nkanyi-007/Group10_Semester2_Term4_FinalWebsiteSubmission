<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// movie.js

const API_KEY = "90585727dddc037ab146b226b877e75c";

// Build TMDB image URL
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes


const API_KEY = "90585727dddc037ab146b226b877e75c";

<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
function getImageUrl(path, size = "w500") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "fallback.jpg";
}

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// Fetch movie details
=======

>>>>>>> Stashed changes
=======

>>>>>>> Stashed changes
=======

>>>>>>> Stashed changes
async function fetchMovie(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// Fetch cast
=======

>>>>>>> Stashed changes
=======

>>>>>>> Stashed changes
=======

>>>>>>> Stashed changes
async function fetchCast(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch cast");
  return res.json();
}

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// Render movie card
=======

>>>>>>> Stashed changes
=======

>>>>>>> Stashed changes
=======

>>>>>>> Stashed changes
function renderMovie(movie, cast) {
  const container = document.getElementById("movieCards");
  container.innerHTML = "";

  const topCast = cast.cast.slice(0, 5).map(actor => actor.name).join(", ");

  const card = document.createElement("div");
  card.classList.add("movie-card");

  card.innerHTML = `
    <img src="${getImageUrl(movie.poster_path)}" alt="${movie.title}" class="movie-poster"/>
    <h2 class="movie-title">${movie.title}</h2>
    <p class="movie-year">${movie.release_date?.split("-")[0] || "N/A"}</p>
    <p class="movie-duration">${movie.runtime ? movie.runtime + " min" : "N/A"}</p>
    <p class="movie-rating">⭐ TMDB: ${movie.vote_average.toFixed(1)}</p>
    <p class="movie-description">${movie.overview}</p>
    <p class="movie-cast"><strong>Cast:</strong> ${topCast}</p>
    <a href="https://www.imdb.com/title/${movie.imdb_id}" target="_blank" class="watch-button">
      View on IMDb
    </a>
  `;

  container.appendChild(card);
}

// Main
document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const movieId = params.get("id") || "550"; // fallback: Fight Club
=======
  const movieId = params.get("id") || "550"; 
>>>>>>> Stashed changes
=======
  const movieId = params.get("id") || "550"; 
>>>>>>> Stashed changes
=======
  const movieId = params.get("id") || "550"; 
>>>>>>> Stashed changes

  try {
    const movie = await fetchMovie(movieId);
    const cast = await fetchCast(movieId);
    renderMovie(movie, cast);
  } catch (err) {
    console.error(err);
  }
});