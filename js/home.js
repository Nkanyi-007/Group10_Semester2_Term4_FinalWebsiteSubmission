const HOME_API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGI5ZjllOWI0YmRiMDNhYWZkYjFmM2FhM2YzYTFjNyIsIm5iZiI6MTc1NzY5MTA5MS4wNiwic3ViIjoiNjhjNDNjZDMyYWE0OTJlZWMxZDI2NTRkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.3pBCgQ0z1aqjr_XqG-7ae9DlEGMCPykT5w9S1qh4pZw";
const HOME_API_KEY = "60b9f9e9b4bdb03aafdb1f3aa3f3a1c7";
const HOME_BASE_URL = "https://api.themoviedb.org/3";
const HOME_IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${HOME_API_KEY}`
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

    let homeUpcomingSlider = `<div id="home-carousel-auto" class="carousel slide" data-bs-ride="carousel">
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

      <div class="col-md-7 text-start p-4">
                <h2 class="movie-title">${movie.title}</h2>
                <p class="movie-rating"><strong>Rating:</strong> ${movie.rating.toFixed(1)} </p>
                <p class="release-date"><strong>Released:</strong> ${movie.releaseDate}</p>
                <p class="movie-overview">${movie.overview}</p>
            </div>
        </div>
    </div>`)

    }).join('');

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
            <div class="card" style="width: 18rem;">
  <img src="${movie.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">${movie.overview}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> `
    );

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
                apiMovie.overview
            );
        });

        console.log("Processed Movies:", movies);


        const limitedMovies = movies.slice(0, 3); //0 starts index, and it goes up to 3 but doesn't incl it (0,1,2 = 3 movies displayed)
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
                apiMovie.overview
            );
        });

        console.log("Processed Movies:", movies);


        const limitedMovies = movies.slice(0, 8); 
        homeDisplayPopularMovies(limitedMovies);
        //everything passes through newly created arrays, and then display it
        //have to display the movies that's been sliced/reduced
    }
}


async function main() {
    await Promise.all([
        homeDisplayUpcomingMovies(),
        homeDisplayFetchPopularMovies()
    ]);
    console.log("All home page sections loaded!");

}

main();
