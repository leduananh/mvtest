class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  before_action :configure_permitted_parameters, if: :devise_controller?
  rescue_from Errors::ApplicationError, with: :handle_application_error

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_in, keys: %i[email password])
  end

  def handle_application_error(exception)
    log_error(exception)
    render json: { error: exception.error, details: exception.details }, status: exception.status
  end

  def log_error(exception)
    Rails.logger.error("#{exception.class}: #{exception.message}")
    Rails.logger.error(exception.backtrace.join("\n"))
  end
end
