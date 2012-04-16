Colors::Application.routes.draw do
  root :to => 'colors#index'

  scope 'api/v1' do
    resources :colors, :except => [:new, :edit]
  end
end
