Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'users/show'
      get 'users/index'
      get 'public_rooms/index'
      post 'public_rooms/create'
      get 'public_rooms/show/:id', to: "public_rooms#show"
      delete 'public_rooms/destroy', to: "public_rooms#destory"
      post 'public_rooms/update', to: "public_rooms#update"
      post 'messages/create'
      post 'messages/update/:id', to: "messages#update"
      delete 'messages/destroy', to: 'messages#destroy'
    end
  end
  devise_for :users
  get '/chat' => "homepage#chat"
  root "homepage#index"
end
