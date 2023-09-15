Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'notifications/index'
      get 'rooms/index'
      post 'rooms/create'
      get 'rooms/show/:id', to: "rooms#show"
      delete 'rooms/destroy', to: "rooms#destroy"
      post 'rooms/update', to: "rooms#update"
      get 'private_rooms/index'
      post 'private_rooms/create'
      delete 'private_rooms/destroy', to: "private_rooms#destroy"
      get 'users/show'
      get 'users/index'
      post 'messages/create'
      post 'messages/update/:id', to: "messages#update"
      delete 'messages/destroy/:id', to: 'messages#destroy'
    end
  end
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  get '/chat' => "homepage#chat"
  root "homepage#index"
end
