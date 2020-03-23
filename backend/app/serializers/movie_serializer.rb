class MovieSerializer < ActiveModel::Serializer
    attributes :id, :name, :film_rating, :genre, :director, :year_released, :synopsis, :image_url, :movie_rating, :movie_reviews
end
