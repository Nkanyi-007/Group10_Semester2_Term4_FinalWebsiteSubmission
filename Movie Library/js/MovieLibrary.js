const API_KEY = "0d4ce6a4966a08401c202627e29b935a";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const movieGrid = document.getElementById("movieGrid");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

document.addEventListener("DOMContentLoaded", () => {
  loadMovies(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
});

async function loadMovies(url, limit = 25) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const movies = data.results.slice(0, limit);
    displayMovies(movies);
  } catch (err) {
    console.log("fetch error:", err);
  }
}

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
            : "placeholder.jpg"
        }" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <div class="d-flex justify-content-center gap-2 mt-2">
          <button class="btn btn-sm btn-dark" onclick="goToDetails(${
            movie.id
          })">Details</button>
          <button class="btn btn-sm btn-success" onclick='addToWatchlist(${JSON.stringify(
            movie
          )})'>Add to Watchlist</button>
        </div>
      </div>
    `;
    movieGrid.appendChild(col);
  });
}

function goToDetails(movieId) {
  window.location.href = `movie.html?id=${movieId}`;
}

function addToWatchlist(movie) {
  let watchList = JSON.parse(localStorage.getItem("watchList")) || [];

  if (watchList.some((m) => m.id === movie.id)) {
    alert(`${movie.title} is already in your Watchlist!`);
    return;
  }

  watchList.push(movie);
  localStorage.setItem("watchList", JSON.stringify(watchList));
  alert(`${movie.title} added to your Watchlist!`);
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    loadMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  }
});

const filterBtn = document.getElementById("filterBtn");
const filterMenu = document.getElementById("filterMenu");
const filterType = document.getElementById("filterType");
const genreFilter = document.getElementById("genreFilter");
const yearFilter = document.getElementById("yearFilter");
const ratingFilter = document.getElementById("ratingFilter");

filterBtn.addEventListener("click", () => {
  filterMenu.style.display =
    filterMenu.style.display === "none" ? "block" : "none";
});

filterType.addEventListener("change", () => {
  [genreFilter, yearFilter, ratingFilter].forEach(
    (el) => (el.style.display = "none")
  );

  if (filterType.value === "genre") genreFilter.style.display = "block";
  if (filterType.value === "year") yearFilter.style.display = "block";
  if (filterType.value === "rating") ratingFilter.style.display = "block";

  if (filterType.value === "all") {
    loadMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`);
  }
});

async function loadGenres() {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  const genreSelect = document.getElementById("genreSelect");
  data.genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.name;
    genreSelect.appendChild(option);
  });
}
loadGenres();

const yearSelect = document.getElementById("yearSelect");
const currentYear = new Date().getFullYear();
for (let y = currentYear; y >= currentYear - 50; y--) {
  const option = document.createElement("option");
  option.value = y;
  option.textContent = y;
  yearSelect.appendChild(option);
}

document.getElementById("genreSelect").addEventListener("change", (e) => {
  const genreId = e.target.value;
  if (genreId) {
    loadMovies(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );
  }
});

document.getElementById("yearSelect").addEventListener("change", (e) => {
  const year = e.target.value;
  if (year) {
    loadMovies(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${year}`
    );
  }
});

document.getElementById("ratingSelect").addEventListener("change", (e) => {
  const rating = e.target.value;
  if (rating) {
    loadMovies(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&vote_average.gte=${rating}`
    );
  }
});

//Notes
//In 2024 I took a gap year and got my certification in web development with Hyperiondev, in a course that consisted of HTML, CSS and javascript predominantly.
//In my last submission, I recieved feedback that said my code was "clearly" AI assisted because my Async function syntax was more advanced than what a first year could do, and that my code had too many comments.
//Ill admit that maybe my comments weren't specific enough in their explanations, and my async function syntax probably wasn't what you were looking for, but I'm linking my portfolio from Hyperiondev regardless, just to prove that I know what I'm doing.
// https://www.hyperiondev.com/portfolio/234891/