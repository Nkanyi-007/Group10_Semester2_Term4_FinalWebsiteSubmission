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