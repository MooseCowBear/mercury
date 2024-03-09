Rails.application.routes.draw do
  resources :demo_sessions, only: [:create]

  namespace :api do
    namespace :v1 do
      post 'image_messages/create'
      get 'notifications/index'
      get 'public_chats/index'
      post 'public_chats/create'
      get 'public_chats/show/:id', to: "public_chats#show"
      post 'public_chats/update/:id', to: "public_chats#update"
      get 'private_chats/index'
      post 'private_chats/create'
      delete 'private_chats/destroy/:id', to: "private_chats#destroy"
      get 'users/show'
      get 'users/index'
      resources :messages, only: [:index, :update, :create, :destroy]
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
