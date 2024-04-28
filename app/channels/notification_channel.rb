class NotificationChannel < ApplicationCable::Channel
  def subscribed
    stream_from "notification_channel"
  end

  def self.broadcast_notification(msg)
    ActionCable.server.broadcast("notification_channel", msg)
  end
end
