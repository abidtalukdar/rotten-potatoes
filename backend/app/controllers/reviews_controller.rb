class ReviewsController < ApplicationController
    def index 
        @reviews = Review.all
        render json: @reviews
    end

    def show
        @review = Review.find_by(id: params[:id])
        render json: @review
    end

    def create 
        Review.create(review_params)
    end
    
    def destroy
        @review = Review.find_by(id: params[:id])
        @review.destroy
    end

        private 
        
        def review_params
            params.permit(:movie_id, :rating, :review, :reviewer)
        end
end
