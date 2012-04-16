class Color < ActiveRecord::Base

  include ::PusherSupport
  include ::FilterSupport

  attr_accessible :name, :value, :likes

  after_create do
    publish :create
  end

  after_update do
    publish :update
  end

  after_destroy do
    publish :destroy
  end

end
