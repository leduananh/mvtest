class NotificationBroadcastJob < ApplicationJob
  queue_as :default

  def perform(msg)
    NotificationChannel.broadcast_notification msg
  end
end
