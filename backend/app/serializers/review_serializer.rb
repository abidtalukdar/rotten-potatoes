class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :review, :reviewer
  belongs_to :movie
end
