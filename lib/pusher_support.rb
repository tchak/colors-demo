module PusherSupport
  extend ActiveSupport::Concern

  module InstanceMethods

    def update_by(socket_id)
      @socket_id = socket_id
      self
    end

    def publish(action)
      data = {
        :id => id,
        :hash => self.active_model_serializer.new(self, :root => false) #ColorSerializer.new(self, :root => false)
      }
      Pusher[self.class.name.downcase].trigger!(action.to_s, data, @socket_id)
    end
  end
end
