Rails.application.routes.draw do
  resources :thoughts
  resources :messages
  resources :convos
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
