const movieContainer = document.getElementById("movie-container")

fetch("http://localhost:3000/movies")
    .then(response => response.json())
    .then(moviesData => renderAllMovies(moviesData))

const renderAllMovies = (moviesData) => {
    moviesData.forEach(renderOneMovie)
}

const renderOneMovie = (movieData) => {
    console.log(movieData)
    const movieDiv = document.createElement("div")
    movieDiv.className = "movie"
    movieDiv.dataset.id = `${movieData.id}`
    movieDiv.innerHTML = `
        <h3>${movieData.name} (${movieData.year_released})</h3>
        <div><i>${movieData.film_rating} | ${movieData.genre}</i></div>
        <p>Director: ${movieData.director}</p>
        <div><img src=${movieData.image_url}></div>
        <h4>Synopsis:</h4>
        <p>${movieData.synopsis}</p>
        
        <br>
    `
    movieContainer.append(movieDiv)
}

// "id": 1,
// "name": "The Shawshank Redemption",
// "genre": "Drama",
// "director": "Frank Darabont",
// "year_released": "1994",
// "synopsis": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
// "image_url": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
// "movie_rating": 8.75,
// "movie_reviews": [
// "Great movie! - Jemy",
// "Good movie! - Abid"
