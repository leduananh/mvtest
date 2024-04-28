class Api::V1::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
