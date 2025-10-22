
//Rhichelle's backend
const HOME_API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGI5ZjllOWI0YmRiMDNhYWZkYjFmM2FhM2YzYTFjNyIsIm5iZiI6MTc1NzY5MTA5MS4wNiwic3ViIjoiNjhjNDNjZDMyYWE0OTJlZWMxZDI2NTRkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.3pBCgQ0z1aqjr_XqG-7ae9DlEGMCPykT5w9S1qh4pZw";
const HOME_API_KEY = "60b9f9e9b4bdb03aafdb1f3aa3f3a1c7";
const HOME_BASE_URL = "https://api.themoviedb.org/3";
const HOME_IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

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




function homeDisplayUpcoming(homeMoviesArray) {
    const homeUpcomingContainer = document.getElementById('homeMovieHeader');


    homeUpcomingContainer.innerHTML = '';

    let homeUpcomingSlider = `<div id="home-carousel-auto" class="carousel slide" carousel slide="carousel">
  <div class="carousel-inner">`;


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
    </div>`)

    }).join('');

    //  <div class="col-md-7 text-start p-4">
    //             <h2 class="movie-title">${movie.title}</h2>
    //             <p class="movie-rating"><strong>Rating:</strong> ${movie.rating.toFixed(1)} </p>
    //             <p class="release-date"><strong>Released:</strong> ${movie.releaseDate}</p>
    //             <p class="movie-overview">${movie.overview}</p>
    //         </div>


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
    <a href="#" class="home-card-button btn">Details</a>
    <a href="#" class="home-card-button btn">Watchlist</a>
  </div>
</div> 
</div>`
    ).join('');

}

function homeDisplayTopRatedMovies(homeMoviesArray) {
    const homeTopRatedContainer = document.getElementById('homeTopRatedMoviesGrid');

    homeTopRatedContainer.innerHTML = homeMoviesArray.map(movie => `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div class="card homeTopRatedMovieCard h-100" style="width: 18rem;">
  <img src="${movie.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="home-top-rated-card-title">${movie.title}</h5>
    <p class="home-top-rated-card-text">${movie.rating}</p>
    <a href="#" class="home-card-button btn">Details</a>
    <a href="#" class="home-card-button btn">Watchlist</a>
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
            const image = imagePath ? `${HOME_IMG_BASE_URL}${imagePath}` : 'https://via.placeholder.com/500x750?text=No+Image';

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
            const image = imagePath ? `${HOME_IMG_BASE_URL}${imagePath}` : 'https://via.placeholder.com/500x750?text=No+Image';

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
            const image = imagePath ? `${HOME_IMG_BASE_URL}${imagePath}` : 'https://via.placeholder.com/500x750?text=No+Image';

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

main();
//Rhichelle's backend



//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

// //Notes (by Lara)
// //In 2024 I took a gap year and got my certification in web development with Hyperiondev, in a course that consisted of HTML, CSS and javascript predominantly.
// //In my last submission, I recieved feedback that said my code was "clearly" AI assisted because my Async function syntax was more advanced than what a first year could do, and that my code had too many comments.
// //Ill admit that maybe my comments weren't specific enough in their explanations, and my async function syntax probably wasn't what you were looking for, but I'm linking my portfolio from Hyperiondev regardless, just to prove that I know what I'm doing.
// // https://www.hyperiondev.com/portfolio/234891/

// Lara's backend integrated with Kyle's
const API_KEY = "0d4ce6a4966a08401c202627e29b935a";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";


const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");




// ---FUNCTIONS (WATCHLIST AND MOVIELIBRARY)-----------------------------------------------------------------------------------------------

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

function removeFromWatchlist(movieId) {
    let list = JSON.parse(localStorage.getItem("watchList")) || [];
    list = list.filter(m => m.id !== movieId);
    localStorage.setItem("watchList", JSON.stringify(list));
    location.reload();
}


// --- MOVIE LIBRARY------------------------------------------------------------------------------

const movieGrid = document.getElementById("movieGrid");



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

        if(!movieGrid) return;

        movieGrid.innerHTML = "";

        movies.forEach((movie) => {
            const col = document.createElement("div");
            col.classList.add("col");
            col.innerHTML = `
                <div class="movie-card">
                    <img src="${movie.poster_path
                    ? IMG_BASE_URL + movie.poster_path
                    : "placeholder.jpg"
                }" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <div class="d-flex justify-content-center gap-2 mt-2">
                        <button class="btn btn-sm btn-dark" onclick="goToDetails(${movie.id
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
    
    async function loadGenres() {
        const res = await fetch(
            `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        const genreSelect = document.getElementById("genreSelect");
        if (genreSelect) {
            data.genres.forEach((genre) => {
                const option = document.createElement("option");
                option.value = genre.id;
                option.textContent = genre.name;
                genreSelect.appendChild(option);
            });
        }
    }


    document.addEventListener("DOMContentLoaded", () =>{

        const searchBtn = document.getElementById("searchBtn");
        const searchInput = document.getElementById("searchInput");
        const filterBtn = document.getElementById("filterBtn");
        const filterMenu = document.getElementById("filterMenu");
        const filterType = document.getElementById("filterType");
        const genreFilter = document.getElementById("genreFilter");
        const yearFilter = document.getElementById("yearFilter");
        const ratingFilter = document.getElementById("ratingFilter");
        const genreSelect = document.getElementById("genreSelect");
        const yearSelect = document.getElementById("yearSelect");
        const ratingSelect = document.getElementById("ratingSelect");

        //loadig cards
        loadMovies(
             `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );

        loadGenres();

        //dropdown
        if (yearSelect) {
        const currentYear = new Date().getFullYear();
        for (let y = currentYear; y >= currentYear - 50; y--) {
            const option = document.createElement("option");
            option.value = y;
            option.textContent = y;
            yearSelect.appendChild(option);
        }
    }

    //event listener
    if (searchBtn && searchInput) {
            searchBtn.addEventListener("click", () => {
                const query = searchInput.value.trim();
                if (query) {
                    loadMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
                }
            });
        }

        //filter menu listeners
        if (filterBtn && filterMenu && filterType) {
        filterBtn.addEventListener("click", () => {
            filterMenu.style.display =
                filterMenu.style.display === "none" ? "block" : "none";
        });

        filterType.addEventListener("change", () => {
            [genreFilter, yearFilter, ratingFilter].forEach(
                (el) => el && (el.style.display = "none")
            );

            if (filterType.value === "genre" && genreFilter) genreFilter.style.display = "block";
            if (filterType.value === "year" && yearFilter) yearFilter.style.display = "block";
            if (filterType.value === "rating" && ratingFilter) ratingFilter.style.display = "block";

            if (filterType.value === "all") {
                loadMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`);
            }
        });
    }

    //filter action listeners
    if (genreSelect) {
        genreSelect.addEventListener("change", (e) => {
            const genreId = e.target.value;
            if (genreId) {
                loadMovies(
                    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
                );
            }
        });
    }

   if (yearSelect) {
        yearSelect.addEventListener("change", (e) => {
            const year = e.target.value;
            if (year) {
                loadMovies(
                    `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${year}`
                );
            }
        });
    }


if (ratingSelect) {
        ratingSelect.addEventListener("change", (e) => {
            const rating = e.target.value;
            if (rating) {
                loadMovies(
                    `${BASE_URL}/discover/movie?api_key=${API_KEY}&vote_average.gte=${rating}`
                );
            }
        });
    }


    });


    // searchBtn.addEventListener("click", () => {
    //     const query = searchInput.value.trim();
    //     if (query) {
    //         loadMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    //     }
    // });

    // const filterBtn = document.getElementById("filterBtn");
    // const filterMenu = document.getElementById("filterMenu");
    // const filterType = document.getElementById("filterType");
    // const genreFilter = document.getElementById("genreFilter");
    // const yearFilter = document.getElementById("yearFilter");
    // const ratingFilter = document.getElementById("ratingFilter");

    // if (filterBtn && filterMenu && filterType) {
    //     filterBtn.addEventListener("click", () => {
    //         filterMenu.style.display =
    //             filterMenu.style.display === "none" ? "block" : "none";
    //     });

    //     filterType.addEventListener("change", () => {
    //         [genreFilter, yearFilter, ratingFilter].forEach(
    //             (el) => el && (el.style.display = "none")
    //         );

    //         if (filterType.value === "genre" && genreFilter) genreFilter.style.display = "block";
    //         if (filterType.value === "year" && yearFilter) yearFilter.style.display = "block";
    //         if (filterType.value === "rating" && ratingFilter) ratingFilter.style.display = "block";

    //         if (filterType.value === "all") {
    //             loadMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`);
    //         }
    //     });
    // }

    // async function loadGenres() {
    //     const res = await fetch(
    //         `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    //     );
    //     const data = await res.json();
    //     const genreSelect = document.getElementById("genreSelect");
    //     if (genreSelect) {
    //         data.genres.forEach((genre) => {
    //             const option = document.createElement("option");
    //             option.value = genre.id;
    //             option.textContent = genre.name;
    //             genreSelect.appendChild(option);
    //         });
    //     }
    // }
    // loadGenres();

    // const yearSelect = document.getElementById("yearSelect");
    // if (yearSelect) {
    //     const currentYear = new Date().getFullYear();
    //     for (let y = currentYear; y >= currentYear - 50; y--) {
    //         const option = document.createElement("option");
    //         option.value = y;
    //         option.textContent = y;
    //         yearSelect.appendChild(option);
    //     }
    // }


    // const genreSelect = document.getElementById("genreSelect");
    // if (genreSelect) {
    //     genreSelect.addEventListener("change", (e) => {
    //         const genreId = e.target.value;
    //         if (genreId) {
    //             loadMovies(
    //                 `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    //             );
    //         }
    //     });
    // }

    // const yearSelectListener = document.getElementById("yearSelect");
    // if (yearSelectListener) {
    //     yearSelectListener.addEventListener("change", (e) => {
    //         const year = e.target.value;
    //         if (year) {
    //             loadMovies(
    //                 `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${year}`
    //             );
    //         }
    //     });
    // }

    // const ratingSelect = document.getElementById("ratingSelect");
    // if (ratingSelect) {
    //     ratingSelect.addEventListener("change", (e) => {
    //         const rating = e.target.value;
    //         if (rating) {
    //             loadMovies(
    //                 `${BASE_URL}/discover/movie?api_key=${API_KEY}&vote_average.gte=${rating}`
    //             );
    //         }
    //     });
    // }






// --- WATCHLIST ---------------------------------------------------------------------------------

const watchlistContainer = document.getElementById("watchlistGrid");

if (watchlistContainer) {

    let watchList = JSON.parse(localStorage.getItem("watchList")) || [];



    if (watchList.length === 0) {
        watchlistContainer.innerHTML = "<p class='text-center mt-5 w-100'>No movies in your watchlist yet!</p>";
    } else {
        watchList.forEach(movie => {
            const col = document.createElement("div");

            col.classList.add("col");
            col.innerHTML = `

                <div class="movie-card">
                    <img src="${movie.poster_path
                    ? IMG_BASE_URL + movie.poster_path
                    : "placeholder.jpg"
                }" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <div class="d-flex justify-content-center gap-2 mt-2">
                        <button class="btn btn-sm btn-dark" onclick="goToDetails(${movie.id})">Details</button>
                        <button class="btn btn-sm btn-danger" onclick="removeFromWatchlist(${movie.id})">Remove</button>
                    </div>
                </div>
            `;
            watchlistContainer.appendChild(col);
        });
    }
}


//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000