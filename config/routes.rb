Rails.application.routes.draw do
  devise_for :users
  get '/chat' => "homepage#chat"
  root "homepage#index"
end
