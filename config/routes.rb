Rails.application.routes.draw do
  resources :demo_sessions, only: [:create]

  namespace :api do
    namespace :v1 do
      post 'image_messages/create'
      get 'notifications/index'
      get 'public_chats/index'
      post 'public_chats/create'
      post 'public_chats/update/:id', to: "public_chats#update"

      get "users/show", to: "users#show" # need a way to get current user id from the front end
      resources :users, only: [:index, :update]
      resources :messages, only: [:index, :update, :create, :destroy]
      resources :private_chats, only: [:index, :create, :destroy]
    end
  end
  
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  get '/chat' => "homepage#chat"
  root "homepage#index"

  match "/404", to: "errors#not_found", via: :all
  match "/500", to: "errors#internal_server_error", via: :all
end
