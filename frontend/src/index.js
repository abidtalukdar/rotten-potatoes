const movieContainer = document.getElementById("movie-container")

fetch("http://localhost:3000/movies")
    .then(response => response.json())
    .then(moviesData => renderAllMovies(moviesData))

const renderAllMovies = (moviesData) => {
    moviesData.forEach(renderOneMovie)
}

const renderReviews = (reviews) => {
    return reviews.map(review => {
        return `<li>"${review.rating}/10 ${review.review}" - ${review.reviewer}</li>`
    }).join("")
}

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
        <ul id="${movie.id}" data-id="${movie.id}">
        ${renderReviews(movie.reviews)}
        </ul>
    `
    movieContainer.append(movieDiv)
}
