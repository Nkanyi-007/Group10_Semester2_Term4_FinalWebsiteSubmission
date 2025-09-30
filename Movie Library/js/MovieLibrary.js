//Setting up the TMDB API
const API_KEY = "0d4ce6a4966a08401c202627e29b935a";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const movieGrid = document.getElementById("movieGrid");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

//Fetching popular movies on load
document.addEventListener("DOMContentLoaded" ,() => {
    fetchMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
});

//The fetch movies function
async function fetchMovies(url) {
    try{
        const red = await fetch (url);
        const data = await res.json();
        displayMovies(data.results);
    } catch (error) {
        console.error("Error fetching movies: ", error);
    }
}

//Displaying movies on the grid
