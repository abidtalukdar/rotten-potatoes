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
        <div class="title">
            <h2>${movie.name} (${movie.year_released})</h2>
            <h5><i>${movie.film_rating}</i> | <i>${movie.genre}</i></h5>
        </div>
        <div class="image">
            <img src=${movie.image_url}>
        </div>
        <div class="movie-info">
            <h3>Summary:</h3>
            ${movie.synopsis}
            <p><strong>Director: </strong>${movie.director}</p>
            <h3>Movie Reviews:</h3> 
            <ul id="${movie.id}-reviews-container" class="reviews-container">
            </ul>
        </div>
        <div class="form-title">
            <h3>Post a Review for '${movie.name}'</h3> 
            <form id="${movie.id}-review-form" data-id="${movie.id}" class="form">

                <label>Name of Reviewer:</label>
                <input type="text" name="reviewer" placeholder="Please Enter Your Name"><br>
            
                <label>Movie Rating:</label>
                <input type="number" name="rating" min="0" max="10" step="1" placeholder="Rate '${movie.name}' from 1 to 10 🥔's"><br>

                <label>Review:</label><br>
                <textarea type="text" name="review" placeholder="Please Enter Your Review for '${movie.name}'"></textarea><br>

                <input type="submit" value="Post Your Review">
            </form><br>
        </div
    `

    const reviewUl = document.getElementById(`${movie.id}-reviews-container`) 
    if (movie.reviews.length > 0) {
        movie.reviews.forEach(review => {
            return renderReview(review, reviewUl)
        })
    } else {
        reviewUl.innerHTML = `
        <p><i>Be the first to review '${movie.name}'!</i></p>
        `
    }

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
    ${review.reviewer}'s Potato Rating: "${review.rating} 🥔's ~ ${review.review}" <button data-action="delete-review" class="delete">Remove</button>
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
        reviewer: form.reviewer.value.charAt(0).toUpperCase() + form.reviewer.value.slice(1)
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
        fetchMovie(form.dataset.id)
    })

    form.reset()
}