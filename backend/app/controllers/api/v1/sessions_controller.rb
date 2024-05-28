class Api::V1::SessionsController < Devise::SessionsController
  include Api::V1::DeviceDetect
  include Api::V1::Authen
  skip_before_action :verify_signed_out_user, only: :destroy

  requires_action :create, :index, :destroy

  requires_authentication_for :destroy

  respond_to :json

  # POST /resource/sign_in
  def create
    user = User.find_by_email(params[:user][:email])
    access_token = nil
    refresh_token = nil

    if user && user.valid_password?(params[:user][:password])
      if (!@rq_device_info[:existing_device].nil?)
        auth_token_hash = AuthToken.upsert_tokens_by_user_and_device(user[:id], @rq_device_info[:existing_device][:id])
        access_token = auth_token_hash[:access_token]
        refresh_token = auth_token_hash[:refresh_token]
      else
        device = create_device_from_device_info(@rq_device_info, user[:id])
        access_token = AuthToken.create_access_token_record(user[:id], device[:id])[:token]
        refresh_token = AuthToken.create_refresh_token_record(user[:id], device[:id])[:token]
      end

      render json: { user: { **user.attributes, access_token: access_token, refresh_token: refresh_token } }, status: :created and return
    end
  end

  def destroy
    @current_user.destroy_login_session(@rq_device_info[:existing_device][:finger_print])
  end

  private

  def create_device_from_device_info(device_params, user_id)
    Device.create(
      user_id: user_id,
      finger_print: device_params[:device_finger_print],
      device_type: device_params[:info][:device_type], # Corrected reference to device_info
      registration_date: Date.today, # Changed from Date.now to Date.today
      last_login_date: Date.today # Chang ed from Date.now to Date.today
    )
  end
end
