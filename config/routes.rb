Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'messages/create'
      post 'messages/update/:id', to: "messages#update"
      delete 'messages/destroy', to: 'messages#destroy'
    end
  end
  devise_for :users
  get '/chat' => "homepage#chat"
  root "homepage#index"
end
