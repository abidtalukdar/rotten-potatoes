Rails.application.routes.draw do
    resources :movies, only: [:index, :show]
    resources :reviews, only: [:index, :show, :create, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
