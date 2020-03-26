# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Review.destroy_all
# Movie.destroy_all

movies = [
    {
        "name": "The Shawshank Redemption",
        "film_rating": "Rated R",
        "genre": "Drama",
        "director": "Frank Darabont",
        "year_released": "1994",
        "synopsis": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        "image_url": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
    },
    {
        "name": "The Godfather",
        "film_rating": "Rated R",
        "genre": "Crime",
        "director": "Francis Ford Coppola",
        "year_released": "1972",
        "synopsis": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        "image_url": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,704,1000_AL_.jpg"
    },
    {
        "name": "The Dark Knight",
        "film_rating": "Rated PG-13",
        "genre": "Action",
        "director": "Christopher Nolan",
        "year_released": "2008",
        "synopsis": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        "image_url": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
    },
    {
        "name": "Forrest Gump",
        "film_rating": "Rated PG-13",
        "genre": "Romance",
        "director": "Robert Zemeckis",
        "year_released": "1994",
        "synopsis": "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
        "image_url": "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg"
    },
    {
        "name": "Star Wars: Episode V - The Empire Strikes Back",
        "film_rating": "Rated PG",
        "genre": "Adventure",
        "director": "Irvin Kershner",
        "year_released": "1980",
        "synopsis": "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader and a bounty hunter named Boba Fett all over the galaxy.",
        "image_url": "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,641,1000_AL_.jpg"
    },
    {
        "name": "Schindler's List",
        "film_rating": "Rated R",
        "genre": "Biography",
        "director": "Steven Spielberg",
        "year_released": "1993",
        "synopsis": "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
        "image_url": "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,666,1000_AL_.jpg"
    },
    {
        "name": "Pulp Fiction",
        "film_rating": "Rated R",
        "genre": "Crime",
        "director": "Quentin Tarantino",
        "year_released": "1994",
        "synopsis": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        "image_url": "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,686,1000_AL_.jpg"
    },
    {
        "name": "Inception",
        "film_rating": "Rated PG-13",
        "genre": "Action",
        "director": "Christopher Nolan",
        "year_released": "2010",
        "synopsis": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        "image_url": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
    }
]

movies.each do |movie_hash|
    Movie.find_or_create_by(
        name: movie_hash[:name],
        film_rating: movie_hash[:film_rating],
        genre: movie_hash[:genre],
        director: movie_hash[:director],
        year_released: movie_hash[:year_released],
        synopsis: movie_hash[:synopsis],
        image_url: movie_hash[:image_url]
    )
end