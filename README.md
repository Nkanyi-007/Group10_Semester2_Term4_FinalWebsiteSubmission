**P1xie Flix**



------------------------------------------------------

Live site: https://p1xieflix.web.app


**Overview**

P1xie Flix is a retro-inspired, user-friendly movie streaming website designed to create and easy, fun viewing experience for its users. The platform lets users sign in, browse a curated library of movies, save favorites to a watchlist, and view detailed information on each film—all wrapped in an intuitive, visually engaging interface.



**Features**

-User Sign-In – Secure login for personalized watchlists.

-Home Page – Highlights popular movies and top rated titles.

-Movie Library – Explore a collection of films by genre, year released or popularity.

-Watchlist – Save your favorites to watch later.

-Individual Movie Pages – Get details like synopsis, cast, and runtime.



**Contributions**

Styling: All designs for the pages were designed individually by each person doing their page. 
Rhichelle - homepage and sign in page
Lara - Movie Library page
Kyle - Movie Watchlist page
Nkanyiso - Individual Movie Page

All components (navbar, foooter, cards, buttons) styled using CSS were made through a collaborative effort from Lara and Rhichelle. All these components were designed and chosen by the group together.

Rhichelle: Sign in / Log in page - The Sign in page toggles between Creating an account if the user doesn’t have one already. The toggle between the log in and sign up forms was done using jQuery. 
The Authentication when creating an account and logging in is done through Firebase authentication. The User’s email they log in with is then stored locally (and is used as a username to an extent) and after logging, the user is directed to the homepage where  the user’s username is displayed on the home page and welcomes them. 

The page also has a mini link to go back to home.

Home page - Home Header:
Dynamically displaying 4 upcoming movies from the API in an automatic header slider using the upcoming movies endpoint from TMDB. The Image is a high quality backdrop displayed from the API.
Above the home header the user signed in is also displayed after logging in. This is done with local storage.

Popular Section:
Dynamically displaying the 8 most popular movies currently - with the title as well as the popularity score from TMDB. The title, movie poster and score is dynamically displayed with the API.

Top Rated Section: 
Dynamically displays the top 8 most popular movies of all time with a rating from 1-10 as well as the title. The title, movie poster and score is dynamically displayed with the API.


Lara: Movie Library Page - Filter System:
The filter system allows users to refine which movies appear in the library by genre, year, rating, or through a search.
 When the filter button is clicked, it toggles a styled filter menu that appears smoothly with an animation.
 The system dynamically fetches genres from the API, generates a year range for the dropdowns, and updates the displayed movies based on the selected criteria.
 Each filter updates the API request URL in real time using JavaScript, so users instantly see new results without refreshing the page.

Movie Library Cards:
Movies are displayed as dynamic cards that are generated with JavaScript when data is fetched from the API.
 Each card includes the poster, title, and two buttons: one for viewing more details, and another to add the movie to the watchlist.
 The cards are styled to be clean, consistent, and responsive, with hover animations that make the interface feel interactive and lively.
 This system creates a seamless, dynamic browsing experience for users on the Movie Library page.


Kyle: Movie Watchlist page - Add to/Remove from Watchlist Button (on other pages) :
Adding and remove movies from your watchlist via an alternating button. This add/remove button is found on the movie display cards on the Home and Library page.  When in the default state “Add to Whatchlist”, it can be pressed to run a function. This function adds the card’s movie to the local storage. This function also disables the “Add to Watchlist” button and activates the “Remove” button, practically swapping them.
Movies can be added from the Library and Home page and can be removed from there and can also can be removed from the Watchlist page itself. 

Watchlist Page :
On the watchlist page it checks if there are any movies added to the local storage. If there is not, it will display a “Your Watchlist is Empty” message. If however there is a movie in the local storage, it will be retrieved and displayed via a card. This card is similar to the card on other pages like the Home and Library pages. The “Remove” button will be active and when pressed will remove the movie from the watchlist in real time.
The styling of this page is based on the Library page.


Nkanyiso: Movie Details page - When the app calls /movie/{id}, TMDB returns the movie’s core details — title, poster, overview, release date, and the IMDb ID. That IMDb ID is then passed to OMDb’s /?i={imdb_id} endpoint, which provides the IMDb rating.


The /movie/{id}/credits endpoint supplies the cast and crew, allowing the app to display actor names and profile images. The /movie/{id}/videos endpoint provides trailers, usually hosted on YouTube, which Nkanyiso’s app turns into a “Watch Trailer” button.

If the movie ID isn’t known, the app uses /search/movie?query=TITLE to look up the title, retrieve the correct ID, and then feed that ID into the other endpoints.

/movie/{id}/videos endpoint. It gives you a list of all the videos linked to a movie (trailers, teasers, clips), and you filter that list to find the official YouTube trailer. You then build a button that links directly to YouTube.





**Built With**

-HTML

![CSS](https://img.shields.io/badge/-CSS-663399?style=for-the-badge&logo=css&logoColor=white)

![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![Bootstrap](https://img.shields.io/badge/-Bootstrap-41E0FD?style=for-the-badge&logo=bootstrap&logoColor=white)

-JQuery




**Usage**

-Visit the P1xie Flix website.

-Sign in to your account (or create one).

-Browse the movie library or search for specific titles.

-Add movies to your watchlist and enjoy streaming with P1xie flix


------------------------------------------------------

**Team**

Lara van Jaarsveld (251111)

Rhichelle Strauss (251169)

Kyle Wiid (251231)

Nkanyiso Nksosi (251306)




**Acknowledgements**

Thanks to our lecturer and classmates for guidance and feedback throughout development.

Icons, images, and sample data courtesy of open-source and educational resources.

design inspo for login:
Copyright (c) 2025 by @BrawadaCom (https://codepen.io/Anna_Batura/pen/QErqyE)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Button Design:
http://plantpot.works/3057

API:
TMDB
https://developer.themoviedb.org/reference/getting-started



**License**

This project was created for educational purposes as part of a coursework assignment.
No commercial rights or streaming content ownership implied.




**Contact**

For questions or collaboration:

Email: 251111@virtualwindow.co.za, 251169@virtualwindow.co.za, 251231@virtualwindow.co.za or 251306@virtualwindow.co.za

GitHub: https://github.com/Nkanyi-007/Group10_Semester2_Term4_FinalWebsiteSubmission
