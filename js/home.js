class Movie {
    constructor(image, title, releaseDate, rating, overview, popularity) {
        this.image = image;
        this.title = title;
        this.releaseDate = releaseDate;
        this.rating = rating;
        this.overview = overview;
        this.popularity = popularity;
    }
}

// function isHighlyRated(movie){
//     return parseInt(movie.rating) >= 7;
// }

function displayMovies(moviesArray) {
    const movieHeaderContainer = document.getElementById('movieHeader');

    movieHeaderContainer.innerHTML = '';

    let movieSlider = `<div id="carouselExample" class="carousel slide" >
  <div class="carousel-inner">`;

    //map store 2 params, movie - movies data, index is the index in the array - 0,1,2 etc
    // {} using that in arrow func - add more processing into func then specify what func actually guives back w return
    // by using ternary ops can assign active only to first item in caresoul, index in array

    movieSlider += moviesArray.map((movie, index) => {
        const active = index == 0 ? 'active' : '';
        //index - only first item in array get active

        return (
        `
        <div class="carousel-item ${active}">
        <div class="row align-items-center">


            <div class="col-md-5">
                <img src="${movie.image}" class="d-block w-100" alt="${movie.title}">
            </div>


            <div class="col-md-7 text-start p-4">
                <h2 class="movie-title">${movie.title}</h2>
                <p class="movie-rating"><strong>Rating:</strong> ${movie.rating.toFixed(1)} </p>
                <p class="release-date"><strong>Released:</strong> ${movie.releaseDate}</p>
                <p class="movie-overview">${movie.overview}</p>
            </div>


        </div>
    </div>
    `)

    }).join(''); //converts to 1 string
    movieSlider += `</div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
    movieHeaderContainer.innerHTML = movieSlider;
}

!async function () {

    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
    const now = new Date();

    const firstDayOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        .toISOString().split('T')[0];


    const lastDayOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0)
        .toISOString().split('T')[0];

    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&sort_by=primary_release_date.desc&primary_release_date.gte=${firstDayOfPreviousMonth}&primary_release_date.lte=${lastDayOfPreviousMonth}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGI5ZjllOWI0YmRiMDNhYWZkYjFmM2FhM2YzYTFjNyIsIm5iZiI6MTc1NzY5MTA5MS4wNiwic3ViIjoiNjhjNDNjZDMyYWE0OTJlZWMxZDI2NTRkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.3pBCgQ0z1aqjr_XqG-7ae9DlEGMCPykT5w9S1qh4pZw'

        }
    };

}();

