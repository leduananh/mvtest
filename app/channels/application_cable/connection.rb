module ApplicationCable
  class Connection < ActionCable::Connection::Base
    include DeviceDetectorHelper
    include ActionController::HttpAuthentication::Basic::ControllerMethods
    include ActionController::HttpAuthentication::Token::ControllerMethods
    identified_by :current_user

    def connect
      # TODO update code check token and device was from same user id and device
      device_info = load_device request.params[:userAgent]
      # client = request.headers["client"]
      # uid = request.headers["uid"]
      uid = 1
      # access_token = request.headers["access-token"]
      access_token = "access-token"

      self.current_user = find_verified_user access_token, uid
    end

    private

    def find_verified_user token, uid # this checks whether a user is authenticated with devise
      user = User.find_by id: uid
      # http://www.rubydoc.info/gems/devise_token_auth/0.1.38/DeviseTokenAuth%2FConcerns%2FUser:valid_token%3F
      # if user && user.valid_token?(token, client_id)
      if user
        user
      else
        reject_unauthorized_connection
      end
    end

  end
end
