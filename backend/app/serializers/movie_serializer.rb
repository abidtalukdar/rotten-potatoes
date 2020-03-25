class MovieSerializer < ActiveModel::Serializer
    attributes :id, :name, :film_rating, :genre, :director, :year_released, :synopsis, :image_url
    has_many :reviews
end
