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
        <ul id="${movie.id}" class="reviews-container">
        </ul><br>
        <h4>Leave Review for "${movie.name}"</h4> 
        <form id="${movie.id}-review-form" data-id="${movie.id}">
            <label>Movie Rating:</label>
            <input type="number" name="rating" min="0" max="10" step="0.5"><br>

            <label>Please Enter Your Review:</label>
            <input type="text" name="review" placeholder="Add Review"><br>

            <label>Please Enter Your Name:</label>
            <input type="text" name="reviewer" placeholder="Name"><br>

            <input type="submit" value="Post Your Review">
        </form><br>
    `

    movieContainer.append(movieDiv) // movie is on index.html
    const reviewUl = document.getElementById(`${movie.id}`) // each movie has a reviews container which can be accessed by using document.getElementById(id). "id" being the movie's id
    movie.reviews.forEach(review => {
        return renderReview(review, reviewUl)
    })

    const reviewForm = document.getElementById(`${movie.id}-review-form`)
    reviewForm.addEventListener("submit", event => {
        handleReviewFormSubmit(event)
    })
}




// this function renders all the comments by taking in one review hash and the reviewsUl for that specific movie
const renderReview = (review, reviewUl) => {
    const reviewLi = document.createElement("li")
    reviewLi.dataset.id = review.id
    reviewLi.className = "review-post"
    reviewLi.innerHTML = `
    "${review.rating}/10 ${review.review}" - ${review.reviewer} <button data-action="delete-review" class="delete">x</button>
    `
    reviewUl.append(reviewLi)

    reviewLi.addEventListener("click", event => {
        if (event.target.dataset.action === "delete-review") {
            fetch(`http://localhost:3000/reviews/${review.id}`, {
                method: "DELETE"
            })
            .then(response => {
                return response.json()
              })
            .then(() => {
                reviewLi.remove()
            })
        }
    })
}



const handleReviewFormSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const reviewUl = document.getElementById(`${form.dataset.id}`)
    const newReview = {
        movie_id: form.dataset.id,
        rating: form.rating.value,
        review: form.review.value,
        reviewer: form.reviewer.value
    }

    fetch(`http://localhost:3000/reviews`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReview)
    })
    .then(response => {
        return response.json()
    })
    .then(() => {
        renderReview(newReview, reviewUl)
    })
}
