// DOM Elements
const movieContainer = document.getElementById("movie-container")
const movieModal = document.getElementById("movie-modal")

var span = document.getElementsByClassName("close")[0]
window.onclick = function(event) {
    if (event.target == movieModal) {
        movieModal.style.display = "none";
    }
}

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
    movieDiv.className = "column"
    movieDiv.dataset.id = `${movie.id}`
    movieDiv.innerHTML = `
        <div id="${movie.id}-movie-card" class="movie-card" data-id=${movie.id} >
            <h2>${movie.name} (${movie.year_released})</h2>
            <img src=${movie.image_url}>
        </div>
    `

    movieContainer.append(movieDiv) // movie is on index.html

    const movieCard = document.getElementById(`${movie.id}-movie-card`)
    movieCard.addEventListener("click", event => {
        let movieId;
        if (event.target.className === "movie-card") {
            movieId = event.target.dataset.id
        } else {
            movieId = event.target.parentNode.dataset.id
        }
        movieModal.style.display = "block";
        fetchMovie(movieId)
    })
}

const fetchMovie = (movieId) => {
    return fetch(`http://localhost:3000/movies/${movieId}`)
        .then(response => response.json())
        .then(movieData => renderMovieModal(movieData))
}

const renderMovieModal = (movie) => {
    const modalContent = document.querySelector(".modal-content")
    modalContent.innerHTML = `
        <h2>${movie.name} (${movie.year_released})</h2>
        <i>${movie.film_rating}</i> <strong>|</strong> <i>${movie.genre}</i>
        <p>Director: ${movie.director}</p>
        <div class="image"><img src=${movie.image_url}></div>
        <h3>Synopsis:</h3>
        ${movie.synopsis}
        <h3>Movie Reviews:</h3> 
        <ul id="${movie.id}-reviews-container" class="reviews-container">
        </ul><br>
        <h4>Leave Review for "${movie.name}"</h4> 
        <form id="${movie.id}-review-form" data-id="${movie.id}" class="form">
            <label>Reviewer Name:</label>
            <input type="text" name="reviewer" placeholder="Please Enter Your Name Here"><br>
        
            <label>Movie Rating:</label>
            <input type="number" name="rating" min="0" max="10" step="0.5" placeholder="Rate"><br>

            <label>Review:</label><br>
            <textarea type="text" name="review" placeholder="Please Enter Your Review"></textarea><br>

            <input type="submit" value="Post Your Review">
        </form><br>
    `

    const reviewUl = document.getElementById(`${movie.id}-reviews-container`) 
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
    const reviewUl = document.getElementById(`${form.dataset.id}-reviews-container`)
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
    .then(reviewData => {
        renderReview(reviewData, reviewUl)
    })

    form.reset()
}