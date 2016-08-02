Rails.application.routes.draw do
  get 'home/index'

  resource  :session
  resources :examples

  resources :messages do
    resources :comments
  end

  root 'examples#index'
end
