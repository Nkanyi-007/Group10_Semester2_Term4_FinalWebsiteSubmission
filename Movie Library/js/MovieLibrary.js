//Setting up the TMDB API
const API_KEY = "0d4ce6a4966a08401c202627e29b935a";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const movieGrid = document.getElementById("movieGrid");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

//Fetching popular movies on load
document.addEventListener("DOMContentLoaded", () => {
  fetchMovies(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    25
  );
});

//The fetch movies function
async function fetchMovies(url, limit = 25) {
  try {
    let movies = [];

    let page = 1;
    while (movies.length < limit) {
      const res = await fetch(`${url}&page=${page}`);
      const data = await res.json();

      movies = [...movies, ...data.results];
      page++;
    }
    movies = movies.slice(0, limit);

    displayMovies(movies);
  } catch (error) {
    console.error("Error fetching movies: ", error);
  }
}

//Displaying movies on the grid
function displayMovies(movies) {
  movieGrid.innerHTML = "";

  movies.forEach((movie) => {
    const col = document.createElement("div");
    col.classList.add("col");

    col.innerHTML = `
      <div class="movie-card">
        <img src="${
          movie.poster_path
            ? IMG_BASE_URL + movie.poster_path
            : "/Movie Library/assets/placeholder.jpg"
        }" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <button onclick="addToWatchlist('${movie.id}')">Add</button>
      </div>
    `;

    movieGrid.appendChild(col);
  });
}

//Search functionality
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
      25
    );
  }
});

//Placeholder Watchlist
function addToWatchlist(movieId) {
  alert(`Movie ${movieId} added to Watchlist!`);
}

//Filter function
const filterBtn = document.getElementById("filterBtn");
const filterMenu = document.getElementById("filterMenu");
const filterType = document.getElementById("filterType");
const genreFilter = document.getElementById("genreFilter");
const yearFilter = document.getElementById("yearFilter");
const ratingFilter = document.getElementById("ratingFilter");

//toggle filter menu
filterBtn.addEventListener("click", () => {
  filterMenu.style.display =
    filterMenu.style.display === "none" ? "block" : "none";
});

//Changing Filter type
filterType.addEventListener("change", () => {
  //hide
  [genreFilter, yearFilter, ratingFilter].forEach(
    (el) => (el.style.display = "none")
  );

  if (filterType.value === "genre") genreFilter.style.display = "block";
  if (filterType.value === "year") yearFilter.style.display = "block";
  if (filterType.value === "rating") ratingFilter.style.display = "block";

  if (filterType.value === "all") {
    fetchMovies(
      `${BASE_URL}/movie/popular?api+key=${API_KEY}&language=en-US`,
      25
    );
  }
});

//populating genres
async function loadGenres() {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  const data = await ReadableByteStreamController.json();
  const genreSelect = document.getElementById("genreSelect");
  data.genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.name;
    genreSelect.appendChild(option);
  });
}
loadGenres();

//populating years/
const yearSelect = document.getElementById("yearSelect");
const currentYear = new Date().getFullYear();
for (let y = currentYear; y >= currentYear - 50; y--) {
  const option = document.createElement("option");
  option.value = y;
  option.textContent = y;
  yearSelect.appendChild(option);
}

//Applying filters
document.getElementById("genreSelect").addEventListener("change", (e) => {
  const genreId = e.target.value;
  if (genreId) {
    fetchMovies(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`,
      25
    );
  }
});

document.getElementById("yearSelect").addEventListener("change", (e) => {
  const year = e.target.value;
  if (year) {
    fetchMovies(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${year}`,
      25
    );
  }
});

document.getElementById("ratingSelect").addEventListener("change", (e) => {
  const rating = e.target.value;
  if (rating) {
    fetchMovies(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&vote_average.gte=${rating}`,
      25
    );
  }
});
