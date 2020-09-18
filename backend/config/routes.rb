Rails.application.routes.draw do
  resources :thoughts, only: [:index, :show, :create]
  resources :messages, only: [:index, :show, :create]
  resources :convos, only: [:index, :show, :create]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
