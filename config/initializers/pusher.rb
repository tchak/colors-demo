Pusher.app_id = ENV['PUSHER_APP_ID']
Pusher.key = ENV['PUSHER_APP_KEY']
Pusher.secret = ENV['PUSHER_APP_SECRET']

if ENV['PUSHER_HOST']
  Pusher.host = ENV['PUSHER_HOST']
  Pusher.port = 4567
end
