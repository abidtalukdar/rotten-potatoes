// DOM Elements
const movieContainer = document.getElementById("movie-container")

// Initial Fetch; this fetches all the movies and reviews that are in the database and renders them on the page
fetch("http://localhost:3000/movies")
    .then(response => response.json())
    .then(moviesData => renderAllMovies(moviesData))

// this gets all the movies and renders them one at a time by using the function renderOneMovie
const renderAllMovies = (moviesData) => {
    moviesData.forEach(renderOneMovie)
}

// renders one movie at a time and after the movie is appended to the movieContainer on line 31, the reviews for each movie are added throught the renderReview function on line 34
const renderOneMovie = (movie) => {
    const movieDiv = document.createElement("div")
    movieDiv.className = "movie"
    movieDiv.dataset.id = `${movie.id}`
    movieDiv.innerHTML = `
        <h2>${movie.name} (${movie.year_released})</h2>
        <i>${movie.film_rating}</i> <strong>|</strong> <i>${movie.genre}</i>
        <p>Director: ${movie.director}</p>
        <div><img src=${movie.image_url}></div>
        <h3>Synopsis:</h3>
        ${movie.synopsis}
        <h3>Movie Reviews:</h3> 
        <h4>Average Audience Rating: <i>${movie.movie_rating}</i></h4>
        <ul id="${movie.id}" class="reviews-container">
        </ul>
    `
    movieContainer.append(movieDiv)
    const reviewUl = document.getElementById(`${movie.id}`) // each movie has a reviews container which can be accessed by using document.getElementById(id). "id" being the movie's id
    movie.reviews.forEach(review => {
        return renderReview(review, reviewUl)
    })

}
// this function renders all the comments by taking in one review hash and the reviewsUl for that specific movie
const renderReview = (review, reviewUl) => {
    const reviewLi = document.createElement("li")
    reviewLi.innerText = `"${review.rating}/10 ${review.review}" - ${review.reviewer}`
    reviewUl.append(reviewLi)
}