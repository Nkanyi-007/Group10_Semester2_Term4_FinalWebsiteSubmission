class Movie{
    constructor(image,  title, date, rating, inWatchlist){
        this.image = image;
        this.date = date;
        this.title = title;
        this.rating = rating;
        this.inWatchlist = inWatchlist;

    }
}





const movieGrid = document.getElementById("movieGrid");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");






function toggleInWatchlist() {
        this.inWatchlist = !this.inWatchlist;
        return this.inWatchlist; // returns the new state
        
    }
console.log(this.inWatchlist);



// API, Movie Lists---------------------------------------------------------------------------------------------------

!async function() {
    const url = 'https://api.themoviedb.org/3/movie/top_rated';
   
   const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzcxMWM0MTFiMjFkOGRhODVmNWZkYWYzZTJlNDNkOCIsIm5iZiI6MTc1NzY5MTIwOS42Nywic3ViIjoiNjhjNDNkNDljYjhkZGZiMGVmYmFjYjZlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.JLBh6NihKbRa2gGLg7ja51KCqPjMGtAmOwltEm8SZSQ'
  }
};

// fetch('https://api.themoviedb.org/3/movie/movie_id?language=en-US', options)
//   .then(res => res.json())
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

    let data = await fetch(url, options)
    .then((response)=> response.json())
    .then((result)=> {return result})
    .catch((error)=> console.log(error));
    
    console.log(data);

    let movieList = [];

    


    for (i = 0; i < data.results.length; i++){
        let image = data.results[i].poster_path;
        let title = data.results[i].title;
        let date = data.results[i].release_date;
        let rating = data.results[i].vote_average;
        let inWatchlist = false;

         movieList.push(window["movie_" + i] = new Movie(image, title, date, rating, inWatchlist));

    }

    console.log(movieList);



  




    //Best Movies------------------------------------------------------------------------------------------------



//     let bestMovies = movieList.filter(isHighlyRated);

//     console.log(bestMovies);

//     bestMovies.forEach(movie => { //change to movieList, and give more cards

//         document.getElementById('movieCards').innerHTML += `<div class="col.md-3">
                        
//                         <div class="card" >
//                 <img src="${movie.image}" class="card-img-top" alt="...">
//                 <div class="card-body">
//                     <h5 class="card-title">Card ${movie.title}</h5>
//                     <p class="card-text">Rating is ${movie.rating}</p>
//                     <a href="#" class="btn btn-primary">Go somewhere</a>
//                     <button  onclick="toggleInWatchlist('amountBtn1')">AAA</button>
//                 </div>
//                 </div>
        
//         </div>     
//         `

//     });


 }();




//document.elemnetbyid $(#moviecards) -------- jquery stuff




//Watchlist Pull code --------------------------------------------------------------------------

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
const watchList = JSON.parse(localStorage.getItem("watchList")) || [];
const container = document.getElementById("watchlistGrid");

if (watchList.length === 0) {
  container.innerHTML = "<p>No movies in your watchlist yet!</p>";
} else {
  watchList.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.innerHTML = `
      <img src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <button onclick="removeFromWatchlist(${movie.id})">Remove</button>
    `;
    container.appendChild(card);
  });
}

function removeFromWatchlist(movieId) {
  let list = JSON.parse(localStorage.getItem("watchList")) || [];
  list = list.filter(m => m.id !== movieId);
  localStorage.setItem("watchList", JSON.stringify(list));
  location.reload();
}




    
//Movies------------------------------------------------------------------------------------------------

//Movies------------------------------------------------------------------------------------------------

//Movies------------------------------------------------------------------------------------------------