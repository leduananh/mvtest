class Api::V1::RegistrationsController < Devise::RegistrationsController
  include Api::V1::DeviceDetect
  requires_action :create

  respond_to :json

  def create
    super do |user|
      if user.persisted?
        AuthToken.create_refresh_token_record(user[:id], @rq_device_info[:device_finger_print])
        AuthToken.create_access_token_record(user[:id], @rq_device_info[:device_finger_print])
        render json: { user: user }, status: :created and return
      end
    end
  end

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
