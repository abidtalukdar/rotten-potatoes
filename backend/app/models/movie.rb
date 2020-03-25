class Movie < ApplicationRecord
    has_many :reviews

    # def movie_rating
    #     if self.reviews.length > 0
    #         total = 0
    #         self.reviews.map do |review|
    #             total += review.rating
    #         end
    #         return total/self.reviews.length
    #     else
    #         return 0
    #     end
    # end
    # <h4>Average Audience Rating: <i>${movie.movie_rating}</i></h4>

end
