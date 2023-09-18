Rails.application.routes.draw do
  resources :demo_sessions, only: [:create]

  namespace :api do
    namespace :v1 do
      get 'notifications/index'
      get 'rooms/index'
      post 'rooms/create'
      get 'rooms/show/:id', to: "rooms#show"
      post 'rooms/update/:id', to: "rooms#update"
      get 'private_rooms/index'
      post 'private_rooms/create'
      delete 'private_rooms/destroy/:id', to: "private_rooms#destroy"
      get 'users/show'
      get 'users/index'
      post 'messages/create'
      post 'messages/update/:id', to: "messages#update"
      delete 'messages/destroy/:id', to: 'messages#destroy'
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
