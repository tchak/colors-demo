class ApplicationController < ActionController::Base
  protect_from_forgery

  def current_user
    request.headers['X-Socket-Id']
  end

end
