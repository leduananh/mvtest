Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # get 'notifications/index'
      # get 'notifications/create'
      # get 'shared_videos/index'
      # get 'shared_videos/create'
      devise_for :users, defaults: { format: :json }, controllers: {
        sessions: 'api/v1/sessions',
        registrations: 'api/v1/registrations'
      }

      resources :registrations, only: [:create, :new]
      resources :sessions, only: [:new]
      resources :notifications
      resources :shared_videos
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
