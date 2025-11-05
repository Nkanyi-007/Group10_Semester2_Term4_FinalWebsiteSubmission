
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//RHICHELLE STRAUSS 251169 SECTION
//BACKEND FOR HOMEPAGE & SIGNUP     
const HOME_API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGI5ZjllOWI0YmRiMDNhYWZkYjFmM2FhM2YzYTFjNyIsIm5iZiI6MTc1NzY5MTA5MS4wNiwic3ViIjoiNjhjNDNjZDMyYWE0OTJlZWMxZDI2NTRkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.3pBCgQ0z1aqjr_XqG-7ae9DlEGMCPykT5w9S1qh4pZw";
const HOME_API_KEY = "60b9f9e9b4bdb03aafdb1f3aa3f3a1c7";
const HOME_BASE_URL = "https://api.themoviedb.org/3";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${HOME_API_TOKEN}`
    }
};

class homeMovie {
    constructor(image, title, releaseDate, rating, overview, popularity) {
        this.image = image;
        this.title = title;
        this.releaseDate = releaseDate;
        this.rating = rating;
        this.overview = overview;
        this.popularity = popularity;
    }
}
function showName() {
    let savedName = localStorage.getItem("userName");

    if (document.getElementById('displayName')) {
        document.getElementById('displayName').innerHTML = "Welcome " + savedName;
    }
}

showName();
//calls function as it loads
//if the display name exists it shows it 

if (document.getElementById("homeMovieHeader")) {
    function homeDisplayUpcoming(homeMoviesArray) {
        const homeUpcomingContainer = document.getElementById('homeMovieHeader');


        homeUpcomingContainer.innerHTML = '';

        let homeUpcomingSlider = `<div id="home-carousel-auto" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">`;
//map loops through array and creates string to embed the image for each movie object

        //map store 2 params, movie - movies data, index is the index in the array - 0,1,2 etc
        // {} using that in arrow func - add more processing into func then specify what func actually guives back w return
        // by using ternary ops can assign active only to first item in caresoul, index in array
        homeUpcomingSlider += homeMoviesArray.map((movie, index) => {
            const active = index == 0 ? 'active' : '';
            //index - only first item in array get active

            return (`
            <div class="carousel-item ${active}">
                <img src="${movie.image}" class="d-block w-100" >
            </div>
        `)

        }).join('');
//joins the html arrays to one string



        homeUpcomingSlider += `</div>
  <button class="carousel-control-prev" type="button" data-bs-target="#home-carousel-auto" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#home-carousel-auto" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

        homeUpcomingContainer.innerHTML = homeUpcomingSlider;
    }

    function homeDisplayPopularMovies(homeMoviesArray) {
        const homePopularContainer = document.getElementById('homePopularMoviesGrid');


        homePopularContainer.innerHTML = homeMoviesArray.map(movie => `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="homePopularMovieCard" style="width: 18rem;">
  <img src="${movie.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="home-popular-card-title">${movie.title}</h5>
    <p class="home-popular-card-text">${movie.popularity}</p>
    <div class="d-flex justify-content-center gap-2 mt-2">
                        <button class="movie-card-details-btn btn" onclick="goToDetails(${movie.id
            })">Details</button>
                        <button class="movie-card-watchlist-btn btn" onclick='addToWatchlist(${JSON.stringify(
                movie
            )})'>Add to Watchlist</button>
                    </div>
  </div>
</div> 
</div>`
        ).join('');

    }

    function homeDisplayTopRatedMovies(homeMoviesArray) {
        const homeTopRatedContainer = document.getElementById('homeTopRatedMoviesGrid');

        homeTopRatedContainer.innerHTML = homeMoviesArray.map(movie => `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div class="card homeTopRatedMovieCard" style="width: 18rem;">
  <img src="${movie.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="home-top-rated-card-title">${movie.title}</h5>
    <p class="home-top-rated-card-text">${movie.rating}</p>
    <div class="d-flex justify-content-center gap-2 mt-2">
                        <button class="movie-card-details-btn btn" onclick="goToDetails(${movie.id
            })">Details</button>
                        <button class="movie-card-watchlist-btn btn" onclick='addToWatchlist(${JSON.stringify(
                movie
            )})'>Add to Watchlist</button>
                    </div>
  </div>
</div> 
</div>
        
        `).join('');
    }


    async function homeDisplayUpcomingMovies() {
        const url = `${HOME_BASE_URL}/movie/upcoming?language=en-US&page=1`;

        let data = await fetch(url, options)
            .then((response) => response.json())
            .then((result) => { return result })
            .catch((error) => console.log(error));

        if (data && data.results) {
            console.log("Fetched Data:", data);


            const movies = data.results.map(apiMovie => {
                const imagePath = apiMovie.backdrop_path;
                const image = imagePath ? `${BACKDROP_BASE_URL}${imagePath}` : 'https://via.placeholder.com/500x750?text=No+Image';

                return new homeMovie(
                    image,
                    apiMovie.title,
                    apiMovie.release_date,
                    apiMovie.vote_average,
                    apiMovie.overview,
                    apiMovie.popularity
                );
            });

            console.log("Processed Movies:", movies);


            const limitedMovies = movies.slice(0, 4); //0 starts index, and it goes up to 3 but doesn't incl it (0,1,2 = 3 movies displayed)
            homeDisplayUpcoming(limitedMovies);
        }
    }

    async function homeDisplayFetchPopularMovies() {
        const url = `${HOME_BASE_URL}/movie/popular?language=en-US&page=1`

        let data = await fetch(url, options)
            .then((response) => response.json())
            .then((result) => { return result })
            .catch((error) => console.log(error));

        if (data && data.results) {
            console.log("Fetched Data:", data);


            const movies = data.results.map(apiMovie => {
                const imagePath = apiMovie.poster_path;
                const image = imagePath ? `${POSTER_BASE_URL}${imagePath}` : 'https://via.placeholder.com/500x750?text=No+Image';

                return new homeMovie(
                    image,
                    apiMovie.title,
                    apiMovie.release_date,
                    apiMovie.vote_average,
                    apiMovie.overview,
                    apiMovie.popularity
                );
            });

            console.log("Processed Movies:", movies);


            const limitedMovies = movies.slice(0, 8);
            homeDisplayPopularMovies(limitedMovies);
            //everything passes through newly created arrays, and then display it
            //have to display the movies that's been sliced/reduced
        }
    }


    async function homeDisplayFetchTopRatedMovies() {
        const url = `${HOME_BASE_URL}/movie/top_rated?language=en-US&page=1`

        let data = await fetch(url, options)
            .then((response) => response.json())
            .then((result) => { return result })
            .catch((error) => console.log(error));

        if (data && data.results) {
            console.log("Fetched Data:", data);


            const movies = data.results.map(apiMovie => {
                const imagePath = apiMovie.poster_path;
                const image = imagePath ? `${POSTER_BASE_URL}${imagePath}` : 'https://via.placeholder.com/500x750?text=No+Image';

                return new homeMovie(
                    image,
                    apiMovie.title,
                    apiMovie.release_date,
                    apiMovie.vote_average,
                    apiMovie.overview
                );
            });

            console.log("Processed Movies:", movies);


            const limitedMovies = movies.slice(0, 8);
            homeDisplayTopRatedMovies(limitedMovies);
            //everything passes through newly created arrays, and then display it
            //have to display the movies that's been sliced/reduced
        }
    }



    async function main() {
        await Promise.all([
            homeDisplayUpcomingMovies(),
            homeDisplayFetchPopularMovies(),
            homeDisplayFetchTopRatedMovies()
        ]);
        console.log("All home page sections loaded!");

    }
    //starts all my sections 
    //await makes sure the console doesnt run until all sections have loaded

    main();
//calls main function for whole page
}

//displaying the username 
if (document.getElementById("loginContainer") || document.getElementById("signupPageContainer")) {
    let username;

    document.getElementById("loginContainer").addEventListener("submit", e => {
        e.preventDefault();
        username = document.getElementById("logInEmail").value;

        localStorage.setItem("userName", username);

    });
//gets log in container from sign up
//listens for event listener (log in)
//saves username with the log in value 
//set item to local storage to display


    //( •̀ ω •́ )✧
    //✧✧✧✧✧✧✧✧ SIGNUP/LOGIN PAGE CODE ✧✧✧✧✧✧✧✧ᓚᘏᗢ//
    if (document.getElementById("signupPageContainer")) {
        console.log("RUNNINFFFFFFF");


        const signUpButton = document.getElementById('signUp');
        const logInButton = document.getElementById('logIn');
        const container = document.getElementById('signupPageContainer');
        if (signUpButton) {
            signUpButton.addEventListener('click', () => container.classList.add("right-panel-active"));
        }

        //when sign up clicked css right panel is addded
        if (logInButton) {
            logInButton.addEventListener('click', () => container.classList.remove("right-panel-active"));
        }


        if (window.jQuery) {
            const $signupPageContainer = $('#signupPageContainer');
            $('#signUpbtn').on('click', () => $signupPageContainer.addClass('right-panel-active'));
            $('#logIn').on('click', () => $signupPageContainer.removeClass('right-panel-active'));
        }
    }
}


//☆*: .｡. o(≧▽≦)o .｡.:*☆
//HOMEPAGE AND SIGNUP PAGE SECTION DONE
//Rhichelle's backend  ᓚᘏᗢ
//------------------------------------------------------------------------------------------------------------------------------------------------------



//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

const API_KEY = "0d4ce6a4966a08401c202627e29b935a";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const movieGrid = document.getElementById("movieGrid");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");




// ---FUNCTIONS (WATCHLIST AND MOVIELIBRARY)-----------------------------------------------------------------------------------------------

function goToDetails(movieId) {
    window.location.href = `movie.html?id=${movieId}`;
}
function addToWatchlistFromElement(button) {
    console.log("Adding to watch list");

    const card = button.closest('.card, .movie-card');
    const title = card.querySelector('h5, h3')?.textContent.trim();
    const image = card.querySelector('img')?.src;
    const movieId = card.dataset.movieId; // get the movie id

    const movie = {
        id: movieId,
        title: title,
        image: image
    };

    addToWatchlist(movie);

    button.style.display = "none";
    const removeButton = card.querySelector('.movie-card-remove-btn');
    if (removeButton) removeButton.style.display = "inline-block";
}

function removeFromWatchlistFromElement(button) {
    const card = button.closest('.card, .movie-card');
    const movieId = card.dataset.movieId;

    let watchList = JSON.parse(localStorage.getItem("watchList")) || [];
    watchList = watchList.filter(m => m.id != movieId);
    localStorage.setItem("watchList", JSON.stringify(watchList));



    location.reload();
}



function addToWatchlist(movie) {
    let watchList = JSON.parse(localStorage.getItem("watchList")) || [];

    if (watchList.some((m) => m.id === movie.id)) {


        return;
    }

    watchList.push(movie);
    localStorage.setItem("watchList", JSON.stringify(watchList));


}

function removeFromWatchlist(movieId) {
    let list = JSON.parse(localStorage.getItem("watchList")) || [];
    list = list.filter(m => m.id !== movieId);
    localStorage.setItem("watchList", JSON.stringify(list));
    location.reload();
}







// --- MOVIE LIBRARY------------------------------------------------------------------------------
if (document.getElementById("movieGrid")) {
    const movieGrid = document.getElementById("movieGrid");
    const filterBtn = document.getElementById("filterBtn");
    const filterMenu = document.getElementById("filterMenu");
    const filterType = document.getElementById("filterType");
    const genreFilter = document.getElementById("genreFilter");
    const yearFilter = document.getElementById("yearFilter");
    const ratingFilter = document.getElementById("ratingFilter");
    const genreSelect = document.getElementById("genreSelect");
    const yearSelect = document.getElementById("yearSelect");
    const ratingSelect = document.getElementById("ratingSelect");

    const filters = {
        genre: "",
        year: "",
        rating: "",
        search: "",
    };

    function buildURL() {
        const params = new URLSearchParams({ api_key: HOME_API_KEY, language: "en-US" });
        if (filters.genre) params.append("with_genres", filters.genre);
        if (filters.year) params.append("primary_release_year", filters.year);
        if (filters.rating) params.append("vote_average.gte", filters.rating);
        if (filters.search) {
            params.append("query", filters.search);
            return `${HOME_BASE_URL}/search/movie?${params.toString()}`;
        }
        return `${HOME_BASE_URL}/discover/movie?${params.toString()}`;
    }

    async function loadMovies() {
        const url = buildURL();
        try {
            const res = await fetch(url, options);
            const data = await res.json();
            displayMovies(data.results.slice(0, 25));
        } catch (err) {
            console.error("Fetch error:", err);
        }
    }

    function displayMovies(movies) {
        movieGrid.innerHTML = "";
        movies.forEach((movie) => {
            const col = document.createElement("div");
            col.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4");
            const watchList = JSON.parse(localStorage.getItem("watchList")) || [];
            const isInWatchlist = watchList.some(m => m.id == movie.id);

            const addBtnStyle = isInWatchlist ? "display:none;" : "";
            const removeBtnStyle = isInWatchlist ? "display:inline-block;" : "display:none;";

            col.innerHTML = `
                    <div class="movie-card" data-movie-id="${movie.id}">
                        <img src="${movie.poster_path ? POSTER_BASE_URL + movie.poster_path : "https...text=No+Poster"}" alt="${movie.title}">
                        <h3>${movie.title}</h3>
                        <div class="d-flex justify-content-center gap-2 mt-2">
                            <button class="movie-card-details-btn btn btn-sm" onclick="goToDetails(${movie.id})">Details</button>
                            <button class="movie-card-watchlist-btn btn btn-sm"  onclick="addToWatchlistFromElement(this)" style="${addBtnStyle}">Add to Watchlist</button>
                            <button class="movie-card-remove-btn btn btn-sm" onclick="removeFromWatchlistFromElement(this)" style="${removeBtnStyle}">Remove from Watchlist</button>
                        </div>
                    </div>
                `;
            movieGrid.appendChild(col);
        });
    }

    async function loadGenres() {
        try {
            const res = await fetch(`${HOME_BASE_URL}/genre/movie/list?api_key=${HOME_API_KEY}`, options);
            const data = await res.json();
            data.genres.forEach((genre) => {
                const option = document.createElement("option");
                option.value = genre.id;
                option.textContent = genre.name;
                genreSelect.appendChild(option);
            });
        } catch (err) {
            console.error("Error loading genres:", err);
        }
    }

    if (filterBtn) {
        filterBtn.addEventListener("click", () => filterMenu.classList.toggle("active"));
    }
    if (filterType) {
        filterType.addEventListener("change", () => {
            [genreFilter, yearFilter, ratingFilter].forEach(el => el.style.display = "none");
            if (filterType.value === "genre") genreFilter.style.display = "block";
            if (filterType.value === "year") yearFilter.style.display = "block";
            if (filterType.value === "rating") ratingFilter.style.display = "block";
            if (filterType.value === "all") {
                filters.genre = filters.year = filters.rating = "";
                loadMovies();
            }
        });
    }
    if (genreSelect) {
        genreSelect.addEventListener("change", (e) => {
            filters.genre = e.target.value;
            loadMovies();
        });
    }
    if (yearSelect) {
        const currentYear = new Date().getFullYear();
        for (let y = currentYear; y >= currentYear - 50; y--) {
            const option = document.createElement("option");
            option.value = y;
            option.textContent = y;
            yearSelect.appendChild(option);
        }
        yearSelect.addEventListener("change", (e) => {
            filters.year = e.target.value;
            loadMovies();
        });
    }
    if (ratingSelect) {
        ratingSelect.addEventListener("change", (e) => {
            filters.rating = e.target.value;
            loadMovies();
        });
    }

    loadGenres();
    loadMovies();
}


// --- WATCHLIST PAGE------------------------------------------------------------------------------



if (document.getElementById("watchlistGrid")) {

    const watchlistContainer = document.getElementById("watchlistGrid");
    let watchList = JSON.parse(localStorage.getItem("watchList")) || [];

    if (watchList.length === 0) {
        watchlistContainer.innerHTML = "<p class='watchlist-message text-center mt-5 w-100'>No movies in your watchlist yet!</p>";
    } else {
        console.log(watchList);

        watchList.forEach(movie => {
            const col = document.createElement("div");
            col.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4");

            col.innerHTML = `
                    <div class="movie-card" data-movie-id="${movie.id}">
                        <img src="${movie.image || 'https://via.placeholder.com/500x750?text=No+Poster'}" alt="${movie.title}">
                        <h3>${movie.title}</h3>
                        <div class="d-flex justify-content-center gap-2 mt-2">
                            <button class="movie-card-details-btn btn btn-sm" onclick="goToDetails(${movie.id})">Details</button>
                            <button class="movie-card-remove-btn btn btn-sm" onclick="removeFromWatchlistFromElement(this)">Remove</button>
                        </div>
                    </div>
                `;
            watchlistContainer.appendChild(col);
        });
    }
}

//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000


// Nkanyiso
// indivdual movie page code
// ---------------------------------------------------------------------------------------------------------------------------------

const TMDB_KEY = "90585727dddc037ab146b226b877e75c";   // Replace with your TMDB key
const OMDB_KEY = "40ccbe12";   // Replace with your OMDb key
const MOVIE_ID = "132";                 // Example: The Godfather

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
      <div class="individual-movie-card">
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
        document.getElementById("individualMovieCards").innerHTML = cardHTML;

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
