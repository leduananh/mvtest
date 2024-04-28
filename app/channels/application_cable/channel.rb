module ApplicationCable
  class Channel < ActionCable::Channel::Base
    include Authen
  end
end
